import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { HeaderBlog } from 'Theme'
import { Container, Button } from 'Common'
import dev from 'Static/illustrations/dev.svg'
import { Wrapper, IntroWrapper, Details, Thumbnail } from './styles'

export const Intro = () => (
	<Wrapper>
		<HeaderBlog />
		<IntroWrapper as={Container}>
			<Details>
				<h1>Hi There!</h1>
				<h4>I’m David O'Regan and I’m a frontend/JavaScript developer from Ireland.</h4>
				<Button as={AnchorLink} href="#contact">
					This Is Where I Write
				</Button>
			</Details>
			<Thumbnail>
				<img src={dev} alt="I’m David O'Regan and I’m a frontend/JavaScript developer from Ireland." />
			</Thumbnail>
		</IntroWrapper>
	</Wrapper>
)
