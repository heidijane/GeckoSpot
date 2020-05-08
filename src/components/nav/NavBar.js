import React from "react"
import "./NavBar.css"

export default ({ setPageState, logout } ) => {
    return (
            <div id="navigation" className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex justify-content-start align-items-center flex-wrap">
                <div className="navLogo" onClick={() => { setPageState("myGeckos")}}>GeckoSpot</div>
                    <div onClick={() => { setPageState("myGeckos")}} className="navLink">My Geckos</div>
                    <div onClick={() => { setPageState("marketplace")}} className="navLink border-left-0">Marketplace</div>
                </div>
                    <div onClick={logout} className="navLink">Logout</div>
            </div>
    )
}