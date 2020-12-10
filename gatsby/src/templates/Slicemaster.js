import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import SEO from '../components/SEO'

const PizzaGrid = styled.div`
   display: grid;
   grid-gap: 2rem;
   grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`

const SlicemasterPage = ({ data: { slicemaster } }) => {
   return (
      <>
         <SEO
            title={slicemaster.name}
            image={slicemaster.image?.asset?.fluid?.src}
         />
         <div className="center">
            <Img fluid={slicemaster.image.asset.fluid} />
            <div>
               <h2 className="mark">{slicemaster.name}</h2>
               <p>{slicemaster.description}</p>
            </div>
         </div>
      </>
   )
}

export const query = graphql`
   query($slug: String!) {
      slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
         name
         image {
            asset {
               fluid(maxWidth: 800, maxHeight: 700) {
                  ...GatsbySanityImageFluid
               }
            }
         }
         description
      }
   }
`
export default SlicemasterPage
