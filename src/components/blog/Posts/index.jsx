import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Container, Card } from 'Common'
import starIcon from 'Static/icons/star.svg'
import forkIcon from 'Static/icons/fork.svg'
import { Wrapper, Grid, Item, Content, Stats } from './styles'

export const Posts = () => {
	const {
		allMarkdownRemark
		} = useStaticQuery(graphql`
			{
				allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
				  edges {
					node {
					  id
					  excerpt(pruneLength: 100)
					  frontmatter {
						date(formatString: "MMMM DD, YYYY")
						path
						title
					  }
					}
				}
			}
		}
	`)
	return (
		<Wrapper as={Container} id="posts">
			<h2>My Blog Posts</h2>
			<Grid>
				{allMarkdownRemark.edges.map(({ node }) => (
					<Item
						key={node.id}
						as={Link}
						to={node.frontmatter.path}
					>
						<Card>
							<Content>
								<h4>{node.frontmatter.title}</h4>
								<p>{node.excerpt}</p>
								<small>{node.frontmatter.date}</small>
							</Content>
							<Stats>
								<div>
									<img src={starIcon} alt="stars" />
									<span>0</span>
								</div>
								<div>
									<img src={forkIcon} alt="forks" />
									<span>0</span>
								</div>
							</Stats>
						</Card>
					</Item>
				))}
			</Grid>
		</Wrapper>
	)
}
