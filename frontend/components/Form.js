import React, { useEffect, useState } from 'react'


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.


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

  const areRequiredFieldsFilled = () => {
      return formValues.fullName && formValues.size;
    }

  const handleInputChange = evt => {

    const { id, value } = evt.target;
      setFormValues({
        ...formValues,
        [id]: value,
      });

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
      <input disabled={!areRequiredFieldsFilled()} type="submit" />
    </form>
  )
}
