import React from "react"

import TemplateDefault from "../components/page-templates/template-default";
import SEO from "../components/seo"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { Link } from "gatsby"

const IndexPage = () => {
  const siteMetadata = useSiteMetadata();
  return (
  <>
    <SEO title="Home" />
    <TemplateDefault title={`Hi people,`} subtitle={`Welcome on radio404`}>
      <p>Welcome to our new site.</p>
      <p>Now we are going to build something great.</p>

      <nav>
        <h3>Whole Site map</h3>
        <ul>
          {siteMetadata.pages.map((page,k)=>(<li key={k}><Link to={page.node.path}>{page.node.path}</Link>{` `}</li>))}
        </ul>
      </nav>
    </TemplateDefault>
  </>
  )
}

export default IndexPage
