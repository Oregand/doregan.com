import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Wrapper } from './styles'

const NavbarLinks = ({ desktop }) => (
	<Wrapper desktop={desktop}>
		<AnchorLink href="#about">About</AnchorLink>
		<AnchorLink href="#posts">Blog</AnchorLink>
		<AnchorLink href="#projects">Projects</AnchorLink>
		<AnchorLink href="#prices">Prices</AnchorLink>
		<AnchorLink href="#travel">Travel</AnchorLink>
		<AnchorLink href="#contact">Contact</AnchorLink>
	</Wrapper>
)

export default NavbarLinks
