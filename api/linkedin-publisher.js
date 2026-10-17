export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── Admin Authorization Check ───────────────────────────────────────
  const authHeader = req.headers.authorization || req.headers.Authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const customHeader = req.headers['x-admin-key'];
  const tokenHeader = bearerToken || customHeader;
  const adminKey = process.env.ADMIN_API_KEY || process.env.ADMIN_PASSWORD;

  if (!adminKey || !tokenHeader || tokenHeader !== adminKey) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication required to publish to LinkedIn.' });
  }

  const {
    videoUrl,
    text,
    title = 'Nazim OS Video',
    author = process.env.LINKEDIN_AUTHOR_URN || 'urn:li:person:WEfd679Fsv',
    token = process.env.LINKEDIN_ACCESS_TOKEN
  } = req.body || {};

  if (!token) {
    return res.status(400).json({ error: 'LinkedIn access token is not configured in server environment.' });
  }

  if (!text || text.trim().length < 10) {
    return res.status(400).json({ error: 'Missing or too short commentary text (minimum 10 characters required)' });
  }

  try {
    // 1. Download video binary if videoUrl provided
    let videoUrn = null;

    if (videoUrl) {
      console.log('Downloading video from:', videoUrl);
      const vidRes = await fetch(videoUrl);
      if (!vidRes.ok) throw new Error(`Failed to download video: ${vidRes.statusText}`);
      const arrayBuf = await vidRes.arrayBuffer();
      const videoBuffer = Buffer.from(arrayBuf);
      console.log('Video downloaded, size:', videoBuffer.length, 'bytes');

      // 2. Initialize LinkedIn Video Upload
      console.log('Initializing LinkedIn upload...');
      const initRes = await fetch('https://api.linkedin.com/rest/videos?action=initializeUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'LinkedIn-Version': '202602',
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
          initializeUploadRequest: {
            owner: author,
            fileSizeBytes: videoBuffer.length,
            uploadCaptions: false,
            uploadThumbnail: false
          }
        })
      });

      if (!initRes.ok) {
        const errText = await initRes.text();
        throw new Error(`LinkedIn initializeUpload failed (${initRes.status}): ${errText}`);
      }

      const initData = await initRes.json();
      videoUrn = initData.value.video;
      const uploadUrl = initData.value.uploadInstructions[0].uploadUrl;

      // 3. Upload Binary Buffer to LinkedIn CDN
      console.log('Uploading binary to LinkedIn CDN...');
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        body: videoBuffer
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`LinkedIn CDN upload failed (${uploadRes.status}): ${errText}`);
      }
      console.log('Upload binary to LinkedIn CDN complete (200 OK)');
    }

    // 4. Create LinkedIn Post
    console.log('Creating LinkedIn post...');
    const postPayload = {
      author,
      commentary: text || 'Automated post from Social Ninjas',
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false
    };

    if (videoUrn) {
      postPayload.content = {
        media: {
          title,
          id: videoUrn
        }
      };
    }

    const postRes = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'LinkedIn-Version': '202602',
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postPayload)
    });

    if (!postRes.ok) {
      const errText = await postRes.text();
      throw new Error(`LinkedIn post creation failed (${postRes.status}): ${errText}`);
    }

    const postId = postRes.headers.get('x-restli-id') || 'published';
    console.log('Post successfully created on LinkedIn! ID:', postId);

    return res.status(200).json({
      success: true,
      postId,
      type: videoUrn ? 'video' : 'article'
    });

  } catch (err) {
    console.error('LinkedIn publisher handler error:', err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
