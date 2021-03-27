import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { graphql } from 'gatsby'

const ProjectPanel = styled.div`
  margin: 0;
  color: white;
  img {
    width: 42vw;
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

    const [locked, setLocked] = useState(false)
    function onWheel(e) {
        if (locked) return false
        setLocked(true)
        setTimeout(() => {
            setLocked(false)
        }, 800);

        const deltaY = e.deltaY
        setIdx(prev => {
            let res
            if (deltaY > 0) {
                // down
                res = (prev === nodes.length - 1) ? 0 : prev + 1
            } else {
                // up
                res = (prev === 0) ? nodes.length - 1 : prev - 1
            }
            return res
        })
    }

    const [cur, setCur] = useState({
        key: '',
        title: '',
        content: '',
        slug: '',
        cover: '',
        tags: '',
    })
    const [idx, setIdx] = useState(0)
    useEffect(() => {
        setCur(nodes[idx])
    }, [idx])

    return  (
        <ProjectPanel onWheel={onWheel}>
            <h1>{cur.title} {idx}</h1>
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