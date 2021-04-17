import styled from "@emotion/styled";
import github from "../../static/svgs/github.svg";
import linkedin from "../../static/svgs/linkedin.svg";
import stack_overflow from "../../static/svgs/stack_overflow.svg";

const icon = (url) => styled.span`
    display: inline-block;
    width: 25px;
    height: 25px;
    &::after {
        content: url(${url})
    }
`

export const GithubIcon = icon(github)
export const LinkedinIcon = icon(linkedin)
export const StackoverflowIcon = icon(stack_overflow)