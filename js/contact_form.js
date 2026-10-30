const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const btn = document.getElementById("btn");
    const status = document.getElementById("status");

    // Disable button + show loading
    btn.disabled = true;
    btn.textContent = "Sending...";
    status.textContent = "";
    status.className = "";

    try {
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());

      const res = await fetch("/api/send_mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formObject),
      });

      let result;
      try {
        result = await res.json();
      } catch {
        throw new Error("Server returned invalid response");
      }

      if (res.ok && result.success) {
        status.textContent = "Message sent successfully! I’ll reply soon.";
        status.className = "success";
        form.reset();
      } else {
        status.textContent =
          result.message || "Something went wrong. Please try again.";
        status.className = "error";
        console.error("API Error:", result);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      status.textContent =
        "Network error. Please check your connection or try WhatsApp.";
      status.className = "error";
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
}