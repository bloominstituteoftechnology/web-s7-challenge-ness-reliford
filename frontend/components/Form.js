import React, { useState } from 'react'
import * as Yup from 'yup'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

const initialErrors = { fullName: '', size: ''};

// 👇 Here you will create your schema.
const formSchema = Yup.object().shape({
    
  fullName: Yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required('Full Name is Required'),

  size: Yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required('Size is required'),
})

const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

const checkboxes = toppings.map((topping) => {
  return (
    <label key={topping.topping_id}>
      <input name={topping.text} type="checkbox" />
      {topping.text}
      <br />
    </label>
  );
});



export default function Form() {

  const [formValues, setFormValues] = useState({
        fullName: '',
        size: '',
        toppings: []
      })

  const [errors, setErrors] = useState(initialErrors)
  const [enabled, setEnabled] = useState(false)
  const [success, setsuccess] = useState('')
  const [failure, setFailure] = useState('')

//useEffect() to handle submit enabled

  const handleInputChange = evt => {

    const { id, value } = evt.target;
      setFormValues({
        ...formValues,
        [id]: value,
      });

      // Yup 
      //   .reach(formSchema, id)
      //   .validate(value)
      //   .then(() => {setErrors({...errors, [id]: ''})})
      //   .catch((error)=>{setErrors({...errors, [id]: error.errors[0]})})
    }

  const handleToppingChange = evt => {
      const { checked, id } = evt.target;
      const updatedToppings = checked ? [...formValues.toppings, id] :
      formValues.toppings.filter((topping) => topping !== id)
      setFormValues({...formValues, toppings: updatedToppings})
    }

  const onSubmit = evt => {
    evt.preventDefault();
    }


  return (
    <form onSubmit={onSubmit}>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input  value={formValues.fullName} onChange={handleInputChange} placeholder="Type full name" id="fullName" type="text" />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select value={formValues.size} onChange={handleInputChange} id="size">
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div value={formValues.toppings} onChange={handleToppingChange} className="input-group">
       { checkboxes }
        
      </div>
      <input  type="submit" />
    </form>
  )
}
