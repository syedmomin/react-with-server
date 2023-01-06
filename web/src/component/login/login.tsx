import React, { useEffect, useState } from 'react';
import ResponseModal from '../modal/responseModal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './login.css';

function Login() {
    const [SignupForm, setSignupForm] = useState(false);
    const [responseModal, setresponseModal] =
        useState({
            responseState: false,
            responseStatus: "",
            responseMessage: ""
        });

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
                    .min(4, "please enter more then 3 characters ")
                    .max(25, "please enter within 25 characters "),

                email: yup
                    .string()
                    .email()
                    .required('Email is required'),

                number: yup
                    .number()
                    .positive("A phone number can't start with a minus")
                    .required('Number is required')
                    .min(10),

                password: yup
                    .string()
                    .required('Password is srequired')
                    .min(8, "please enter more then 8 characters ")
                    .max(25, "please enter within 25 characters "),
            }),
        onSubmit: (values, { resetForm }) => {
            // axios.post(`https://syedmomin-server.cyclic.app/registration`, {
            axios.post(`http://localhost:5001/registration`, {
                userName: values.userName,
                email: values.email,
                number: values.number,
                password: values.password
            })
                .then(response => {
                    setresponseModal({
                        responseState: true,
                        responseStatus: "success",
                        responseMessage: response.data.message
                    })
                    resetForm({})
                    setSignupForm(!SignupForm)
                    setTimeout(() =>
                        setresponseModal({
                        responseState: false,
                        responseStatus: "",
                        responseMessage: ""
                    }),2000)
                    // console.log("response: ", response.data);
                })
                .catch(err => {
                    setresponseModal({
                        responseState: true,
                        responseStatus: "danger",
                        responseMessage: err
                    })
                    console.log("error: ", err);
                })
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
                    {
                        (registerForm.touched.userName && Boolean(registerForm.errors.userName)) ?
                            <span style={{ color: "red" }}>{registerForm.errors.userName}</span>
                            :
                            null
                    }
                    <label>Email :</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={registerForm.values.email}
                        onChange={registerForm.handleChange}
                    />
                    {
                        (registerForm.touched.email && Boolean(registerForm.errors.email)) ?
                            <span style={{ color: "red" }}>{registerForm.errors.email}</span>
                            :
                            null
                    }
                    <label>Phone :</label>
                    <input
                        type="text"
                        placeholder="Phone"
                        id="number"
                        value={registerForm.values.number}
                        onChange={registerForm.handleChange}
                    />
                    {
                        (registerForm.touched.number && Boolean(registerForm.errors.number)) ?
                            <span style={{ color: "red" }}>{registerForm.errors.number}</span>
                            :
                            null
                    }
                    <label>Password :</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={registerForm.values.password}
                        onChange={registerForm.handleChange}
                    />
                    {
                        (registerForm.touched.password && Boolean(registerForm.errors.password)) ?
                            <span style={{ color: "red" }}>{registerForm.errors.password}</span>
                            :
                            null
                    }
                    <button type="submit">Sgin Up</button>
                    <p onClick={toggleForm}>Already have an account? Sign in instead</p>
                </form>
            }
            {responseModal.responseState &&
                < ResponseModal modalState={responseModal.responseState} status={responseModal.responseStatus} response={responseModal.responseMessage} />
            }

        </>
    );
}

export default Login;
