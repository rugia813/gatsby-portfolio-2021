import React, { useState } from "react"
import styled from "@emotion/styled"
const Container = styled.div`
	color: white;
`

export default function Contact() {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	function sendMessage() {
		fetch('/.netlify/functions/sendMessage', {
			method: 'post',
			body: JSON.stringify({
				name, email, message
			})
		})
		.then(e => {
			console.log(e);
		})
	}

	return (
		<Container>
			<label> Name: </label>
			<input name="name" value={name} onChange={e => setName(e.target.value)} />

			<label> e-mail: </label>
			<input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
			<label> Message: </label>
			<textarea name="message" value={message} onChange={e => setMessage(e.target.value)} />
			<input type="submit" value="Submit" onClick={sendMessage} />
		</Container>
	)
}