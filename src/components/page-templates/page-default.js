import React from "react"

const PageDefault = ({page}) => (
  <div className={`wp-content`} dangerouslySetInnerHTML={{ __html:page.content }} />
)


export default PageDefault
