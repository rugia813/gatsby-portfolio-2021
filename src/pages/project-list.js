import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { graphql } from 'gatsby'
import { mobile, _breakPoint, breakPoint, desktop } from "../styles/consts";

const ProjectPanel = styled.div`
    display: grid;
    place-items: center;
    margin: 0;
    width: 100%;
    height: 100%;
    color: white;

    .project-info {

    }

    img {
        width: 100%;
        ${mobile} {
            place-self: baseline;
        }
    }

    ${desktop} {
        grid-template-columns: 1fr 1fr;
    }

    ${mobile} {
        grid-template-rows: 4fr 8fr;
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
            <div className="project-info">
                <h1>{cur.title}</h1>
                {idx + 1} / {total}
                <div>
                    <span onClick={() => goUp(idx)}>Previous</span>
                    <span onClick={() => goDown(idx)}>Next</span>
                </div>
            </div>
            <img src={cur.cover} alt={cur.title + ' image'} />
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