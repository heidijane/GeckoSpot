import React, { useContext } from "react"
import { GeckoContext } from "./GeckoProvider"

export default () => {

    const { geckos } = useContext(GeckoContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    const userGeckos = geckos.filter(gecko => gecko.userId === currentUserId)
    return (
        <>
            {userGeckos.map(gecko => {
                return (
                    <p key={"gecko_"+gecko.id}>{gecko.name}</p>
                )
            })}
        </>
        )
}