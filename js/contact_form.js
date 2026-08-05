const ACCESS_KEY = "8106c9cb-1dae-48ba-8321-dcce7cc6da2c"; //GET THIS FROM YOUR MAIL SENDER API PROVIDER(WEB3FORM.COM)

document.getElementById('contact-form').addEventListener('submit', async function(e){
e.preventDefault(); //this is what stops the the API page from showing.

const btn = document.getElementById('btn');
const status = document.getElementById('status');

btn.disabled = true;
status.textContent = "sending...";

const formData = new FormData(this);
formData.append("access_key", ACCESS_KEY);
formData.append("subject", "New Portfolio Message");
formData.append("from_name", "Portfolio website");

try {const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
});

const result = await response.json();

if (result.success) {
    status.textContent = "Thank you for your message! I will reply soon.";
    this.reset();
}else{
    status.textContent = "Failed" + result.message;
}
}catch (error){
    status.textContent = "Network error. Try again.";
} finally {
    btn.disabled = false;
}});
