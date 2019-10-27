import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Container, Card } from 'Common'
import starIcon from 'Static/icons/star.svg'
import forkIcon from 'Static/icons/fork.svg'
import { Wrapper, Grid, Item, Content, Stats } from './styles'

export const Post = () => {
	const {
		markdownRemark
		} = graphql`
		  query($path: String!) {
			markdownRemark(frontmatter: { path: { eq: $path } }) {
			  html
			  frontmatter {
				date(formatString: "MMMM DD, YYYY")
				path
				title
			  }
			}
		}
	`

    console.log(markdownRemark)
	return (
		<Wrapper as={Container} id="posts">
			<h2></h2>
			<Grid>
			</Grid>
		</Wrapper>
	)
}
