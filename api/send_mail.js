export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Only POST requests are allowed.",
    });
  }

  // Check environment variable
  if (!process.env.WEB3FORM_KEY) {
    console.error("WEB3FORM_KEY is missing");
    return res.status(500).json({
      success: false,
      message: "Server configuration error (missing key).",
    });
  }

  try {
    const { name, email, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORM_KEY,
        name,
        email,
        message,
        subject: `New Portfolio Message from ${name}`,
        from_name: "UGC Official Portfolio",
      }),
    });

    const data = await response.json();

    // Forward the exact response from Web3Forms
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
}