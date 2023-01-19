import React, { useState, useContext } from 'react';
import ResponseModal from '../modal/responseModal';
import { useFormik, Formik, Field, Form, ErrorMessage } from 'formik';
import { GlobalContext } from './../../context/context';
import * as yup from 'yup';
import axios from 'axios';
import './login.css';

export default function Login() {
    const { state, dispatch } = useContext(GlobalContext);
    const [SignupForm, setSignupForm] = useState(false);
    const [responseModal, setresponseModal] =
        useState({
            responseState: false,
            responseStatus: "",
            responseMessage: ""
        });
    if (responseModal.responseState) {
        setTimeout(() => {
            setresponseModal({
                responseState: false,
                responseStatus: "",
                responseMessage: ""
            });
        }, 1500)
    }

    const toggleForm = () => {
        setSignupForm(!SignupForm)
    }

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
                    .required('Password is required')
                    .min(8, "please enter more then 8 characters ")
                    .max(25, "please enter within 25 characters "),
            }),
        onSubmit: (values, { resetForm }) => {
            // axios.get(`https://syedmomin-server.cyclic.app/user/${values.email}`)
            axios.get(`${state.baseUrl}/user/emailExist/${values.email}`)
                .then(res => {
                    console.log(res.data.exists)
                    if (res.data.exists) {
                        setresponseModal({
                            responseState: true,
                            responseStatus: "danger",
                            responseMessage: `this email already exists`
                        })
                        // console.log(`User with email ${values.email} exists`);
                    } else {
                        axios.post(`${state.baseUrl}/user/create`, {
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
                            })
                            .catch(err => {
                                setresponseModal({
                                    responseState: true,
                                    responseStatus: "danger",
                                    responseMessage: err.response.data
                                })
                                console.log("error: ", err);
                            })
                        console.log(`User with email ${values.email} does not exist`);
                    }
                });
        },
    });

    return (
        <>
            <div className="loginPage">
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                {!SignupForm &&
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={yup.object().shape({
                            email: yup.string().email().required('Email is required'),
                            password: yup.string().required('Password is required'),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            axios.post(`${state.baseUrl}/user/login`, {
                                email: values.email,
                                password: values.password
                            })
                                .then(response => {
                                    dispatch({
                                        type: 'USER_LOGIN',
                                        payload: response.data.profile
                                    })
                                    console.log(response.data)
                                    setresponseModal({
                                        responseState: true,
                                        responseStatus: "success",
                                        responseMessage: response.data.message
                                    })
                                    resetForm();
                                })
                                .catch(err => {
                                    setresponseModal({
                                        responseState: true,
                                        responseStatus: "danger",
                                        responseMessage: err.response.data.message
                                    })
                                    console.log("sdsds", err.response.data.message)
                                })
                            setSubmitting(false);
                            // Send a request to your API with the form values
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <h3>Login - DanySAM</h3>
                                <label htmlFor="username">Username:</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                                <ErrorMessage name="email" className='text-danger' component="div" />

                                <label htmlFor="password">Password:</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="password" />
                                <ErrorMessage name="password" className='text-danger' component="div" />

                                <button type="submit" disabled={isSubmitting}>
                                    Login
                                </button>
                                <p onClick={toggleForm}>Create new account?</p>
                            </Form>
                        )}
                    </Formik>

                }
                {SignupForm &&
                    <form onSubmit={registerForm.handleSubmit}>
                        <h3>Registration - DanySAM</h3>

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
            </div>
        </>
    );
}

