import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Container, Card } from 'Common'
import { Wrapper, Grid, Item, Content } from './styles'

export const Post = () => {
	const {
		markdownRemark
		} = useStaticQuery(graphql`
			{
			markdownRemark {
			  html
			  frontmatter {
				date(formatString: "MMMM DD, YYYY")
				path
				title
			  }
			}
		}
	`)
	return (
		<Wrapper as={Container} id="post">
			<Grid>
					<Item
						key={markdownRemark.frontmatter.path}
						as="div"
					>
						<Card>
							<Content>
								<h4>{markdownRemark.frontmatter.title}</h4>
								<small>{markdownRemark.frontmatter.date}</small>
								<div
									className="blog-post-content"
									dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
								/>
							</Content>
						</Card>
					</Item>
			</Grid>
		</Wrapper>
	)
}
