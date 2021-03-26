import styled from "@emotion/styled"
import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import Bg3d from "./3dBg/3dBg";

const navColor = 'rgba(143,142,167,0.1)'
const _breakPoint = 858
const breakPoint = `${_breakPoint}px`
const desktop = `@media (min-width: ${breakPoint})`
const mobile = `@media (max-width: ${breakPoint})`

const Nav = styled.nav`
  position: fixed;
  height: 100vh;
  width: 75px;
  /* box-shadow: 5px 5px 5px 1px ${navColor}; */
  backdrop-filter: blur(10px);
  background-color: ${navColor};
  color: white;
  display: flex;
  align-items: center;

  #check, .checkbtnlabel {
    display: none;
  }

  ${desktop} {
    font-size: 16px;
    border-right: white 1px solid;
    animation: nav-slide-in .5s forwards;
    animation-timing-function: ease;
  }
  @keyframes nav-slide-in {
    0% {
      height: 0%;
      background-color: rgba(0,0,0,0);
    }
    75% {
      height: 100%;
      background-color: rgba(0,0,0,0);
    }
    100% {
      background-color: ${navColor};
    }
  }
  ${mobile} {
    height: 50px;
    width: 100vw;
    border-bottom: white 1px solid;
    #check {
      ~ .checkbtnlabel::after {
        content: '三';
      }
    }
    #check:checked {
      & ~ ul{
        left: 50%;
      }
      ~ .checkbtnlabel::after{
        content: 'X';
      }
    }
    .checkbtnlabel{
      position: fixed;
      z-index: 5;
      display: block;
      right: 15px;
    }
  }
`
const Menu = styled.ul`
  ${Nav} & {
    display: flex;
    flex-direction: column;
    flex: 1;

    li {
      flex: 1;
      margin: auto;
      text-align: center;

      a {
        color: white;
      }
    }

    ${desktop} {
      li {
        writing-mode: tb;
        transform: rotate( 180deg );
        margin-bottom: 64px;
        width: 50%;

        :nth-of-type(1) { --fadeInDelay: .5s; }
        :nth-of-type(2) { --fadeInDelay: .7s; }
        :nth-of-type(3) { --fadeInDelay: .9s; }
        :nth-of-type(4) { --fadeInDelay: 1.1s; }

        .bound {
          overflow: hidden;
          a {
            position: relative;
            bottom: 100%;
            animation: fadeIn 1.2s forwards;
            animation-delay: var(--fadeInDelay);
            animation-timing-function: ease;
          }
          /* a[aria-current] {
            border-left: 3px solid;
          } */
        }
      }
      @keyframes fadeIn {
        to {
          bottom: 0%;
        }
      }
    }
    ${mobile} {
      display: flex;
      position: fixed;
      width: 50%;
      height: 50vh;
      background: black;
      top: 0;
      left: 100%;
      text-align: left;
      transition: left .5s;
      transition-timing-function: ease-in-out;

      li {
        flex: 1;
        text-align: center;
        font-size: 20px;
        height: auto;
        display: flex;
        place-items: center;
        margin: 0;
        background-color: ${navColor};

        .bound, a {
          display: block;
          width: 100%;
          /* height: 100%; */
        }
      }
    }
  }
`
const Content = styled.div`
  overflow-x: hidden;
  transition: padding .5s ease-in-out;
  ${desktop} {
    height: 100vh;
    width: calc(100vw - 75px);
    margin-left: 75px;
    padding: min(10%, 100px);
  }
  ${mobile} {
    height: calc(120vh - 0px);
    width: 100vw;
    padding: 50px 10px;
  }
`

export default function Layout({ children }) {
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
    <div>
      <Nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtnlabel">
          {/* <i class="fas fa-bars"></i> */}
        </label>
        <Menu>
          <li><div className="bound"><Link to="/">Home</Link></div></li>
          <li><div className="bound"><Link to="/about">About</Link></div></li>
          <li><div className="bound"><Link to="/project-list">Projects</Link></div></li>
          <li><div className="bound"><Link to="/contact">Contact</Link></div></li>
        </Menu>
      </Nav>
      <Content>
        <Bg3d scale={scale} />
        {children}
      </Content>
    </div>
  )
}