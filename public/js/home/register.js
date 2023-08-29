// --- DOM Elements ---

const register_form = document.getElementById("register-form");
const register_form_netid = document.getElementById("register-form-netid");

// --- Actions ---

// register form submit button
register_form.addEventListener("submit", async (e) => {
  e.preventDefault();

	// TODO: validate netid

	const path = `/api/register?netid=${register_form_netid.value}`;
	const url = `${window.config.server_url}${path}`;
	console.log(`url: ${url}`)

	const payload = await fetch(url);
	const response = await payload.json();
	console.log(response);
});
