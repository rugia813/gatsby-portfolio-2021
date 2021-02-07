import React from "react"
import styled from "@emotion/styled"

const ProjectPanel = styled.div`
  margin: 0;
`
const Project = ({title, content, slug, cover, tags}) => (
    <ProjectPanel>
        <div>{slug}</div>
        <div>{title}</div>
        <div>{content}</div>
        <div>{tags}</div>
        <div><img src={cover} /></div>
    </ProjectPanel>
)

export default function ProjectList({ data }) {
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark
    return  (
        <ul>
            {
                edges.map(({node}) => 
                    <Project 
                        key={node.frontmatter.slug}
                        title={node.frontmatter.title}
                        content={node.html}
                        slug={node.frontmatter.slug}
                        cover={node.frontmatter.cover}
                        tags={node.frontmatter.tags}
                    />
                )
            }
        </ul>
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