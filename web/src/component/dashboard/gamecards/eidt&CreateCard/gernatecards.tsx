import { Card, Form } from "react-bootstrap"


function GernateCard() {

    return (
        <>
            <Form>
                <Form.Group className="mb-2" controlId="formGroupEmail">
                    <Form.Label>Game Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Game Name" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupPassword">
                    <Form.Label>Game Description</Form.Label>
                    <Form.Control type="text" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupPassword">
                    <Form.Label>Game Image</Form.Label>
                    <Form.Control type="text" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupPassword">
                    <Form.Label>Game link</Form.Label>
                    <Form.Control type="text" placeholder="Password" />
                </Form.Group>
            </Form>
        </>
    )
}

export default GernateCard