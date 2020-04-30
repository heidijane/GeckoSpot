import React from "react"
import { NavbarBrand, NavItem, NavLink, Nav } from "reactstrap"
import "./NavBar.css"

export default ({ setPageState} ) => {
    return (
            <Nav id="navigation">
                <NavbarBrand>GeckoSpot</NavbarBrand>
                <NavItem>
                    <NavLink onClick={() => { setPageState("myGeckos")}}>My Geckos</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => { setPageState("marketplace")}}>Marketplace</NavLink>
                </NavItem>
            </Nav>
    )
}