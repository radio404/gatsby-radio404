import { graphql, StaticQuery } from "gatsby"
import React from "react"
import LinkAuto from "./link-auto";

const MenuPrimary = () => {
  return (<nav className={`menu-primary`}>
    <ul>
      <StaticQuery query={graphql`
      query PrimaryMenuQuery {
        allWordpressMenusMenusItems(filter: {slug: {eq: "menu-principal"}}) {
          nodes {
            id
            slug
            items {
              slug
              title
              object
              object_id
              url
            }
          }
        }
      }
    `}
     render={data=>{
       return (data.allWordpressMenusMenusItems.nodes[0].items.map((menuItem,i)=>{
         return <li key={i}><LinkAuto className={`nav-menu--${menuItem.object}`} to={menuItem.url} {...menuItem}>{menuItem.title}</LinkAuto></li>
       }))
     }}
      />
     </ul>
    </nav>
  )
}

export default MenuPrimary
