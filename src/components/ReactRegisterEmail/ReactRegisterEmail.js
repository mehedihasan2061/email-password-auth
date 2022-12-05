import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';

const auth=getAuth(app)

const ReactRegisterEmail = () => {
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
    const handleSubmit = (event) => {
      event.preventDefault();
      setSuccess(false)
      const form = event.target;
      const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,email, password)

      if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
        setPasswordError('please provide at least two capital letter')
        return;
      }
      if (password.length < 6) {
        setPasswordError('please provide at least 6 character')
        return;
      }
      if (!/(?=.*[!@#$&*])/.test(password)) {
        setPasswordError("please provide at least special character");
        return;
      }

      setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            setSuccess(true);
            form.reset('');
            updateUserProfile(name)
          })
          .catch((error) => {
            setPasswordError(error.message);
            console.error("error", error);
          });
  }
  
  const updateUserProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName:name
    })
      .then(() => {
      console.log('profile updated')
      })
      .catch(error => {
      console.error(error)
    })
   }

    return (
      <div className="w-50 mx-auto">
        <h2 className="text-primary">Please Register!!!</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Enter Your name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <p className="text-danger">{passwordError}</p>
          {success && <p className="text-success">User successfully</p>}

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <p>
            <small>
             Already have an account.Please <Link to="/login">Login</Link>
            </small>
          </p>
        </Form>
      </div>
    );
};

export default ReactRegisterEmail;