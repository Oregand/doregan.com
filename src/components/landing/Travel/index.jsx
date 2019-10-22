import React, { useState, useEffect } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'Common'
import dev from 'Static/illustrations/skills.svg'
import { Wrapper, TravelWrapper, Details, Thumbnail } from './styles'

const Gram = ({ src, code }) => (
  <a
    className="InstagramFeed--EmptyPost InstagramFeed--EmptyPost-loaded"
    href={`https://instagram.com/p/${code}`}
    rel="noopener noreferrer"
    target="_blank"
    aria-label="Instagram Post Link"
  >
    <img background src={src} lazy alt="instagram image" />
  </a>
)


export const Travel = () => {
	const [gram, setGram] = useState(undefined)
	useEffect(() => {
		fetch(`https://instagramapi.thrivex.io/?ref=21501957812.1677ed0.6eebd468f3d5432abdb72d163f96dab9`)
          .then(res => res.json())
          .then(data => setGram(data && data.items ? data.items : []))
          .catch(err => console.error(err))
	}, [])

	return (
		<Wrapper id="travel">
			<TravelWrapper as={Container}>
				<Thumbnail>
					{gram &&  <Gram key={gram[0].code} src={gram[0].display_src} code={gram[0].code} caption={gram[0].caption} />}
					{!gram && <img src={dev} alt="I’m David and I’m a Frontend engineer!"/>}
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
