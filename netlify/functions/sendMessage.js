const querystring = require("querystring");
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
	// Only allow POST
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}

	const params = querystring.parse(event.body);
	const name = params.name;
	const email = params.email;
	const message = params.message;

	return fetch(process.env.TELEGRAM_URL, {
		headers: {
			"content-type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ text: `${name}(${email}):
		${text}` }),
	})
		.then(() => ({
			statusCode: 200,
			body: `Message sent.`,
		}))
		.catch((error) => ({
			statusCode: 422,
			body: `Oops! Something went wrong. ${error}`,
		}));
};