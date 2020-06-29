import React from 'react'
import { Container } from 'Common'
import { Wrapper, TravelWrapper, Details, Thumbnail } from './styles'


export const Travel = () => {
	return (
		<Wrapper id="travel">
			<TravelWrapper as={Container}>
				<Thumbnail>
					<img src="https://about.gitlab.com/images/team/davidoregan-crop.jpg" alt="I’m David and I’m a Frontend engineer!"/>
				</Thumbnail>
				<Details>
					<h1>Places I Work From</h1>
					<p>
						For the last 2 years I've been a massive advocate of remote work for software developers as it
						enables us to explore the world, soak up inspiration from other cultures and problem solve in
						ways we might never have sitting behind a desk. I am luck enough to work for a company like GitLab that enables me to continue that lifestyle!
					</p>
					<a type="button" href="https://about.gitlab.com/company/team/#oregand">
						My GitLab Life
					</a>
				</Details>
			</TravelWrapper>
		</Wrapper>
	)
}
