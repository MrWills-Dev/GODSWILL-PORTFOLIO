export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST allowed' });
    }

    try {
        // Vercel auto-parses req.body into an object. We can use it directly!
        const body = req.body || {};

        const response = await fetch("https://web3forms.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: process.env.WEB3FORM_KEY,
                ...body
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    
    } catch (error) {
        console.error("Vercel Backend Error:", error);
        return res.status(500).json({ message: error.toString() });
    }
}
