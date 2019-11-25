import React from 'react'
import { Layout, SEO } from 'Common'
import { Intro } from 'Components/landing'

import CV from '../../static/cv/David_O_Regan_-_Resume_New.pdf'


export default () => (
	<Layout>
		<SEO title="David O'Regan | CV" location="/cv" />
		<Intro />
		<div>
			<iframe src={CV}  height="700" width="100%" frameborder="0" />
		</div>
	</Layout>
)
