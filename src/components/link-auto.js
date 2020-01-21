import React from "react"
import {Link} from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const LinkAuto = (props) => {
  const {children,to} = props;
  const {wp_url} = useSiteMetadata();

  const internalRegExp = new RegExp(`^${wp_url}/`),
        isInternal = internalRegExp.test(to),
        autoTo = isInternal ? to.replace(wp_url+'/','') :to;
  console.log(isInternal,autoTo);
  if(isInternal) {
    return (<Link {...props} to={autoTo} >{children}</Link>)
  } else{
      return (<a {...props} href={autoTo}>{children}</a>)
  }
}

export default LinkAuto
