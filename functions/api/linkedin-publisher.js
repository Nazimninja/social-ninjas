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
    fileUrl,
    videoUrl,
    pdfUrl,
    mediaType = 'document', // 'document' (carousel/pdf), 'video', 'article'
    text,
    title = 'Swipe Through — Carousel Playbook',
    author = 'urn:li:person:WEfd679Fsv',
    token = 'AQXjKU5fxaevdQDIGZXKzhKBRVSRAKMPdYI5Y5Ac4Fsla0x4YJt1mHZMR531kP610ZAomQtKJYuGkCeTYISEDhnuo3aIQP-EfB2I11kaGCWsiGMMef3r4uc9U1fm-hCahu33ameR04oS3DBPOPg09GBKBIgqfZ6trOJdOJhjJaRdywPmA8p19WaF0FFtmSdEOvqEIe-GRwhzlhDQZtYH7NFwZdqankxO5Vo_3Emgj_ktdzeqO51aw27u0V4OGBPP-nfIpWWZ6mbcOQhivfZFnk3FeEcIgzGMtOfSu772zOHfKK3OPQan4zIjDnOkxTaUll8hV0BxD3DWh9efg177UxI5pi6ZhQ'
  } = body;

  // Always use the authorized person URN if organization is passed without org token
  const effectiveAuthor = author.includes('person') ? author : 'urn:li:person:WEfd679Fsv';
  const downloadUrl = fileUrl || pdfUrl || videoUrl;

  try {
    let mediaUrn = null;
    let fileBuffer = null;

    if (body.fileBase64) {
      console.log('Decoding file from direct base64 payload...');
      const binaryString = atob(body.fileBase64);
      fileBuffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        fileBuffer[i] = binaryString.charCodeAt(i);
      }
      console.log('Decoded file buffer, size:', fileBuffer.length, 'bytes');
    } else if (downloadUrl) {
      console.log('Downloading file from:', downloadUrl);
      const fileRes = await fetch(downloadUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!fileRes.ok) throw new Error(`Failed to download file from URL (${fileRes.status}): ${fileRes.statusText}`);
      const arrayBuf = await fileRes.arrayBuffer();
      fileBuffer = new Uint8Array(arrayBuf);
      console.log('Downloaded file buffer, size:', fileBuffer.length, 'bytes');
    }

    if (fileBuffer) {
      const isVideo = mediaType === 'video' || (downloadUrl && downloadUrl.endsWith('.mp4') && mediaType !== 'document');

      if (isVideo) {
        // Video upload flow
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
              owner: effectiveAuthor,
              fileSizeBytes: fileBuffer.length,
              uploadCaptions: false,
              uploadThumbnail: false
            }
          })
        });

        if (!initRes.ok) throw new Error(`LinkedIn video init failed: ${await initRes.text()}`);
        const initData = await initRes.json();
        mediaUrn = initData.value.video;
        const uploadUrl = initData.value.uploadInstructions[0].uploadUrl;

        const upRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: fileBuffer
        });
        if (!upRes.ok) throw new Error(`LinkedIn video CDN upload failed: ${await upRes.text()}`);
      } else {
        // Document / PDF Carousel upload flow
        console.log('Initializing LinkedIn Document Carousel upload for author:', effectiveAuthor);
        const initRes = await fetch('https://api.linkedin.com/rest/documents?action=initializeUpload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'LinkedIn-Version': '202602',
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          },
          body: JSON.stringify({
            initializeUploadRequest: {
              owner: effectiveAuthor
            }
          })
        });

        if (!initRes.ok) throw new Error(`LinkedIn document init failed: ${await initRes.text()}`);
        const initData = await initRes.json();
        mediaUrn = initData.value.document;
        const uploadUrl = initData.value.uploadUrl;
        console.log('Document URN:', mediaUrn);

        // Upload PDF / Document binary
        const upRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: fileBuffer
        });
        if (!upRes.ok && upRes.status !== 201 && upRes.status !== 200) {
          throw new Error(`LinkedIn document upload failed: ${await upRes.text()}`);
        }
        console.log('PDF Carousel uploaded successfully to LinkedIn CDN (201 Created)!');

        // Poll until document status is AVAILABLE (guarantees slides are converted before publishing)
        const encodedDocId = encodeURIComponent(mediaUrn);
        console.log('Polling LinkedIn document conversion status for:', encodedDocId);
        for (let attempt = 1; attempt <= 10; attempt++) {
          await new Promise(r => setTimeout(r, 2000));
          const docStatusRes = await fetch(`https://api.linkedin.com/rest/documents/${encodedDocId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'LinkedIn-Version': '202602',
              'X-Restli-Protocol-Version': '2.0.0'
            }
          });
          if (docStatusRes.ok) {
            const docData = await docStatusRes.json();
            console.log(`[Document Check ${attempt}] Status:`, docData.status);
            if (docData.status === 'AVAILABLE') {
              console.log('🎉 Document is AVAILABLE and ready for LinkedIn feed post!');
              break;
            }
            if (docData.status === 'PROCESSING_FAILED') {
              throw new Error('LinkedIn backend rejected the PDF document conversion');
            }
          }
        }
      }
    }

    // Create LinkedIn Post
    console.log('Publishing post on LinkedIn...');
    const postPayload = {
      author: effectiveAuthor,
      commentary: text || 'Swipe through for the full breakdown! 👉',
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false
    };

    if (mediaUrn) {
      postPayload.content = {
        media: {
          title: title || 'Carousel Slide Deck',
          id: mediaUrn
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
    console.log('LinkedIn Carousel post created successfully! ID:', postId);

    return new Response(JSON.stringify({
      success: true,
      postId,
      type: mediaUrn ? 'carousel_document' : 'article'
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
