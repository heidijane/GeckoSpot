import React from "react"
import "./NavBar.css"

export default ({ currentPage, setPageState, logout } ) => {
    return (
            <div id="navigation" className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex justify-content-start align-items-center flex-wrap">
                <div className="navLogo" onClick={() => { setPageState("myGeckos")}}><img src={require("../../images/geckospot_logo2.png")} alt="GeckoSpot" /></div>
                    <div onClick={() => { setPageState("myGeckos")}} className={`navLink ${currentPage === "myGeckos" || currentPage === "geckoDetails" ? " currentPage" : ""}`}>My Geckos</div>
                    <div onClick={() => { setPageState("marketplace")}} className={`navLink border-left-0 ${currentPage === "marketplace" ? " currentPage" : ""}`}>Marketplace</div>
                </div>
                    <div onClick={logout} className="navLink border-right-0">Logout</div>
            </div>
    )
}