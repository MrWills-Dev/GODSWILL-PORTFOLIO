const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const btn = document.getElementById("btn");
        const status = document.getElementById("status");

        btn.disabled = true;

        status.textContent = "Sending...";

        try {

            const formData = new FormData(form);

            const formObject =
                Object.fromEntries(formData.entries());

            console.log("Sending:", formObject);

            const res = await fetch("/api/send_mail", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify(formObject)

            });

            console.log("API status:", res.status);

            const result = await res.json();

            console.log("API response:", result);

            if (result.success) {

                status.textContent =
                    "Thank you for your message! I will reply soon.";

                alert("Message sent successfully!");

                form.reset();

            } else {

                status.textContent =
                    "Failed: " +
                    (result.message || "Unknown error.");

                console.error(
                    "Web3Forms error:",
                    result
                );

            }

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            status.textContent =
                "Something went wrong while sending the message.";

        } finally {

            btn.disabled = false;

        }

    });

}