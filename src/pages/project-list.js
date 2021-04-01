import React, { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { graphql } from 'gatsby'
import { mobile, desktop } from "../styles/consts";
import { BaseButton } from "../components/baseButton";

const ProjectPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    width: 100%;
    height: 100%;
    color: white;
    transition: 1s;

    ${desktop} {

    }

    ${mobile} {

    }

    .project-info {
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-rows: 1fr 12px 2fr 1fr;
        transition: 1s;

        ${desktop} {
            max-width: 500px;
            height: min-content;
        }

        ${mobile} {
            height: 35vh;
        }

        .pageNum {

        }
        .detailBtn {
            justify-self: center;
        }
        .pageNav {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
            cursor: pointer;
            ${mobile} {
                justify-self: end;
            }
        }
    }

    .cover {
        transition: 1s;
        img {
            width: 100%;
        }

        ${desktop} {
            grid-row: 1;
            justify-self: baseline;
            width: 33vw;
            transition: 1s ease-in-out;
        }
        ${mobile} {
            grid-row: 1;
            place-self: baseline;
            margin: auto;
            max-width: 75vw;
        }
    }

`

const ProjectSelector = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    transition: 1s ease-in-out;
`

const DetailPanel = styled.div`
    height: 0;
    overflow: hidden;
    transition: 1s cubic-bezier(0.39, 0.575, 0.565, 1);
    display: grid;
    place-content: center;
    filter: opacity(0);

    &.show {
        height: 100%;
        filter: opacity(100);
    }

    img {
        max-width: 33vw;
    }
`

export default function ProjectList({ data }) {
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark
    const nodes = edges.map(({node}) => ({
        key: node.frontmatter.slug,
        title: node.frontmatter.title,
        content: node.html,
        slug: node.frontmatter.slug,
        cover: node.frontmatter.cover,
        tags: node.frontmatter.tags,
    }))
    const total = nodes.length

    const coverRef = useRef(null)
    function openDetail(e) {
        setInDetail(!inDetail)
    }

    const [inDetail, setInDetail] = useState(false)

    const [locked, setLocked] = useState(false)
    function changeCur(e) {
        if (locked) return false
        setLocked(true)
        setTimeout(() => {
            setLocked(false)
        }, 800);

        if (e.deltaY > 0) {
            goDown()
        } else {
            goUp()
        }
    }
    function goUp() {
        setIdx(_idx => (_idx === 0) ? nodes.length - 1 : _idx - 1)
    }
    function goDown() {
        setIdx(_idx => (_idx === nodes.length - 1) ? 0 : _idx + 1)
    }

    const [cur, setCur] = useState({})
    const [idx, setIdx] = useState(0)
    useEffect(() => {
        setCur(nodes[idx])
    }, [idx])

    return  (
        <ProjectPanel onWheel={changeCur}>
            <ProjectSelector>
                <div className="project-info">
                    <h1>{cur.title}</h1>
                    <div className="pageNum">{idx + 1} / {total}</div>
                    <BaseButton className="detailBtn" onClick={openDetail}>Detail</BaseButton>
                    <div className="pageNav">
                        <span onClick={() => goUp(idx)}>Previous</span>
                        <span onClick={() => goDown(idx)}>Next</span>
                    </div>
                </div>

                <div className="cover" ref={coverRef}>
                    <img src={cur.cover} alt={cur.title + ' image'} />
                </div>
            </ProjectSelector>

            <DetailPanel className={inDetail ? 'show' : ''}>
                <div dangerouslySetInnerHTML={{ __html: cur.content + '' }} />
            </DetailPanel>
        </ProjectPanel>
    )
}

export const pageQuery = graphql`
    query {
        allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        title
                        slug
                        date
                        cover
                        tags
                    }
                    html
                }
            }
        }
    }
`