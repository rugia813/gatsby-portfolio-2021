import styled from "@emotion/styled"
import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { mobile, _breakPoint, desktop, blurColor } from "../styles/consts";
// import Bg3d from "./3dBg/3dBg";

const navColor = blurColor

const Nav = styled.nav`
  position: fixed;
  height: 100vh;
  width: 75px;
  /* box-shadow: 5px 5px 5px 1px ${navColor}; */
  color: white;
  display: flex;
  align-items: center;
  z-index: 100;

  #check, .checkbtnlabel {
    display: none;
  }

  ${desktop} {
    backdrop-filter: blur(10px);
    background-color: ${navColor};
    font-size: 16px;
    border-right: white 1px solid;
    animation: nav-slide-in 1.3s forwards;
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
    /* border-bottom: white 1px solid; */
    #check {
      ~ .checkbtnlabel::after {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 100 80' width='25' height='25'%3E%3Crect width='70' height='5'%3E%3C/rect%3E%3Crect y='30' width='70' height='5'%3E%3C/rect%3E%3Crect y='60' width='70' height='5'%3E%3C/rect%3E%3C/svg%3E");
      }
    }
    #check:checked {
      & ~ ul{
        left: 50%;
      }
      ~ .checkbtnlabel::after{
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='20' height='20' viewBox='0 0 512.001 512.001' fill='white'%3E%3Cg%3E%3Cg%3E%3Cpath d='M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717 L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859 c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287 l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285 L284.286,256.002z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
      }
    }
    .checkbtnlabel{
      width: 25px;
      height: 25px;
      position: fixed;
      z-index: 5;
      display: block;
      right: 15px;
    }
  }
`
const Menu = styled.ul`
  list-style: none;

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
        text-decoration: none;
        transition: 1s all ease;

        &.active {
          color: #ffde7c;
          font-size: 24px;
        }
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
            animation: nav-item-fade-in 1.2s forwards;
            animation-delay: var(--fadeInDelay);
            animation-timing-function: ease;
          }
          /* a[aria-current] {
            border-left: 3px solid;
          } */
        }
      }
      @keyframes nav-item-fade-in {
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
    height: calc(100vh);
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
          <li><div className="bound"><Link activeClassName="active" to="/">Home</Link></div></li>
          <li><div className="bound"><Link activeClassName="active" to="/about/">About</Link></div></li>
          <li><div className="bound"><Link activeClassName="active" to="/project-list/">Projects</Link></div></li>
          <li><div className="bound"><Link activeClassName="active" to="/contact/">Contact</Link></div></li>
        </Menu>
      </Nav>
      <Content>
        {/* <Bg3d scale={scale} /> */}
        {children}
      </Content>
    </div>
  )
}