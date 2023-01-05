import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './login.css';

function Login() {

    const [SignupForm, setSignupForm] = useState(false);
    const toggleForm = () => {
        setSignupForm(!SignupForm)
    }

    // const autoFun = async () => {
    //     await axios.post(`http://localhost:5001/registration`, {
    //         userName: "momin",
    //         email: "syedmomin168",
    //         number: "0123030",
    //         password: "developer"
    //     })
    //         .then(response => {
    //             console.log("response: ", response.data);
    //         })
    //         .catch(err => {
    //             console.log("error: ", err);
    //         })
    // };
  
    const registerForm = useFormik({
        initialValues: {
            userName: '',
            email: '',
            number: '',
            password: '',
        },
        validationSchema: 
        yup.object({
            userName: yup
                .string()
                .required('User name is required')
                .min(3, "please enter more then 3 characters ")
                .max(15, "please enter within 15 characters "),
    
            email: yup
                .string()
                .required('Email is required'),
    
            number: yup
                .number()
                .required('Number is required')
                .min(3, "please enter more then 3 characters ")
                .max(11, "please enter within 11 characters "),
    
            password: yup
                .string()
                .required('Password is srequired')
                .min(8, "please enter more then 8 characters ")
                .max(25, "please enter within 25 characters "),
        }),
        onSubmit: (values) => {
            console.log("get vale",values)
        },
    });
    //   useEffect(() => {
    //         // autoFun()
    //     }, []);

    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            {!SignupForm &&
                <form>
                    <h3>Login DanySAM</h3>

                    <label>Username :</label>
                    <input type="text" placeholder="Email" />

                    <label>Password :</label>
                    <input type="password" placeholder="Password" />

                    <button>Log In</button>
                    <p onClick={toggleForm}>Create new account?</p>
                </form>
            }
            {SignupForm &&
                <form onSubmit={registerForm.handleSubmit}>
                    <h3>Registration DanySAM</h3>

                    <label>Username :</label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        id="userName"
                        value={registerForm.values.userName}
                        onChange={registerForm.handleChange}
                    />
                    <label>Email :</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={registerForm.values.email}
                        onChange={registerForm.handleChange}
                    />
                    <label>Phone :</label>
                    <input
                        type="number"
                        placeholder="Phone"
                        id="number"
                        value={registerForm.values.number}
                        onChange={registerForm.handleChange}
                    />
                    <label>Password :</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={registerForm.values.password}
                        onChange={registerForm.handleChange}
                    />
                    <button type="submit">Sgin Up</button>
                    <p onClick={toggleForm}>Back to login?</p>
                </form>
            }
        </>
    );
}

export default Login;
