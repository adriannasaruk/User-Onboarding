import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";





  const User = ({ values, errors, status }) => {
    
    const [user, setUser] = useState([]);
  
    
    useEffect(() => {
      console.log("status has changed!", status);
     
      status && setUser(user => [...user, status]);
    }, [status]);

  return (
  
          
        <div>
          <Form action="https://reqres.in/api/users" method= "POST">
            <div>
              <p>Name: </p>
            <Field name = "name" placeholder = "name" />
            <ErrorMessage name= "name" component= "div"/>
            </div>
          <br></br>
          <div>
            <p>Email:</p>
            <Field name = "email" placeholder = "email"/>
            <ErrorMessage name= "email" component= "div"/>
          <br></br>
          </div>
          <div>
            <p>Password:</p>
            <Field name = "password" placeholder = "password" />
            <ErrorMessage name= "password" component= "div"/>
          <br></br>
          </div>
          <div>
            <p>Check Box</p>
            <input type = "checkbox" />
          <br></br>
          </div>
            <input type="submit"/>
            
          </Form>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            {user.map(user => {
          return (
            <ul key={user.name}>
              <li>name: {user.name}</li>
              <li>email: {user.email}</li>
              <li>password: {user.password}</li>
            </ul>
          );
        })}
    </div>   
    )
  };

const FormikMyForm = withFormik({
  
  mapPropsToValues(props) {
   
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup 
    .string()
    .required("You need a name")
    .min(1),
    email: Yup 
    .string()
    .email()
    .required("You need an email"),
    password: Yup 
    .string()
    .required("You need a password")
    .min(6),
  
    terms: Yup.bool().oneOf([true], 'Must agree with Terms of Service'),
  }),

  handleSubmit: (values, { setStatus, resetForm }) => {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        
        setStatus(res.data);

        
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
  
})(User)
export default FormikMyForm;
