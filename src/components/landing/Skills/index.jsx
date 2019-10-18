import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'Common'
import dev from 'Static/illustrations/skills.svg'
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles'

export const Skills = () => (
	<Wrapper id="about">
		<SkillsWrapper as={Container}>
			<Thumbnail>
				<img src={dev} alt="I’m David and I’m a Frontend engineer!" />
			</Thumbnail>
			<Details>
				<h1>Irish Digital Nomad</h1>
				<p>
					Im David, an Irish software developer from Ireland. I explain with words and code. Former head of frontend at VSWare LTD. Passionate about JavaScript, React, Functional Programming and all things maths.
				</p>
				<p>
					I offer freelance work building websites for all types of clients, though my specialty is in e-commerce and SEO. If you want a small business website, a online portfolio, an IOS/Android App or anything bigger, give me a shout.
				</p>
				<p>
					I price my work depending on each client to ensure the best quote possible for you and your project. Though I have provided rough estimates for prices below.
				</p>
				<p>
					Most of my work is done remotely(I've been working this way for more than 2 years now), and if you require references please let me know.
				</p>
				<Button as={AnchorLink} href="#contact">
					Hire me
				</Button>
			</Details>
		</SkillsWrapper>
	</Wrapper>
)
