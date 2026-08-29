export async function onRequestPost(context) {
  const req = context.request;
  let body = {};
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  const {
    videoUrl,
    text,
    title = 'Nazim OS Video',
    author = 'urn:li:person:WEfd679Fsv',
    token = 'AQXjKU5fxaevdQDIGZXKzhKBRVSRAKMPdYI5Y5Ac4Fsla0x4YJt1mHZMR531kP610ZAomQtKJYuGkCeTYISEDhnuo3aIQP-EfB2I11kaGCWsiGMMef3r4uc9U1fm-hCahu33ameR04oS3DBPOPg09GBKBIgqfZ6trOJdOJhjJaRdywPmA8p19WaF0FFtmSdEOvqEIe-GRwhzlhDQZtYH7NFwZdqankxO5Vo_3Emgj_ktdzeqO51aw27u0V4OGBPP-nfIpWWZ6mbcOQhivfZFnk3FeEcIgzGMtOfSu772zOHfKK3OPQan4zIjDnOkxTaUll8hV0BxD3DWh9efg177UxI5pi6ZhQ'
  } = body;

  try {
    let videoUrn = null;

    if (videoUrl) {
      // 1. Download video binary from Catbox / Drive URL
      console.log('Downloading video from URL:', videoUrl);
      const vidRes = await fetch(videoUrl);
      if (!vidRes.ok) throw new Error(`Failed to download video: ${vidRes.statusText}`);
      const arrayBuf = await vidRes.arrayBuffer();
      const videoBuffer = new Uint8Array(arrayBuf);
      console.log('Downloaded video buffer size:', videoBuffer.length);

      // 2. Initialize LinkedIn Modern Video Upload
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

      // 3. Upload Binary directly to LinkedIn CDN
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
      console.log('Video binary successfully uploaded to LinkedIn CDN!');
    }

    // 4. Publish Post to LinkedIn
    console.log('Creating post on LinkedIn...');
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
    console.log('Post created! ID:', postId);

    return new Response(JSON.stringify({
      success: true,
      postId,
      type: videoUrn ? 'video' : 'article'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (err) {
    console.error('LinkedIn publisher error:', err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
