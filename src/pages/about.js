import React from "react"
import styled from "@emotion/styled"
import { blurColor } from "../styles/consts"
const Container = styled.div`
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const Intro = styled.div`
  /* background-color: ${blurColor}; */
  width: 50%;
  min-width: 400px;
  min-height: 20vh;
`

const Social = styled.div`
  display: flex;
  flex-direction: column;

  a {
    width: min-content;
  }
`

const Stackoverflow = () => (
  <a href="https://stackoverflow.com/users/10253925/jay-li">
    <img src="https://stackoverflow.com/users/flair/10253925.png?theme=dark"
      width="208" height="58"
      alt="profile for Jay Li at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
      title="profile for Jay Li at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
    />
  </a>
)
export default function UsersList() {
  const exp = new Date().getFullYear() - 2017
  return (
    <Container>
      <Intro>
        <p>
          Hi, my name is Chun-Wei Li(Jay Li),
          I am a front-end develper with {exp} years of experiance.
          Most of my work experiance involves building SPA with Vue.js.
          I am always learning new things, and trying to make my projects better.
        </p>
      </Intro>

      <Social>
        <div>LinkIn:</div>
        <a href="https://linkin.com">https://linkin.com</a>

        <div>Github:</div>
        <a href="https://github.com/rugia813">https://github.com/rugia813</a>

        <div>Stackoverflow:</div>
        <Stackoverflow />
      </Social>
    </Container>
  )
}