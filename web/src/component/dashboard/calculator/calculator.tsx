
import React, { useState } from 'react';
import { Card, InputGroup, Form, Button } from 'react-bootstrap';
import './calculator.css';

function Calculator() {

    const [result, setresult] = useState("")
    const [chkMessge, setError] = useState("Happy Calculator")

    const btnValues = [
        [1, 2, 3, "+"],
        [4, 5, 6, "-"],
        [7, 8, 9, "*"],
        [0, ".", "%"],
        ["/", "C", "=", "D"],
    ];

    // Main Function 

    const setcalu = (val: any) => {
        console.log("cehck", val.value)
        if (val.value === "=") {
            finalResult();
        } else if (val.value === "C") {
            clearAll();
        } else if (val.value === "D") {
            delte();
        } else {
            setresult(result.concat(val.value))
        }
    }

    // clear all 

    const clearAll = () => {
        setresult("")
    }

    // final result 

    const finalResult = () => {
        try {
            setError("Happy Calculator")
            setresult(eval(result).toString())
        } catch (e) {
            if (e instanceof SyntaxError) {
                setError(e.message);
            }
        }
    }

    // delete digit 

    const delte = () => {
        let str = result.substr(0, result.length - 1);
        setresult(str);
    }
    return (
        <>
            <div className="d-flex justify-content-center m-3">
                <Card
                    bg="Light"
                    key="Light"
                    text="dark"
                    style={{ width: '18rem' }}
                    className="shadow mb-5 bg-white rounded"
                >
                    <Card.Header>{chkMessge}</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <InputGroup size="lg">
                                <InputGroup.Text id="inputGroup-sizing-default">
                                    🎰
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    value={result}
                                />
                            </InputGroup>
                        </Card.Title>
                        <Card.Text>
                            <div className="buttonBox">
                                {
                                    btnValues.flat().map((val, i) => {
                                        return (
                                            <Button
                                                style={{ fontSize: '30px', border: 'none', fontWeight: 'bold', cursor: 'pointer', margin: '2px' }}
                                                variant={val === "C" || val === "D" ? "danger" : "primary"}
                                                key={i}
                                                value={val}
                                                onClick={(e) => setcalu(e.target)}
                                            >{val}</Button>
                                        );
                                    })
                                }
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Calculator