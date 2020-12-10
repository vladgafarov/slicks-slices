import { useContext, useState } from 'react'
import { OrderContext } from '../components/OrderContext'
import attachNamesAndPrices from './attachNamesAndPrices'
import calculateOrderTotal from './calculateTotalOrder'
import formatMoney from './formatMoney'

const usePizza = ({ pizzas, values }) => {
   const [order, setOrder] = useContext(OrderContext)
   const [error, setError] = useState()
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState('')

   const addToOrder = orderedPizza => {
      setOrder([...order, orderedPizza])
   }

   const removeFromOrder = index => {
      setOrder([...order.slice(0, index), ...order.slice(index + 1)])
   }

   const sumbitOrder = async e => {
      e.preventDefault()

      setLoading(true)
      setError(null)
      // setMessage('Go eat!')

      const body = {
         order: attachNamesAndPrices(order, pizzas),
         total: formatMoney(calculateOrderTotal(order, pizzas)),
         name: values.name,
         email: values.email,
         maple: values.maple,
      }

      const res = await fetch(
         `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
         }
      )

      const text = JSON.parse(await res.text())

      if (res.status >= 400 && res.status < 600) {
         setLoading(false)
         setError(text.message)
      } else {
         setLoading(false)
         setMessage('Success')
      }
   }

   return {
      order,
      addToOrder,
      removeFromOrder,
      error,
      loading,
      message,
      sumbitOrder,
   }
}

export default usePizza
