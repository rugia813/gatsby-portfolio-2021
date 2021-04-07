const fetch = require("node-fetch");

exports.handler = async (event, context) => {
	// Only allow POST
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}

	const params = JSON.parse(event.body);
	const name = params.name;
	const email = params.email;
	const message = params.message;
	const text = `<b>${name}</b>(${email}):\n ${message}`

	return fetch(process.env.TELEGRAM_URL, {
		method: 'POST',
		headers: { "content-type": "application/json" },
		body: `{ "text": "${text}" }`,
	})
		.then((e) => ({
			statusCode: 200,
			body: `Message sent.`,
		}))
		.catch((error) => ({
			statusCode: 422,
			body: `Oops! Something went wrong. ${error}`,
		}));
};