import React from "react"
import "./NavBar.css"

export default ({ setPageState, logout } ) => {
    return (
            <div id="navigation" className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                <h3>GeckoSpot</h3>
                    <div onClick={() => { setPageState("myGeckos")}} className="navLink">My Geckos</div>
                    <div onClick={() => { setPageState("marketplace")}} className="navLink">Marketplace</div>
                </div>
                    <div onClick={logout} className="navLink">Logout</div>
            </div>
    )
}