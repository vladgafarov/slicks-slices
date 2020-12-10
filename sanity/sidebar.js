import { MdHome as icon } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'

const Sidebar = () => {
   return S.list()
      .title(`Slick's slices`)
      .items([
         S.listItem()
            .title('Homepage')
            .icon(icon)
            .child(
               S.editor().schemaType('storeSettings').documentId('downtown')
            ),
         ...S.documentTypeListItems().filter(
            item => item.getId() !== 'storeSettings'
         ),
      ])
}

export default Sidebar
