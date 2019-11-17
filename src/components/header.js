import { Link } from "gatsby"
import React from "react"
import logoSVG from "../images/logo-radio404-black-and-white.svg"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import Player from "./player";

const Header = () => {

  const siteMetadata = useSiteMetadata();

  return (<header className={'site-header'}>
      <div>
        <h1 className={'site-header__logo'}>
          <Link to="/">
            <img src={logoSVG} alt={siteMetadata.title}/>
            <span>{`radio404`}</span>
          </Link>
        </h1>
        <Player {...siteMetadata} />
      </div>
    </header>
  )
}

export default Header
