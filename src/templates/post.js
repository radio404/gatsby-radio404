import React from "react"

import { graphql } from 'gatsby';
import TemplateDefault from "../components/page-templates/template-default";
import SEO from "../components/seo"

const PostPage = ({data}) => (
  <>
    <SEO title={data.wordpressPost.title||''} />
    <TemplateDefault title={data.wordpressPost.title||''} subtitle={data.wordpressPost.subtitle||''}>
      <div className={`wp-content`} dangerouslySetInnerHTML={{ __html: data.wordpressPost.content}} />
    </TemplateDefault>
  </>
)

export default PostPage

export const query = graphql`
    query($id: String!) {
        wordpressPost(id: { eq: $id }) {
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
