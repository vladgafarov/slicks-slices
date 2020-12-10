import React from 'react'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import styles from './styles/priceinput.css'

const createPatchFrom = value => {
   return PatchEvent.from(value === '' ? unset() : set(Number(value)))
}

const formatMoney = Intl.NumberFormat('ru-RU', {
   style: 'currency',
   currency: 'RUB',
}).format

const PriceInput = ({ type, value, onChange, inputComponent }) => {
   return (
      <div>
         <h2>
            {type.title} - {value > 0 ? formatMoney(value) : ''}
            {console.log(styles)}
         </h2>
         <p>{type.description}</p>
         <input
            className={styles.priceinput}
            type={type.name}
            value={value}
            onChange={e => onChange(createPatchFrom(e.target.value))}
            ref={inputComponent}
         />
      </div>
   )
}

PriceInput.focus = function () {
   this._inputElement.focus()
}

export default PriceInput
