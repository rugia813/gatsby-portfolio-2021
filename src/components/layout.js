import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"

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
  border-right: white 1px solid;
  background-color: ${navColor};
  color: white;
  display: flex;
  align-items: center;

  ul {
    display: flex;
    flex-direction: column;
    flex: 1;

    li {
      flex: 1;
      margin: auto;
      height: 75px;
      text-align: center;

      & > a {
        color: white;
      }
    }
  }

  #check, .checkbtnlabel {
    display: none;
  }

  ${desktop} {
    font-size: 16px;
    ul {
      li {
        writing-mode: tb;
        transform: rotate( 180deg );
        margin-bottom: 64px;
      }
    }
  }
  ${mobile} {
    height: 50px;
    width: 100vw;
    ul {
      display: flex;
      position: fixed;
      width: 50%;
      height: 50vh;
      background: ${navColor};
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

        a {
          display: block;
          width: 100%;
          /* height: 100%; */
        }
      }
    }
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
    /* .checkbtnlabel
    a:hover,a.active{
      background: none;
      color: #0082e6;
    } */
  }
`
const Menu = styled.ul`

`
const Content = styled.div`
  overflow-x: hidden;
  ${desktop} {
    height: 100vh;
    width: calc(100vw - 75px);
    margin-left: 75px;
    padding: 5px;
  }
  ${mobile} {
    height: calc(100vh - 50px);
    width: 100vw;
    padding-top: 50px;
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
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/project-list">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </Nav>
      <Content>
        {children}
      </Content>
    </div>
  )
}