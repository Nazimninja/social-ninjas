import fetch from 'node-fetch';

async function test() {
  const body = {
    model: "claude-sonnet-4-6",
    messages: [
      { role: "user", content: "Test message" }
    ],
    max_tokens: 1000
  };

  const res = await fetch("https://www.socialninjas.in/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", data);
}

test();
