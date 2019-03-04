import {useState, useCallback} from 'react';

function useForm(shape, onSubmit, onChange = (e) => {}) {
    const fieldNames = Object.keys(shape.fields);
    const initialState = fieldNames.reduce((obj, it) => { 
        const value = shape.fields[it].default();
        obj[it] = value ? value : "";
        return obj;
     }, {});
    const [state, setState] = useState(initialState)
    const [errors, setErrors] = useState({})
    const anyErrors = useCallback(() => Object.keys(errors).length > 0, [errors])
  
    let input = {};
    fieldNames.forEach(name => {
      input[name] = {
        'name': name,
        'value': state[name],
        onChange: (e) => {
          setState({
            ...state,
            [name]: e.target.value
          })
          onChange(e)
        },
        onBlur: (e) => {
          shape.fields[name].validate(e.target.value)
          .then(e => {
            const newErrors = {...errors};
            delete newErrors[name]
            setErrors(newErrors)
          })
          .catch(e => {
            setErrors({
              ...errors,
              [name]: e.errors
            })
          })
        }
      }
    });


    return {
      input: input,
      errors: errors,
      anyErrors: anyErrors(),
      handleSubmit: (e) => {
        e.preventDefault();
        shape.validate(state, {abortEarly: false})
        .then(e => {
          setErrors({})
          onSubmit(state, setErrors);
        })
        .catch(e => {
          const errors = e.inner.reduce((obj, current) => {
            obj[current.path] = current.errors;
            return obj;
          }, {})
          setErrors(errors)
        })
      }
    }
  }

  function ifTrueAppend(bool, className) {
    return (bool ? ' ' + className : '');
  }  

  export { useForm , ifTrueAppend }