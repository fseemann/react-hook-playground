import React from 'react'
import { useForm, ifTrueAppend } from './forms'
import './App.css'
import '../node_modules/semantic-ui-css/semantic.min.css'
import * as yup from 'yup'

export default function App() {
  const shape = yup.object().shape({
    name: yup.string().email('Name must be a valid email.').required('Name is required.').default('test@test.de'),
    password: yup.string().required('Password is required')
  });

  const onSubmit = (state, setErrors) => { 
    console.log('submit', state); 
    setErrors({
      'password': 'Invalid password.'
    })
  }
  const {input, errors, anyErrors, handleSubmit} = useForm(shape, onSubmit)
  return (
    <form className={'ui large form' + ifTrueAppend(anyErrors, 'error')} onSubmit={handleSubmit}>
      <div className={'field' + ifTrueAppend(errors.name, 'error')}>
        <div className="ui input">
        < input {...input.name} placeholder="Username"></input>
        </div>
      </div>
      <div className={'field' + ifTrueAppend(errors.password, 'error')}>
        <div className="ui input">
          <input {...input.password} type="password" placeholder="Password"></input>
        </div>
      </div>
      <button className="ui fluid primary button">Login</button>
      <div className="ui error message">
        <ul className="list">
          {Object.keys(errors).flatMap(it => errors[it]).map(it => <li key={it}>{it}</li>)}
        </ul>
      </div>
    </form>
  )
}