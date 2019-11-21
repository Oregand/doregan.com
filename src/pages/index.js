import React from 'react'
import { Layout, SEO } from 'Common'
import { Intro, Skills, Contact, Projects, Prices, Travel } from 'Components/landing'
import { Posts } from 'Components/blog'

export default () => (
	<Layout>
		<SEO />
		<Intro />
		<Skills />
		<Posts />
		<Projects />
		<Prices />
		<Travel />
		<Contact />
	</Layout>
)
