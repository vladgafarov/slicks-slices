import React, { useState } from 'react'

export const OrderContext = React.createContext()

export const OrderProvider = ({ children }) => {
   const [order, setOrder] = useState([])
   return (
      <OrderContext.Provider value={[order, setOrder]}>
         {children}
      </OrderContext.Provider>
   )
}
