import React, { useRef } from "react"
import { Form, FormGroup, Input, Button, Card, CardBody, CardHeader } from "reactstrap"

export const Register = (props) => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                   return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(exists => {
                    if (!exists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: username.current.value,
                            email: email.current.value,
                            password: password.current.value,
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                sessionStorage.setItem("activeUser", createdUser.id)
                                props.toggle()
                            }
                        })
                    } else {
                        window.alert("User with this name already exists")
                    }
                })
        } else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <Card className="authForm">
            <CardHeader><h4>Register</h4></CardHeader>
            <CardBody>
                <Form onSubmit={handleRegister}>
                    <FormGroup>
                        <label htmlFor="username"> Username </label>
                        <Input innerRef={username} type="text"
                            name="username"
                            placeholder="username"
                            required  />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="inputEmail"> Email address </label>
                        <Input innerRef={email} type="email"
                            name="email"
                            placeholder="Email address"
                            required />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="inputPassword"> Password </label>
                        <Input innerRef={password} type="password"
                            name="password"
                            placeholder="Password"
                            required />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="verifyPassword"> Verify Password </label>
                        <Input innerRef={verifyPassword} type="password"
                            name="verifyPassword"
                            placeholder="Verify password"
                            required />
                    </FormGroup>
                    <FormGroup className="text-right">
                        <Button onClick={() => props.setState("login")}>
                            Back
                        </Button>
                        <Button type="submit" color="primary">
                            Register
                        </Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    )
}

