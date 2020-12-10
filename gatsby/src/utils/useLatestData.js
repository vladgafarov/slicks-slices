import { useEffect, useState } from 'react'

const gql = String.raw

const deets = `
   name
   _id
   image {
      asset {
         url
         metadata {
            lqip
         }
      }
   }
`

const useLatestData = () => {
   const [hotSlices, setHotSlices] = useState()
   const [slicemasters, setSlicemasters] = useState()

   useEffect(() => {
      fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify({
            query: gql`
               query {
                  StoreSettings(id: "downtown") {
                     name
                     slicemasters {
                        ${deets}
                     }
                     hotSlices {
                        ${deets}
                     }
                  }
               }
            `,
         }),
      })
         .then(res => res.json())
         .then(res => {
            setHotSlices(res.data.StoreSettings.hotSlices)
            setSlicemasters(res.data.StoreSettings.slicemasters)
         })
   }, [])

   return {
      hotSlices,
      slicemasters,
   }
}

export default useLatestData
