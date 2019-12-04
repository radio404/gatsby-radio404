/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "../fonts/Inter/inter.css"
import "../fonts/radio404/style.css"
import "../scss/layout.scss"

const Layout = ({ children }) => {

  return (
    <>
      <div className="site">
        <Header />
        {children}
        <footer>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
