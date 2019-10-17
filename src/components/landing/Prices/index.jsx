import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'Common'
import { Wrapper, PricesWrapper, Card, CardPopular, CardRibbon, CardAction, CardDescription, CardPrice, CardTitle } from './styles'

export const Prices = () => (
	<Wrapper id="prices">
		<PricesWrapper as={Container}>
            <Card>
                <CardTitle>
                    <h3>Small Site</h3>
                    <h4>Simple complexity / 2 - 5 page website</h4>
                    <h4>Great for a small business or personal portfolio!</h4>
                </CardTitle>
                <CardPrice>
                    <h1>
                        <sup>&dollar;</sup>
                        500 - 2,500
                        <small>One Time Payment</small>
                    </h1>
                </CardPrice>
                <CardDescription>
                    <ul>
                        <li>Website Design</li>
                        <li>Analytics</li>
                        <li>SEO</li>
                        <li>Hosting / Domain Setup</li>
                    </ul>
                </CardDescription>
                <CardAction>
                    <Button as={AnchorLink} href="#contact">
                        Hire me
                    </Button>
                </CardAction>
            </Card>
            <CardPopular>
                <CardRibbon>
                    <span>most popular</span>
                </CardRibbon>
                <CardTitle>
                    <h3>Medium Website</h3>
                    <h4>Moderate complexity / 5 - 15 page website</h4>
                    <h4>Suitable for e-commerce, complex portfolio or simple mobile app</h4>
                </CardTitle>
                <CardPrice>
                    <h1>
                        <sup>&dollar;</sup>
                        2,500 - 7,500
                        <small>One Time Payment</small>
                    </h1>
                </CardPrice>
                <CardDescription>
                    <ul>
                        <li>Website Design</li>
                        <li>Analytics</li>
                        <li>SEO</li>
                        <li>Hosting / Domain Setup</li>
                    </ul>
                </CardDescription>
                <CardAction>
                    <Button as={AnchorLink} href="#contact">
                        Hire me
                    </Button>
                </CardAction>
            </CardPopular>
            <Card>
                <CardTitle>
                    <h3>Large Website</h3>
                    <h4>High complexity / 15 - 25 page website</h4>
                    <h4>Suitable for e-commerce, complex portfolio or complex mobile app</h4>
                </CardTitle>
                <CardPrice>
                    <h1>
                        <sup>&dollar;</sup>
                        7,500 - 15,000
                        <small>One Time Payment</small>
                    </h1>
                </CardPrice>
                <CardDescription>
                    <ul>
                        <li>Website Design</li>
                        <li>Analytics</li>
                        <li>SEO</li>
                        <li>Hosting / Domain Setup</li>
                    </ul>
                </CardDescription>
                <CardAction>
                    <Button as={AnchorLink} href="#contact">
                        Hire me
                    </Button>
                </CardAction>
            </Card>
		</PricesWrapper>
	</Wrapper>
)
