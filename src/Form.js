import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as yup from 'yup';


const UserForm = ({values, errors, touched, status}) => {
const [users, setUsers] = useState([]);
console.log(values, 'values')

  useEffect (() => {
    status && setUsers(users => [...users, status]);
    }, [status])
    // console.log(users, 'users')

    // if (values.email.string === 'waffle@syrup.com') {
    //    <script> alert(Only pancakes and crepes allowed!)</script>
    // }

  return(
    <div className='form'>
      <Form>
        <Field type='text' name='name' placeholder='name' />
        {touched.name && errors.name && 
        (<p className='errors'>{errors.name}</p>)}

        <Field type='email' name='email' placeholder='email' />
        {touched.email && errors.email && 
        (<p className='errors'>{errors.email}</p>)}

        <Field type='password' name='password' placeholder='password' />
        {touched.password && errors.password && 
        (<p className='errors'>{errors.password}</p>)}

        <Field name='role' as="select" className="role">
        <option> Please Choose Your Role...</option>
        <option value="Oompa Loompa">Oompa Loompa</option>
        <option value="Food Connoiseurd">Food Connoiseur</option>
        <option value="Party Crasher">Party Crasher</option>
        </Field>
        {touched.role && errors.role && 
        (<p className='errors'>{errors.role}</p>)}

        <label className="checkbox-container">
          Terms of Service</label>
        <Field type="checkbox" 
        name="terms" 
        checked={values.terms}/>
        {touched.terms && errors.terms && 
        (<p className='errors'>{errors.terms}</p>)}
        <button type='submit'>Submit</button>
      </Form>

      {users.map(person => (
        <ul key={person.id}>
          <li>Name: {person.name}</li>
          <li>Email: {person.email}</li>
          <li>Role: {person.role}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({name, email, password, role, terms}) {
    return{
      name: name || "",
      email: email || "",
      password: password || "",
      role: role || "",
      terms: terms || false
    };
  },
  
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    email:yup.string().required(),
    password: yup.string().required(),
    role: yup.string().required(),
    terms: yup.boolean().oneOf([true], 'Must accept terms!')
  }),
  
  handleSubmit(values, { setStatus, resetForm }) {
    axios
    .post("https://reqres.in/api/users/", values)
    .then(response => {
      console.log(response.data);
      setStatus(response.data);
      resetForm({ ...values });
    })
    .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;