import React, { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { graphql } from 'gatsby'
import { mobile, desktop } from "../styles/consts";
import { BaseButton } from "../components/baseButton";
import loadingSVG from '../../static/svgs/loading.svg'

const ProjectPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    width: 100%;
    height: 100%;
    color: white;

    ${desktop} {

    }

    ${mobile} {

    }

    .project-info {
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-rows: 1fr 12px 2fr 1fr;
        transition: 1s ease-in-out;

        ${desktop} {
            width: 30vw;
            height: 30vh;
        }

        ${mobile} {
            height: 100%;
            width: 100%;
        }

        div {
            transition: filter 1s ease-in-out;
        }

        .hidden {
            filter: opacity(0);
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
            text-decoration: underline;

            ${mobile} {
                justify-self: end;
            }
            &.hidden {
                cursor: default;
            }
        }
    }

    .cover {
        transition: 1s ease-in-out;
        overflow: hidden;
        height: 100%;
        display: flex;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        ${desktop} {
            grid-row: 1;
            justify-self: baseline;
            width: 33vw;
        }
        ${mobile} {
            &.hidden {
                height: 0px;
            }
        }
    }

`

const ProjectSelector = styled.div `
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: 1s ease-in-out;

    ${desktop} {
        flex-direction: row;
    }

    ${mobile} {
        height: 98%;
        flex-direction: column-reverse;

        &.short {
            height: 25%;
        }
    }
`

const DetailPanel = styled.div`
    height: 0;
    overflow: hidden;
    transition: 1s ease-in-out;
    display: grid;
    place-content: center;
    align-content: space-evenly;
    filter: opacity(0);

    ${desktop} {
        max-width: 50%;
        margin: 0 auto;
    }

    &.show {
        height: 100%;
        filter: opacity(100);
        overflow-y: auto;
    }

    img {
        max-width: 33vw;
    }
`

const Loading = styled.img`
  transform: scale(0.5) translateX(25%);
`

export default function ProjectList({ data }) {
    const { allMarkdownRemark } = data
    const { edges } = allMarkdownRemark
    const nodes = edges.map(({node}) => ({
        key: node.frontmatter.slug,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
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
        if (locked || inDetail) return false
        setLocked(true)
        setTimeout(() => {
            setLocked(false)
        }, 200);

        if (e.deltaY > 0) {
            // down
            setIdx(_idx => (_idx === nodes.length - 1) ? 0 : _idx + 1)
        } else {
            // up
            setIdx(_idx => (_idx === 0) ? nodes.length - 1 : _idx - 1)
        }
    }
    function goUp() {
        changeCur({deltaY: 0})
    }
    function goDown() {
        changeCur({deltaY: 1})
    }

    const [idx, setIdx] = useState(0)
    const [cur, setCur] = useState(nodes[idx])
    useEffect(() => {
        setCur(nodes[idx])
        setLoading(true)
    }, [idx])

    const [loading, setLoading] = useState(true)

    return  (
        <ProjectPanel onWheel={changeCur}>
            <ProjectSelector className={inDetail ? 'short' : ''}>
                <div className="project-info">
                    <h1>{cur.title}</h1>
                    <div className={`pageNum ${inDetail ? 'hidden' : ''}`}>{idx + 1} / {total}</div>
                    <BaseButton className="detailBtn" onClick={openDetail}>
                        {inDetail ? 'Back' : 'Detail'}
                    </BaseButton>
                    <div className={`pageNav ${inDetail ? 'hidden' : ''}`}>
                        <span onClick={() => !inDetail && goUp(idx)}>Previous</span>
                        <span onClick={() => !inDetail && goDown(idx)}>Next</span>
                    </div>
                </div>

                <div className={`cover ${inDetail ? 'hidden' : ''}`} ref={coverRef}>
                    {loading && <Loading src={loadingSVG} />}
                    <img src={cur.cover} alt={cur.title + ' image'} onLoad={e => setLoading(false)} />
                </div>
            </ProjectSelector>

            <DetailPanel className={inDetail ? 'show' : ''}>
                {cur.date}
                <div dangerouslySetInnerHTML={{ __html: cur.content + '' }} />
            </DetailPanel>
        </ProjectPanel>
    )
}

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
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