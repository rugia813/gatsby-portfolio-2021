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
          Hello, I'm Chun-Wei Li, also known as Jay, and I'm a front-end developer with {exp} years of experience specializing in building single-page applications (SPA) with Vue.js.
          My passion for problem-solving and ability to learn quickly have been the driving forces behind my successful career in web development.
        </p>
        <br/>
        <p>
          Throughout my career, I've tackled a variety of complex challenges, which has allowed me to sharpen my skills in problem-solving, debugging, and troubleshooting.
          I take pride in being able to break down complex issues into simple and manageable components and coming up with effective solutions.
        </p>
        <br/>
        <p>
          I'm always striving to learn new technologies, programming languages, and development methodologies to improve my skills and stay up-to-date with the latest trends in the industry.
          I'm also passionate about exploring new libraries, and tools to help me optimize my development workflow and create more efficient and scalable code.
        </p>
        <br/>
        <p>
          In addition to my technical skills, I understand the importance of effective communication and collaboration in any development project.
          I have a proven track record of working well in a team environment and contributing positively to the project's success.
          I'm always open to feedback, willing to help others, and eager to learn from my colleagues to deliver the best results possible.
        </p>
        <br/>
        <p>
          Overall, I'm passionate about what I do, and I always look forward to new opportunities to put my skills to the test and create something truly exceptional.
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