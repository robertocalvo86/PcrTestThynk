import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    Button,
    Card,
    CardBody,
    Form,
    Input,
    InputGroup,
    InputGroupText,
    Row,
    Col
}
from 'reactstrap';

import * as Icon from 'react-bootstrap-icons';

import { setNotification } from '../utils';

import { Redirect } from 'react-router-dom';

const Login = props => {

    const __dispatch = useDispatch();

    const [username, setUsername] = useState("");

    const [redirectToHomePage, setRedirectToHomePage] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();

        if (username === "") {
            setNotification(__dispatch, "info", [{code: "0000", description:"Enter Identity Card Number"}]);
            return;
        }

        let randomNumb = Math.ceil(Math.random() * 10);
        let user = { "IdentityCardNumber": username, "color": randomNumb, "userName": username };
        sessionStorage.setItem('user', JSON.stringify(user));

        setRedirectToHomePage(true);
    }

    const onChange = (e) => {
        let value = e.target.value;
        setUsername(value);
    }

    if (redirectToHomePage) {
        return (<Redirect to="/" />);
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", backgroundColor: "#EBEDEF" }}>
            <div style={{ width: "500px", margin: "0 auto" }}>
                <div style={{ padding: "5px 15px 5px 15px" }}>
                    <Card className="p-4">
                        <CardBody>
                            <Form onSubmit={onSubmit}>
                                <h1 style={{ color: "#3C4B64", fontSize: "35px" }}>Sign In</h1>
                                <p style={{ fontSize: "14px", marginBottom:"10px" }} className="text-muted">Enter your Identity Card Number</p>
                                <InputGroup className="mb-3">
                                    <InputGroupText style={{ borderRadius: "0.25rem 0px 0px 0.25rem" }}>
                                        <Icon.PersonFill />
                                    </InputGroupText>

                                    <Input style={{ fontSize: "14px" }} type="text" placeholder="" autoComplete="username" name="username" value={username} onChange={onChange} />
                                </InputGroup>
                                <Row>
                                    <Col xs="12">
                                        <Button style={{ fontSize: "14px" }} className="customButton">Sign In</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login
