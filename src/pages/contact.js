import React, { useState } from "react"
import styled from "@emotion/styled"
import { mobile, desktop, blurColor } from "../styles/consts";
import { BaseButton } from "../components/baseButton";

const Container = styled.div`
	height: 100%;
	color: white;
	font-size: clamp(21px, 4vw, 28px);
	display: flex;

	${desktop} {
		flex-wrap: wrap;
	}

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
		background-color: rgba(0,0,0,0);
		color: white;
		border: none;
		
		:focus {
			border: none;
			outline: none;
			background-color: ${blurColor};
		}
	}
	textarea {
		width: min(360px, 80vw);
		font-size: .7em;
		height: min(40vh, 360px);
		resize: none;
	}
`
const SubmitButton = styled(BaseButton)`
	width: min(360px, 80vw);
	margin: auto 0;
	font-size: .7em;
`
const ContactInfo = styled.div`
	flex: 1;
	display: grid;
	place-content: center;
	font-size: .8em;
	padding: 10px;
`

export default function Contact() {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState(0)

	function sendMessage() {
		if (!validate()) return false
		setStatus(1)
		fetch('/.netlify/functions/sendMessage', {
			method: 'post',
			body: JSON.stringify({
				name, email, message
			})
		})
		.then(e => {
			if (e.status === 200) {
				setStatus(2)
			} else {
				setStatus(0)
			}
		})
	}

	function getSubmitBtnText() {
		switch(status) {
			case 0:
				return 'Submit'
			case 1:
				return 'Sending...'
			case 2:
				return '✔'
		}
	}
	function validate() {
		return status === 0 && name && email && message
	}

	return (
		<Container>
			<ContactInfo>
				<div>e-mail: <a href="mailto:rugia813@yahoo.com.tw">rugia813@yahoo.com.tw</a></div>
				<div>github: <a href="https://github.com/rugia813">https://github.com/rugia813</a></div>
				<div>linkedIn: </div>
			</ContactInfo>

			<MessagePanel>
				<h2>Leave a Message</h2>

				<label>
					Name:
					<input name="name" placeholder="your name" value={name} onChange={e => setName(e.target.value)} />
				</label>

				<label>
					e-mail:
					<input name="email" placeholder="your email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
				</label>

				<label>
					Message:
					<textarea name="message" placeholder="your message" value={message} onChange={e => setMessage(e.target.value)} />
				</label>

				<SubmitButton disabled={!validate()} onClick={sendMessage}>{getSubmitBtnText()}</SubmitButton>
			</MessagePanel>
		</Container>
	)
}