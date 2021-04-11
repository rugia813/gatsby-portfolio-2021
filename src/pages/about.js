import React from "react"
import styled from "@emotion/styled"
import { blurColor } from "../styles/consts"
const Container = styled.div`
  color: white;
`
const Intro = styled.div`
  /* background-color: ${blurColor}; */
  width: 100%;
  min-height: 20vh;
  padding: 20px;
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
        <p>Hi, my name is Chun-Wei Li(Jay Li),</p>
        <p>I am a front-end develper with {exp} years of experiance.</p>
      </Intro>
      <Stackoverflow />
    </Container>
  )
}