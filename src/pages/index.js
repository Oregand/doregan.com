import React from 'react'
import { Layout, SEO } from 'Common'
import { Intro, Skills, Contact, Projects, Prices } from 'Components/landing'

export default () => (
	<Layout>
		<SEO />
		<Intro />
		<Projects />
		<Skills />
		<Prices />
		<Contact />
	</Layout>
)
