import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
const Container = styled.div`
`
const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-right: auto;
  margin-bottom: 12px;
  margin-left: auto;
  &:last-child {
    margin-bottom: 0;
  }
`
const Avatar = styled.img`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 96px;
  width: 96px;
  height: 96px;
  margin: 0;
`
const Description = styled.div`
  flex: 1;
  margin-left: 18px;
  padding: 12px;
`
const Username = styled.h2`
  margin: 0 0 12px 0;
  padding: 0;
`
const Excerpt = styled.p`
  margin: 0;
`
const Test = styled.div({
    margin: 3,
    color: 'red'
})
// Using css prop provides a concise and flexible API to style the components. //
const underline = css`
  text-decoration: underline;
`
const User = props => (
  <UserWrapper>
    <Avatar src={props.avatar} alt="" />
    <Description>
      <Username>{props.username}</Username>
      <Excerpt>{props.excerpt}</Excerpt>
    </Description>
    <Test>11</Test>
  </UserWrapper>
)
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
  return (
    <Container>
      <h1 css={underline}>About Emotion</h1>
      <p>Emotion is uber cool</p>
      <Stackoverflow />
    </Container>
  )
}