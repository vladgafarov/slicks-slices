import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import useForm from '../utils/useForm'
import Img from 'gatsby-image'
import { calculatePizzaPrice } from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'
import OrderStyles from '../styles/OrderStyles'
import MenuItemStyles from '../styles/MenuItemStyles'
import usePizza from '../utils/usePizza'
import PizzaOrder from '../components/PizzaOrder'
import calculateOrderTotal from '../utils/calculateTotalOrder'

const OrderPage = ({ data }) => {
   const { values, updateValue } = useForm({
      name: '',
      email: '',
      maple: '',
   })

   const pizzas = data.pizzas.nodes
   const {
      order,
      addToOrder,
      removeFromOrder,
      error,
      loading,
      message,
      sumbitOrder,
   } = usePizza({
      pizzas,
      values,
   })

   if (message) {
      return <p>{message}</p>
   }

   return (
      <>
         <SEO title="Order a Pizza!" />
         <OrderStyles onSubmit={sumbitOrder}>
            <fieldset disabled={loading}>
               <legend>Your Info</legend>
               <label htmlFor="name">Name</label>
               <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={updateValue}
               />
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={updateValue}
               />
               <input
                  type="maple"
                  name="maple"
                  value={values.maple}
                  onChange={updateValue}
                  className="maple"
               />
            </fieldset>
            <fieldset disabled={loading}>
               <legend>Menu</legend>
               {pizzas.map(pizza => (
                  <MenuItemStyles key={pizza.id}>
                     <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
                     <div>
                        <h2>{pizza.name}</h2>
                     </div>
                     <div>
                        {['S', 'M', 'L'].map(size => (
                           <button
                              type="button"
                              key={size}
                              onClick={() =>
                                 addToOrder({
                                    id: pizza.id,
                                    size,
                                 })
                              }
                           >
                              {size}{' '}
                              {formatMoney(
                                 calculatePizzaPrice(pizza.price, size)
                              )}
                           </button>
                        ))}
                     </div>
                  </MenuItemStyles>
               ))}
            </fieldset>
            <fieldset disabled={loading}>
               <legend>Order</legend>
               <PizzaOrder
                  order={order}
                  removeFromOrder={removeFromOrder}
                  pizzas={pizzas}
               />
            </fieldset>
            <fieldset disabled={loading}>
               <h3>
                  Your total is{' '}
                  {formatMoney(calculateOrderTotal(order, pizzas))}
               </h3>
               <div>{error ? <p>Error: {error}</p> : ''}</div>
               <button type="submit" disabled={loading}>
                  {loading ? 'Placing order...' : 'Order Ahead'}
               </button>
            </fieldset>
         </OrderStyles>
      </>
   )
}

export const query = graphql`
   query {
      pizzas: allSanityPizza {
         nodes {
            name
            id
            price
            slug {
               current
            }
            toppings {
               id
               name
            }
            image {
               asset {
                  fluid(maxWidth: 100) {
                     ...GatsbySanityImageFluid
                  }
               }
            }
         }
      }
   }
`

export default OrderPage
