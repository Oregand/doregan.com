import React from 'react'
import { Link } from 'gatsby'
import { Wrapper } from './styles'

const NavbarLinks = ({ desktop }) => (
	<Wrapper desktop={desktop}>
        <Link to="/">Home</Link>
		<Link to="/blog">Blog</Link>
	</Wrapper>
)

export default NavbarLinks
