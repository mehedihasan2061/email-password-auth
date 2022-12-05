import React from 'react';
import { Form } from 'react-bootstrap';
import {getAuth} from "firebase/auth"
import app from '../firebase/firebase.init';


const auth = getAuth(app)


const handleSubmit = (event) => {
    event.preventDefault();
  //  console.log(event);
};
 
const handleEmailChange = event => {
    // console.log(event.target.value)
}

const handlePasswordChange = event => {
    // console.log(event.target.value)
}

const RegisterEmail = () => {
    return (
      <div className="m-auto">
        <Form onSubmit={handleSubmit}>
          <input onChange={handleEmailChange} type="email" name="email" id="" placeholder="enter email" />
          <br />
          <input onChange={handlePasswordChange} type="password" name="password" id="" placeholder="enter password" />
          <br />
          <button type="submit">Register</button>
        </Form>
      </div>
    );
};

export default RegisterEmail;