import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'Common'
import { useStaticQuery, graphql } from 'gatsby'
import dev from 'Static/illustrations/skills.svg'
import { Wrapper, TravelWrapper, Details, Thumbnail } from './styles'

export const Travel = () => {
	const {
		allInstaNode,
	} = useStaticQuery(graphql`
		{
		  instaUserNode {
			id
			username
			full_name
			biography
			profile_pic_url
			profile_pic_url_hd
		  }
		}
	`)

	console.log(allInstaNode)

	return (
		<Wrapper id="travel">
			<TravelWrapper as={Container}>
				<Thumbnail>
					<img src={dev} alt="I’m David and I’m a Frontend engineer!"/>
				</Thumbnail>
				<Details>
					<h1>Places I Work From</h1>
					<p>
						For the last 2 years I've been a massive advocate of remote work for software developers as it
						enables us to explore the world, soak up inspiration from other cultures and problem solve in
						ways we might never have sitting behind a desk. My Instagram serves as a travel log and
						accountability tool.
					</p>
					<Button as={AnchorLink} href="#contact">
						Hire me
					</Button>
				</Details>
			</TravelWrapper>
		</Wrapper>
	)
}
