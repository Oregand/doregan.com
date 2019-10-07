import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'Common'
import dev from 'Static/illustrations/skills.svg'
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles'

export const Skills = () => (
	<Wrapper id="about">
		<SkillsWrapper as={Container}>
			<Thumbnail>
				<img src={dev} alt="I’m John and I’m a Backend & Devops engineer!" />
			</Thumbnail>
			<Details>
				<h1>Hi There!</h1>
				<p>
					I'm an Irish software developer from Ireland. I explain with words and code. Former head of frontend at VSWare LTD. Passionate about JavaScript, React, Functional Programming and all things maths.
				</p>
				<p>
					I offer freelance work building websites for all types of clients, though my specialty is in e-commerce and SEO. If you want a small business website, a online portfolio, an IOS/Android App or anything bigger, give me a shout.
				</p>
				<p>
					I price my work depending on each client to ensure the best quote possible for you and your project.
				</p>
				<Button as={AnchorLink} href="#contact">
					Hire me
				</Button>
			</Details>
		</SkillsWrapper>
	</Wrapper>
)
