import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Container, Card } from 'Common'
import starIcon from 'Static/icons/star.svg'
import forkIcon from 'Static/icons/fork.svg'
import { Wrapper, Grid, Item, Content, Stats } from './styles'

export const Posts = () => {
	return (
		<Wrapper as={Container} id="posts">
			<h2>Posts</h2>
		</Wrapper>
	)
}
