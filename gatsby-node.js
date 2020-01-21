/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // query content for WordPress posts
  const result = await graphql(`
    query {
      site {
        siteMetadata{
          wp_url
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            slug
            link
          }
        }
      }
      allWordpressPage {
        edges {
          node {
            id
            slug
            link
          }
        }
      }
    }
  `)
  const postTemplate = path.resolve(`./src/templates/post.js`),
        pageTemplate = path.resolve(`./src/templates/page.js`);

  const getPathFromWpUrl = (wpUrl)=>{
      console.log(result.data.site.siteMetadata.wp_url+'/',wpUrl)
      return wpUrl.replace(result.data.site.siteMetadata.wp_url+'/','');
  }

  result.data.allWordpressPost.edges.forEach(edge => {
    const path = getPathFromWpUrl(edge.node.link);
    console.log(edge.node.slug,path)
    createPage({
      // will be the url for the page
      path: getPathFromWpUrl(edge.node.link),
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
        slug: edge.node.slug,
      },
    })
  })

  result.data.allWordpressPage.edges.forEach(edge => {
    const path = getPathFromWpUrl(edge.node.link);
    if(path==='') return // ignore home page
    createPage({
      // will be the url for the page
      path: path,
      // specify the component template of your choice
      component: slash(pageTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
        slug: edge.node.slug,
      },
    })
  })
}
