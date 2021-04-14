import React, { useEffect, useState } from "react"
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Bg3d from "../components/3dBg/3dBg";
import { _breakPoint } from "../styles/consts";

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
    /* animation-delay: 1.5s; */
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
    animation-delay: .5s;
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

  const [scale, setScale] = useState(1400)

  useEffect(() => {
    rescale3dModel()
    window.addEventListener('resize', rescale3dModel)
    return () => {
      window.removeEventListener('resize', rescale3dModel)
    }
  }, [])

  function rescale3dModel() {
    const bp = _breakPoint
    const width = Math.min(window.innerWidth, bp)
    setScale(1400 + (bp - width) * 1.0)
  }

  return (
    <main>
      <Intro>
        <div className="intro-author"> {name} </div>
        <div className="intro-occupation">Frontend Developer</div>
      </Intro>
      <Bg3d scale={scale} />
    </main>
  )
}

export default IndexPage
