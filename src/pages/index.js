import * as React from "react"
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Intro = styled.div`
  display: block;
  font-family: 'Anton', fantasy;
  * {
    font-family: inherit;
  }
  .intro-author {
    opacity: 0;
    position: relative;
    font-size: 15vh;
    color: white;
    white-space: nowrap;

    animation-name: textFadeInLeft;
    animation-delay: 1.5s;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
  }
  .intro-occupation {
    opacity: 0;
    position: relative;
    font-size: 3vh;
    color: #d7ac2f;
    
    animation-name: textFadeInBottom;
    animation-delay: 2s;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
  }
  @keyframes textFadeInLeft {
    from {
        left: -10vh;
        opacity: 0;
    }
    to {
        left: 0vh;
        opacity: 1;
    }
  }
  @keyframes textFadeInBottom {
    from {
        top: 50px;
        opacity: 0;
    }
    to {
        top: 0vh;
        opacity: 1;
    }
  }

`
const textGrow = css`
  transition: transform .1s ease-in-out; 
  transition-delay: .4s;
  display: inline-block;
  min-width: 2rem;
  &:hover { 
      transform: scale(1.1); 
      transition-delay: 0s;
  }
`

const IndexPage = () => {
  const name = 'Jay Li'.split('').map((e) => <span css={textGrow} key={e}>{e}</span>)
  return (
    <main>
      <Intro>
        <div className="intro-author"> {name} </div>
        <div className="intro-occupation">Web Developer</div>
      </Intro>
    </main>
  )
}

export default IndexPage
