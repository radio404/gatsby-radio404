import React from "react"

import Layout from "../components/layout"
import TemplateDefault from "../components/page-templates/template-default";
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TemplateDefault title={`Hi people,`} subtitle={`Welcome on radio404`}>
      <p>Welcome to our new site.</p>
      <p>Now we are going to build something great.</p>
    </TemplateDefault>
  </Layout>
)

export default IndexPage
