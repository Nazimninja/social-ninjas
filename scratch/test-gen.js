const test = async () => {
    try {
        const body = {
            system: "You are an AI generating content for a marketing agency.",
            messages: [{
                role: "user",
                content: "Write 1 short instagram post about your services. Return ONLY JSON like { \"posts\": [{\"title\":\"...\", \"caption\":\"...\"}] }"
            }],
            max_tokens: 1000
        };

        console.log("Sending request to http://localhost:3001/api/generate...");
        const res = await fetch("http://localhost:3001/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            console.error("Error status:", res.status);
            const err = await res.text();
            console.error("Error body:", err);
            process.exit(1);
        }

        const data = await res.json();
        console.log("Success! Response context:");
        const raw = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
        console.log(raw);
    } catch(err) {
        console.error("Fetch failed:", err);
    }
};
test();
