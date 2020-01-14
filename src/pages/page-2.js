import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import TemplateDefault from "../components/page-templates/template-default";

const SecondPage = () => (
  <>
    <SEO title="Page two" />
    <TemplateDefault title={`Wow people,`} subtitle={`Welcome on the second page`}>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </TemplateDefault>

  </>
)

export default SecondPage
