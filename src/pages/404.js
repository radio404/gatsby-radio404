import React from "react"

import SEO from "../components/seo"
import TemplateDefault from "../components/page-templates/template-default";
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const NotFoundPage = () => {
  const siteMetadata = useSiteMetadata();
  return (
    <>
      <SEO title="404: Not found" />
      <TemplateDefault title={`It's a true 404,`} subtitle={`Welcome on the not found page`}>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <nav>
          <ul>
            {siteMetadata.pages.map((page,k)=>(<li key={k}><Link to={page.node.path}>{page.node.path}</Link>{` `}</li>))}
          </ul>
        </nav>

      </TemplateDefault>
    </>
  )
}

export default NotFoundPage
