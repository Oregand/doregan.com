import React from 'react'
import { Link } from 'gatsby'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Wrapper } from './styles'

const NavbarLinks = ({ desktop }) => (
	<Wrapper desktop={desktop}>
		<AnchorLink href="#about">About</AnchorLink>
		<AnchorLink href="#projects">Projects</AnchorLink>
		<AnchorLink href="#prices">Prices</AnchorLink>
		<AnchorLink href="#travel">Travel</AnchorLink>
		<AnchorLink href="#contact">Contact</AnchorLink>
		<Link to="/blog">Blog</Link>
	</Wrapper>
)

export default NavbarLinks
