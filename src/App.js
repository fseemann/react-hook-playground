import React from 'react'
import { useForm, ifTrueAppend } from './forms'
import {Formik, Form, Field} from 'formik'
import './App.css'
import '../node_modules/semantic-ui-css/semantic.min.css'
import * as yup from 'yup'

function NativeForm() {
  const shape = formSchema();

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
      <SemanticErrorList errors={errors}/>
    </form>
  )
}

function FormikForm() {
  const onSubmit = (values, actions) => {
    console.log('submit', values);
    actions.setErrors({
      'password': 'Invalid password.'
    })
  }

  return <Formik
    initialValues={{
      name: '',
      password: ''
    }}
    onSubmit={onSubmit}
    validationSchema={formSchema()}
  >
    {({ errors }) => (
      <Form className={'ui large form' + ifTrueAppend(Object.keys(errors).length > 0, 'error')}>
        <Field name="name" placeholder="Username" component={SemanticField} />
        <Field name="password" type="password" placeholder="Password" component={SemanticField} />
        <button type="submit" className="ui fluid primary button">Login</button>
        <SemanticErrorList errors={errors} />
      </Form>
    )}
  </Formik>
}

function SemanticField({field, form: {errors}, ...props}) {
  return (
  <div className={'field' + ifTrueAppend(errors[field.name], 'error')}>
    <div className="ui input">
      <input {...field} {...props} ></input>
    </div>
  </div>
  )
}

const SemanticErrorList = (props) => (
  <div className="ui error message">
    <ul className="list">
      {Object.keys(props.errors).flatMap(it => props.errors[it]).map((it, index) => <li key={index}>{it}</li>)}
    </ul>
  </div>
)

function formSchema() {
  return yup.object().shape({
      name: yup.string().email('Name must be a valid email.').required('Name is required.'),
      password: yup.string().required('Password is required')
    });
  }
  
export { NativeForm, FormikForm }