import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"
import Bg3d from "./3dBg/3dBg";

const navColor = 'rgba(143,142,167,0.1)'
const breakPoint = '858px'
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
      height: 75px;
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

        :nth-of-type(1) { --fadeInDelay: .6s; }
        :nth-of-type(2) { --fadeInDelay: .4s; }
        :nth-of-type(3) { --fadeInDelay: .2s; }
        :nth-of-type(4) { --fadeInDelay: 0s; }

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
        <Bg3d />
        {children}
      </Content>
    </div>
  )
}