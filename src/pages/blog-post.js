import React from 'react'
import { Layout, SEO } from 'Common'
import { Intro, Post } from 'Components/blog'

export default () => (
	<Layout>
		<SEO title="David O'Regan - Blog" location="/blog" />
		<Intro />
		<Post />
	</Layout>
)
