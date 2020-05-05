import React, { useRef } from "react"
import { Form, FormGroup, Input, Button, Card, CardBody, CardHeader } from "reactstrap"

export const Login = (props) => {
    const username = useRef()
    const password = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    sessionStorage.setItem("activeUser", exists.id)
                    props.toggle()
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } else if (!exists) {
                    window.alert("User account does not exist")
                }
            })
    }

    return (
        <Card className="authForm">
            <CardHeader><h4>Please sign in</h4></CardHeader>
            <CardBody>
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <label htmlFor="login__username">Username</label>
                    <Input 
                        innerRef={username}
                        type="text"
                        name="login__username"
                        placeholder="Username"
                        required
                        autoFocus />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="login__password">Password</label>
                    <Input 
                        innerRef={password} 
                        type="password"
                        name="login__password"
                        placeholder="Password"
                        required />
                </FormGroup>
                <FormGroup className="text-right">
                    <Button type="submit" color="primary">
                        Sign in
                    </Button>
                </FormGroup>
            </Form>
            <hr />
            <div className="fakeLink href" onClick={() => props.setState("register")}>Or click here to register.</div>
            </CardBody>
        </Card>
    )
}

