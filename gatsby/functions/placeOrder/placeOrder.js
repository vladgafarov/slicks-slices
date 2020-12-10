const nodemailer = require('nodemailer')

const generateOrderEmail = ({ order, total }) => {
   return `<div>
      <h2>Your last order is for ${total}</h2>
      <ul>
         ${order
            .map(
               item => `<li>
            <img src="${item.thumbnail}" alt="${item.name}" />
            ${item.size} ${item.name} - ${item.price}
         </li>`
            )
            .join('')}
      </ul>
   </div>`
}

const transporter = nodemailer.createTransport({
   host: process.env.MAIL_HOST,
   port: 587,
   auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
   },
})

exports.handler = async (event, context) => {
   const body = JSON.parse(event.body)
   const requiredFields = ['name', 'email', 'order']

   if (body.maple) {
      return {
         statusCode: 400,
         body: JSON.stringify({ message: 'Ohoho' }),
      }
   }

   for (const field of requiredFields) {
      if (!body[field]) {
         return {
            statusCode: 400,
            body: JSON.stringify({
               message: `You missed ${field}`,
            }),
         }
      }
   }

   if (!body.order.length) {
      return {
         statusCode: 400,
         body: JSON.stringify({
            message: `NOthing ordered`,
         }),
      }
   }

   const info = await transporter.sendMail({
      from: "Slick's slices",
      to: `${body.name} <${body.email}>, order@example.com`,
      subject: 'New order',
      html: generateOrderEmail({ order: body.order, total: body.total }),
   })

   return {
      statusCode: 200,
      body: JSON.stringify({ message: 'success' }),
   }
}
