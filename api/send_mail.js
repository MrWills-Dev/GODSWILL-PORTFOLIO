export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Only POST requests are allowed."
        });
    }

    if (!process.env.WEB3FORM_KEY) {
        return res.status(500).json({
            success: false,
            message: "WEB3FORM_KEY is missing."
        });
    }

    try {

        const body = req.body || {};

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify({
                    access_key: process.env.WEB3FORM_KEY,

                    name: body.name,
                    email: body.email,
                    message: body.message,

                    subject: "New Portfolio Message"
                })
            }
        );

        const data = await response.json();

        console.log("Web3Forms response:", data);

        return res.status(response.status).json(data);

    } catch (error) {

        console.error("Server error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending the message."
        });
    }
}