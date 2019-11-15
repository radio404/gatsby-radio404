// .env
require('dotenv').config();
const env = process.env;

module.exports = {
  siteMetadata: {
    title: `radio404`,
    description: `radio404 found!`,
    author: `Arthur Violy`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/images/radio404-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // your WordPress source
        baseUrl: env.WP_APP_BASE_URL,
        protocol: env.WP_APP_PROTOCOL,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: false,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: true,
        // JWT access
        auth:{
          jwt_user: env.WP_APP_USER,
          jwt_pass: env.WP_APP_PASSWORD,
          jwt_base_path: "/jwt-auth/v1/token"
        },
        excludedRoutes:[
          '**/themes'
        ]
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
