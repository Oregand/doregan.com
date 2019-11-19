import React from 'react'
import { graphql } from 'gatsby';
import { Layout, SEO } from 'Common'
import { Intro, Post } from 'Components/blog'

const BlodPost = ({ data }) => {
  const { markdownRemark } = data;
  return (
      <Layout>
		<SEO title="David O'Regan - Blog" location="/blog" />
		<Intro />
		<Post markdownRemark={markdownRemark} />
	</Layout>
  );
};

export default BlodPost;

export const query = graphql`
  query($pathSlug: String) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`;