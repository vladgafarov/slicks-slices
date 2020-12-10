import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
   siteMetadata: {
      title: 'Very cool title',
      siteUrl: 'localhost:8000',
      description: 'Yeeeeah',
      twitter: '@some',
   },
   plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-styled-components',
      {
         resolve: 'gatsby-source-sanity',
         options: {
            projectId: '3xcda0xx',
            dataset: 'production',
            watchMode: true,
            token: process.env.SANITY_TOKEN,
         },
      },
   ],
}
