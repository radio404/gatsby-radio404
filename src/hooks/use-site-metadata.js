import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { site, allWordpressSiteMetadata, allWordpressAcfOptions } = useStaticQuery(
    graphql`
        query SiteMetaData {
            site {
                siteMetadata {
                    title
                }
            }
            allWordpressSiteMetadata {
                edges {
                    node {
                        name
                        description
                    }
                }
            }
            allWordpressAcfOptions {
                edges {
                    node {
                        options {
                            radioking_api_endpoint
                            radioking_radio_id
                            radioking_stream_default_id
                            radioking_stream_hd_id
                            radioking_stream_mobile_id
                        }
                    }
                }
            }
        }
    `
  )
  // merge multiple settings & options source in an unique object
  const meta = Object.assign(
    site.siteMetadata,
    allWordpressAcfOptions.edges[0].node.options,
    allWordpressSiteMetadata.edges[0].node
  )
  return meta
}