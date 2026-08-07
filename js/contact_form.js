const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const btn = document.getElementById("btn");
        const status = document.getElementById("status");

        btn.disabled = true;
        status.textContent = "Sending...";

        try {

            const formData = new FormData(this);

            const formObject = Object.fromEntries(formData.entries());

            const res = await fetch("/api/send_mail", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formObject)

            });

            /*
             * Check whether Vercel actually returned JSON
             */

            const contentType = res.headers.get("content-type");

            if (!contentType || !contentType.includes("application/json")) {

                const text = await res.text();

                console.error("Server returned:", text);

                throw new Error(
                    "The server returned HTML instead of JSON."
                );
            }

            const result = await res.json();

            console.log("Server response:", result);

            if (result.success) {

                status.textContent =
                    "Thank you for your message! I will reply soon.";

                alert("Message sent successfully!");

                this.reset();

            } else {

                status.textContent =
                    "Failed: " + (result.message || "Unknown error.");

            }

        } catch (error) {

            console.error("Contact form error:", error);

            status.textContent =
                "Something went wrong. Please try again.";

        } finally {

            btn.disabled = false;

        }

    });

}