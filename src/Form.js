import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { withFormik, Form, Field } from 'formik';

const UserForm = (values, errors, touched, status) => {
const [users, setUsers] = useState([]);

  // useEffect (() => {
  //   status && setUsers(users => [...users, status]);
  //   }, [users]);

  return(
    <div className='form'>
      <Form>
        <Field type='text' name='name' placeholder='name' />
        {/* {touched.name && errors.name && 
        (<p className='errors'>{errors.name}</p>)} */}

        <Field type='text' name='email' placeholder='email' />
        {/* {touched.email && errors.email && 
        (<p className='errors'>{errors.email}</p>)} */}

        <Field type='text' name='password' placeholder='password' />
        {/* {touched.password && errors.password && 
        (<p className='errors'>{errors.password}</p>)} */}

        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />

          <Field />
          <button>Submit</button>
      </Form>

      {/* {users.map(person => (
        <ul key={users.id}>
          <li>Name: {users.name}</li>
          <li>Email: {users.email}</li>
        </ul>
      ))} */}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({name, email, password, terms}) {
    return{
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    email:yup.string().required(),
    password: yup.string().required(),
    terms: yup.mixed().required()
  }),
  handleSubmit(values, { setUsers }) {
    axios
    .post("https://reqres.in/api/users/", values)
    .then(response => {
      setUsers(response.data);
      console.log(response);
    })
    .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;