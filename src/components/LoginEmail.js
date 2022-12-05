import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';


const auth=getAuth(app)

const LoginEmail = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail,setUserEmail]=useState('')
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        
        const email = form.email.value;
        const password = form.password.value;
        console.log( email,password)
        setSuccess(false);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setSuccess(true);
                verifyEmail();
                form.reset('')
                
            })
            .catch(error => {
            console.error('error',error)
        })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
            alert('please check your email!!')
        })
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email)
    }

    const forgetPassword = () => {

        if (!userEmail) {
            alert("please enter your email")
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
            alert('your password reset.please check your email')
            })
            .catch(error => {
            console.error(error)
        })
    }
   

    return (
      <div className="w-50 mx-auto">
        <h2 className="text-primary">Please LogIn</h2>
        <form onSubmit={handleLogin}>
          
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Example label
            </label>
            <input onBlur={handleEmailBlur}
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              name="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Another label
            </label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              name="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Login"
          ></input>
          {success && <p className="text-success">Successfully Login</p>}
          <p>
            <small>
              Do You want to join.please <Link to="/register">Register</Link>
            </small>
          </p>
          <p>
            <small>
              Forget Password?{" "}
              <button onClick={forgetPassword} type="button" className="btn btn-link">
                Forgotten Password
              </button>
            </small>
          </p>
        </form>
      </div>
    );
};

export default LoginEmail;