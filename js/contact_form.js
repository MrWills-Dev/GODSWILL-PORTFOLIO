document.getElementById('contact-form').addEventListener('submit', async function(e){
    e.preventDefault(); 

    const btn = document.getElementById('btn');
    const status = document.getElementById('status');

    btn.disabled = true;
    status.textContent = "Sending...";

    try {
        const formData = new FormData(this);
        
        // Convert FormData into a standard JSON object for your backend handler
        const formObject = Object.fromEntries(formData.entries());
        formObject.subject = "New Portfolio Message";
        formObject.from_name = "Portfolio website";

        
        const res = await fetch('/api/send_mail', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObject)
});

        
        const result = await res.json();

        if (result.success) {
            status.textContent = "Thank you for your message! I will reply soon.";
            alert('Message sent successfully!');
            this.reset(); 
        } else {
            status.textContent = "Failed: " + result.message;
            alert('Error: ' + result.message);
        }
    } catch (error) {
        status.textContent = "Network error. Try again.";
        console.error(error);
    } finally {
        btn.disabled = false;
    }
});
