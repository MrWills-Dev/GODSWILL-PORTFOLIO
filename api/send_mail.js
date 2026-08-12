export default async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Only POST requests are allowed."
        });
    }

    // Check if the secret key exists
    if (!process.env.WEB3FORM_KEY) {

        console.error("WEB3FORM_KEY is missing.");

        return res.status(500).json({
            success: false,
            message: "WEB3FORM_KEY is missing from Vercel."
        });
    }

    try {

        const body = req.body || {};

        console.log("Received form data:", {
            name: body.name,
            email: body.email,
            message: body.message ? "Message received" : "No message"
        });

        // Send the form to Web3Forms
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

        // Read the response as TEXT first.
        // This helps us see exactly what Web3Forms returns.
        const responseText = await response.text();

        console.log("Web3Forms status:", response.status);

        console.log("Web3Forms response:", responseText);

        // Try converting the response to JSON
        let data;

        try {

            data = JSON.parse(responseText);

        } catch (parseError) {

            console.error(
                "Web3Forms did not return JSON:",
                responseText
            );

            return res.status(502).json({

                success: false,

                message:
                    "Web3Forms returned an unexpected response.",

                details: responseText

            });
        }

        // Return Web3Forms response to our frontend
        return res.status(response.status).json(data);

    } catch (error) {

        console.error(
            "Vercel contact form error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "The server could not connect to Web3Forms.",

            error: error.message

        });

    }

}