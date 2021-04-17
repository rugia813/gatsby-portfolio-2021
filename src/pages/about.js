import React from "react"
import styled from "@emotion/styled"
import { blurColor, mobile } from "../styles/consts"
import { GithubIcon, LinkedinIcon, StackoverflowIcon } from "../components/icons"

const Container = styled.div`
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  ${mobile} {
    align-items: center;
  }
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
    width: 100%;
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
          I am a front-end developer with {exp} years of experience.
          Most of my work experience involves building SPA with Vue.js.
          I am always learning new things, and trying to make my projects better.
        </p>
      </Intro>

      <Social>
        <div><LinkedinIcon /> LinkedIn:</div>
        <a href="https://www.linkedin.com/in/jay-li-b1399079/">https://www.linkedin.com/in/jay-li-b1399079/</a>

        <div><GithubIcon /> Github:</div>
        <a href="https://github.com/rugia813">https://github.com/rugia813</a>

        <div><StackoverflowIcon /> Stackoverflow:</div>
        <Stackoverflow />
      </Social>
    </Container>
  )
}