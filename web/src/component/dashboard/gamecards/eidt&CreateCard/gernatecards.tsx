import { Card } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

interface FormValues {
    gameImage: File | null;
}


interface FormValues {
    gameName: string;
    gameDescription: string;
    gameLink: string;
    gameImage: File | null;
}
function GernateCard() {

    return (
        <>
            <Formik
                initialValues={{ gameName: '', gameDescription: '', gameImage: null, gameLink: '' }}
                // validationSchema={yup.object().shape({
                //     email: yup.string().email().required('Email is required'),
                //     password: yup.string().required('Password is required'),
                // })}
                onSubmit={(values:FormValues, { setSubmitting, resetForm }) => {
                    setSubmitting(false);
                    console.log("dffdf", values)
                }}
            >
                {({ setFieldValue }) => (
                    <Card className="shadow mb-5 p-2 bg-white rounded">
                        <Form>
                            <h3>Game Dashbord</h3>
                            <label>Game Name:</label>
                            <Field
                                type="text"
                                name="gameName"
                                className="form-control"
                                placeholder="Enter Game Name"
                            />
                            <ErrorMessage name="gameName" className='text-danger' component="div" />

                            <label>Game Description:</label>
                            <Field
                                as="textarea"
                                name="gameDescription"
                                className="form-control"
                                placeholder="Game Description" />
                            <ErrorMessage name="gameDescription" className='text-danger' component="div" />

                            <label>Game Image:</label>
                            <Field
                                type="file"
                                name="gameImage"
                                className="form-control"
                                accept="image/*"
                                // onChange={(event: any) => {
                                    // console.log("sdsd",event.currentTarget.files![0])
                                    // setFieldValue("gameImage", event.currentTarget.files![0]);
                                // }}
                            />
                            <ErrorMessage name="gameImage" className='text-danger' component="div" />


                            <label>Game Link:</label>
                            <Field
                                type="text"
                                name="gameLink"
                                className="form-control"
                                placeholder="Game Link" />
                            <ErrorMessage name="gameLink" className='text-danger' component="div" />

                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </Form>
                    </Card>
                )}
            </Formik>


            {/*<Form>
                     <Form.Group className="mb-2" controlId="formGroupEmail">
                        <Form.Label>Game Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Game Name" />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupPassword">
                        <Form.Label>Game Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupPassword">
                        <Form.Label>Game Image</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupPassword">
                        <Form.Label>Game link</Form.Label>
                        <Form.Control type="text" placeholder="Password" />
                    </Form.Group>
                </Form> */}

        </>
    )
}

export default GernateCard