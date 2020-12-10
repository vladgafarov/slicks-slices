import React from 'react'
import Layout from './src/components/Layout'
import 'normalize.css'
import { OrderProvider } from './src/components/OrderContext'

export const wrapPageElement = ({ element, props }) => {
   return <Layout {...props}>{element}</Layout>
}

export const wrapRootElement = ({ element }) => {
   return <OrderProvider>{element}</OrderProvider>
}
