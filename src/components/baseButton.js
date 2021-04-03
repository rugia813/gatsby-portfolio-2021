import styled from "@emotion/styled";
import { blurColor } from "../styles/consts";

export const BaseButton = styled.div`
	border: white 1px solid;
	background-color: ${blurColor};
  backdrop-filter: blur(5px);
	padding: 10px;
	min-width: 120px;
	min-height: 32px;
	color: white;
	text-align: center;
	cursor: pointer;
	transition: 0.45s ease-out;

	:hover {
		background-color: rgba(0, 0, 200, .5);
		border-color: rgba(160, 160, 255);
	}

	:active {
		background-color: rgba(128, 128, 200, .5);
	}

	::after {
		content: '';
		border: 1px solid;
		border-color: rgba(0,0,0,0);
		position: absolute;
		top: 0px;
		bottom: 0px;
		right: 0px;
		left: 0px;
		transition: 0.25s ease-in-out;
	}
	:hover::after {
		border-color: white;
		top: -5px;
		bottom: -5px;
		right: -5px;
		left: -5px;
	}
`