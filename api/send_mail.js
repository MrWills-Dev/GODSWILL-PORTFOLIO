export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    if (!process.env.WEB3FORM_KEY) {
        return res.status(500).json({
            success: false,
            message: "WEB3FORM_KEY is missing."
        });
    }

    try {

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
                    ...req.body
                })
            }
        );

        const data = await response.json();

        return res.status(response.status).json(data);

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}