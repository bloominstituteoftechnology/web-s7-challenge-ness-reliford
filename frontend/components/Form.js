import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios';


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

const initialErrors = { fullName: '', size: ''};

const initialValues = {
  fullName: '',
  size: '',
  toppings: []
}

// 👇 Here you will create your schema.
const formSchema = Yup.object().shape({
    
  fullName: Yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required('Full Name is Required'),

  size: Yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required('Size is required'),
  
  toppings: Yup
    .array()
    .of(Yup.string())
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
      <input name={topping.topping_id} type="checkbox" />
      {topping.text}
      <br />
    </label>
  );
});



export default function Form() {

  //STATES
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [enabled, setEnabled] = useState(false)
  const [success, setSuccess] = useState('')
  const [failure, setFailure] = useState('')


  //USE EFFECT - ENABLE SUBMIT BUTTON
  useEffect(() => {
    formSchema.isValid(formValues).then(isValid => {
      setEnabled(isValid)
    })
  }, [formValues])


  const handleInputChange = evt => {

    let { id, value } = evt.target;
      setFormValues({
        ...formValues,
        [id]: value,
      });

      Yup 
        .reach(formSchema, id)
        .validate(value)
        .then(() => { setErrors({...errors, [id]: ''}) })
        .catch((error) => { setErrors({...errors, [id]: error.errors[0]}) })
    }

  const handleToppingChange = (event) => {
    const { checked, name } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      toppings: checked
        ? [...prevValues.toppings, name]
        : prevValues.toppings.filter((topping) => topping !== name),
    }));
    };


   // FORM SUBMISSION 
  const onSubmit = evt => {
      evt.preventDefault();
      axios.post("http://localhost:9009/api/order", formValues)
      .then(res => {
        setSuccess(res.data.message)
        setFailure('')
      })
      .catch(res => {
        setSuccess('')
        setFailure(res.response.data.message)
      })
      setFormValues(initialValues)
    }


  return (
    <form onSubmit={onSubmit}>
      <h2>Order Your Pizza</h2>
      {success && <div className='success'>{success}</div>}
      {failure && <div className='failure'>{failure}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input  value={formValues.fullName} 
                  onChange={handleInputChange} 
                  placeholder="Type full name" 
                  id="fullName" 
                  type="text" />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
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
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div value={formValues.toppings} onChange={handleToppingChange} className="input-group">
       { checkboxes }
        
      </div>
      <input disabled={!enabled} type="submit" />
    </form>
  )
}
