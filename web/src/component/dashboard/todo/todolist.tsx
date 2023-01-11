import React, { useState, useRef } from 'react';
import { Card, ListGroup, InputGroup, Form, Button } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

interface Todo {
    id: number;
    text: string;
}

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputRef.current) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: inputRef.current.value,
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
        inputRef.current.value = '';
    };
    return (
        <>
            <div className="d-flex justify-content-center m-3">
                <Card
                    bg="Light"
                    key="Light"
                    text="dark"
                    style={{ width: '25rem' }}
                    className="shadow mb-5 bg-white rounded"
                >
                    <Card.Header>Todo List</Card.Header>
                    <Card.Body>
                        <form onSubmit={handleAddTodo}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    ref={inputRef}
                                    placeholder="Add Your Task..."
                                />
                                <Button variant="primary" type="submit">
                                    <PlusCircle size={20} />
                                </Button>
                            </InputGroup>
                        </form>
                        <ListGroup as="ol" numbered>
                            {todos.map(todo =>
                                <ListGroup.Item as="li" key={todo.id}>{todo.text}</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default TodoList