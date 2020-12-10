import { MdPeople as icon } from "react-icons/md"

export default {
   name: "person",
   title: "Slicemasters",
   type: "document",
   icon,
   fields: [
      {
         name: "name",
         title: "Name",
         type: "string",
      },
      {
         name: "slug",
         title: "Slug",
         type: "slug",
         options: {
            source: "name",
            maxLength: 100,
         },
      },
      {
         name: "description",
         title: "Description",
         type: "text",
         description: "Tell us a bit about this person",
      },
      {
         name: "image",
         title: "Image",
         type: "image",
         options: {
            hotspot: true,
         },
      },
   ],
   preview: {
      select: {
         title: "name",
         media: "image",
         topping0: "toppings.0.name",
         topping1: "toppings.1.name",
         topping2: "toppings.2.name",
         topping3: "toppings.3.name",
      },
      prepare: ({ title, media, ...toppings }) => {
         const tops = Object.values(toppings).filter(Boolean)
         console.log(toppings)

         return {
            title,
            media,
            subtitle: tops.join(", "),
         }
      },
   },
}
