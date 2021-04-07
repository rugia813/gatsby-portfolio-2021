import React, { useState } from "react"
import styled from "@emotion/styled"
import { mobile, desktop } from "../styles/consts";
import { BaseButton } from "../components/baseButton";

const Container = styled.div`
	height: 100%;
	color: white;
	font-size: clamp(24px, 6vw, 32px);
	display: flex;

	${mobile} {
		flex-direction: column;
	}
`
const MessagePanel = styled.div`
	flex: 1;
	display: grid;
	place-content: center;
	font-size: 1em;
	padding: 10px;
	/* width: min(50vw, 100%); */

	label, input, textarea {
		display: block;
	}
	label {
		margin: 15px 0;
	}
	input, textarea {
		width: min(360px, 80vw);
		font-size: 1em;
		padding: 3px;
		/* height: max(36px, 10vh); */
	}
	textarea {
		width: min(480px, 80vw);
		font-size: .7em;
		height: min(40vh, 360px);
	}
`
const SubmitButton = styled(BaseButton)`
	width: 100%;
`
const ContactInfo = styled.div`
	flex: 1;
	display: grid;
	place-content: center;
	font-size: .8em;
	padding: 10px;
`

function sendMessage(name, email, message) {
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

export default function Contact() {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	return (
		<Container>
			<ContactInfo>
				<div>e-mail: <a href="mailto:rugia813@yahoo.com.tw">rugia813@yahoo.com.tw</a></div>
				<div>github: <a href="https://github.com/rugia813">https://github.com/rugia813</a></div>
				<div>linkedIn: </div>
			</ContactInfo>
			<hr/>
			<MessagePanel>
				<h2>Leave a Message</h2>

				<label>
					Name:
					<input name="name" value={name} onChange={e => setName(e.target.value)} />
				</label>

				<label>
					e-mail:
					<input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
				</label>

				<label>
					Message:
					<textarea name="message" value={message} onChange={e => setMessage(e.target.value)} />
				</label>

				<SubmitButton onClick={e => sendMessage(name, email, message)}>Submit</SubmitButton>
			</MessagePanel>
		</Container>
	)
}