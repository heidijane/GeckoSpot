import React, { useRef } from "react"


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
        <div className="container--login">
            <form className="form--login" onSubmit={handleLogin}>
                <h2>Please sign in</h2>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input ref={username} type="text"
                        id="username"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
            <hr />
            <div className="fakeLink href" onClick={() => props.setState("register")}>Or click here to register.</div>
        </div>
    )
}

