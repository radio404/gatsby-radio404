import React from "react"

import Layout from "../components/layout"
import TemplateDefault from "../components/page-templates/template-default";
import SEO from "../components/seo"

const PostPage = ({data}) => (
  <Layout>
    <SEO title={data.wordpressPage.title||''} />
    <TemplateDefault title={data.wordpressPage.title||''} subtitle={data.wordpressPage.subtitle||''}>
      <div className={`wp-content`} dangerouslySetInnerHTML={{ __html: data.wordpressPage.content}} />
    </TemplateDefault>
  </Layout>
)

export default PostPage

export const query = graphql`
    query($id: String!) {
        wordpressPage(id: { eq: $id }) {
            title
            content
            excerpt
            date(formatString: "MMMM DD, YYYY")
            author {
                name
            }
        }
    }
`
