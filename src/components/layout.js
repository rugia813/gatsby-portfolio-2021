import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"

const navColor = '#2c3e50'

const Nav = styled.nav`
  position: fixed;
  height: 100vh;
  width: 75px;
  background-color: ${navColor};
  color: white;

  ul {
    display: flex;
    flex-direction: column;

    li {
      flex: 1;
      margin: auto;
      height: 75px;
      margin-top: 15px;
    }
  }

  #check, .checkbtnlabel {
    display: none;
  }

  @media (max-width: 952px){
    font-size: 16px;
  }
  @media (max-width: 858px){
    height: 50px;
    width: 100vw;
    ul{
      display: flex;
      flex-direction: row;
      position: fixed;
      width: 100vw;
      height: 10%;
      background: ${navColor};
      top: -10%;
      left: 0;
      text-align: left;
      transition: top .5s;
      transition-timing-function: ease-in-out;

      li{
        flex: 1;
        margin: auto;
        text-align: center;
        font-size: 20px;
        height: auto;
      }
    }
    #check {
      ~ .checkbtnlabel::after {
        content: '三';
      }
    }
    #check:checked {
      & ~ ul{
        top: 0;
      }
      ~ .checkbtnlabel::after{
        content: 'X';
      }
    }
    .checkbtnlabel{
      position: fixed;
      z-index: 5;
      display: block;
    }
    /* .checkbtnlabel
    a:hover,a.active{
      background: none;
      color: #0082e6;
    } */
  }
`
const Content = styled.div`
  @media (min-width: 859px){
    height: 100vh;
    width: calc(100vw - 75px);
    margin-left: 75px;
    padding: 5px;
  }
  @media (max-width: 858px){
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
          <li><Link to="/about">About Me</Link></li>
          <li><Link to="/project-list">Projects</Link></li>
          <li>Contact</li>
        </ul>
      </Nav>
      <Content>
        {children}
      </Content>
    </div>
  )
}