import React, { useState } from "react"
import { Auth } from "../auth/Auth"
import "./Welcome.css"

export const Welcome = (props) => {
    return (
        <>
            <div id="welcomeContainer">
                <Auth toggle={props.toggle} />
            </div>
        </>
    )
}