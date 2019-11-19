const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
      const postTemplate = path.resolve('src/pages/blog-post.js');
      resolve(
        graphql(
          `
            {
              allMarkdownRemark {
                edges {
                  node {
                    frontmatter {
                      path
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }
          result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            const path = node.frontmatter.path;

            createPage({
              path,
              component: postTemplate,
              context: {
                // the value passed in the context will be available for you
                // to use in your page queries as a GraphQL variable,
                // as it can be see in the template snippet

                pathSlug: path,
              },
            });
            resolve();
          });
        })
      );
    });
  };