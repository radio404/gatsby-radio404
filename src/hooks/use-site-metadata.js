import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { site, allWordpressSiteMetadata, allWordpressAcfOptions, allSitePage } = useStaticQuery(
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
                        options_radio {
                            radioking_api_endpoint
                            radioking_stream_mobile_id
                            radioking_stream_hd_id
                            radioking_stream_default_id
                            radioking_radio_id
                            radioking_mp3_stream_url
                        }
                    }
                }
            },
            allSitePage {
                edges {
                    node {
                        path
                    }
                }
            }
        }
    `
  )
  // merge multiple settings & options source in an unique object
  const meta = Object.assign(
    site.siteMetadata,
    allWordpressAcfOptions.edges[0].node.options_radio,
    allWordpressSiteMetadata.edges[0].node,
    {
      pages:allSitePage.edges
    }
  )
  return meta
}