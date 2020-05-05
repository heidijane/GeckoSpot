import React from "react"
import { NavbarBrand, NavItem, NavLink, Nav } from "reactstrap"
import "./NavBar.css"

export default ({ setPageState, logout } ) => {
    return (
            <Nav id="navigation">
                <NavbarBrand>GeckoSpot</NavbarBrand>
                <NavItem>
                    <NavLink onClick={() => { setPageState("myGeckos")}}>My Geckos</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => { setPageState("marketplace")}}>Marketplace</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
            </Nav>
    )
}