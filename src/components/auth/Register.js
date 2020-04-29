import React, { useRef } from "react"


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
        <div className="container--login">
            <form className="form--register" onSubmit={handleRegister}>
                <h4 className="darkgray">If you are not a customer yet, please register a new account</h4>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input ref={username} type="text"
                        name="username"
                        className="form-control"
                        placeholder="username"
                        required  />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <button onClick={() => props.setState("login")}>
                        Back
                    </button>
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Register
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

