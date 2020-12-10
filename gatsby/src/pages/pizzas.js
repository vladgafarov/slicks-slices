import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'
import SEO from '../components/SEO'

const PizzasPage = ({ data, pageContext }) => {
   const pizzas = data.pizzas.nodes
   return (
      <>
         <SEO
            title={
               pageContext.topping
                  ? `Pizzas With ${pageContext.topping}`
                  : `All Pizzas`
            }
         />
         <ToppingsFilter />
         <PizzaList pizzas={pizzas} />
      </>
   )
}

export const query = graphql`
   query PizzaQuery($topping: [String]) {
      pizzas: allSanityPizza(
         filter: { toppings: { elemMatch: { name: { in: $topping } } } }
      ) {
         nodes {
            name
            id
            slug {
               current
            }
            toppings {
               id
               name
            }
            image {
               asset {
                  fluid(maxWidth: 400) {
                     ...GatsbySanityImageFluid
                  }
               }
            }
         }
      }
   }
`

export default PizzasPage