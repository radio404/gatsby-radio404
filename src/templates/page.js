import React from "react"

import { graphql } from 'gatsby';
import TemplateDefault from "../components/page-templates/template-default";
import PageDefault from "../components/page-templates/page-default";
import PagePlaning from "../components/page-templates/page-planning";
import SEO from "../components/seo"

const PostPage = ({data}) => {

    const {wordpressPage} = data,
          {template} = wordpressPage.acf;
    console.log(wordpressPage.acf.template,wordpressPage.content);

return (
  <>
    <SEO title={wordpressPage.title||''} />
    <TemplateDefault title={wordpressPage.title||''} subtitle={wordpressPage.subtitle||''}>
        {
            {
                planning: <PagePlaning page={wordpressPage} />,
                default: <PageDefault page={wordpressPage} />,
            }[template||'default']
        }
    </TemplateDefault>
  </>
)}

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
            acf{
                template
            }
        }
    }
`
