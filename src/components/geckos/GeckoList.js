import React, { useContext } from "react"
import { GeckoContext } from "./GeckoProvider"
import { Card, CardImg, CardTitle } from "reactstrap"
import "./GeckoList.css"

export default ({ setPageState, setGeckoDetailsId }) => {

    const { geckos } = useContext(GeckoContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    const userGeckos = geckos.filter(gecko => gecko.userId === currentUserId)

    if (userGeckos.length > 0) {
        return (
            <section className="geckoList">
                {userGeckos.map(gecko => {
                    return (
                        <Card 
                            key={"gecko_"+gecko.id}
                            className="geckoCard"
                            onClick={
                                () => {
                                    setGeckoDetailsId(gecko.id)
                                    setPageState("geckoDetails")
                                } 
                                }>
                            <CardImg top width="100%" src={require("../images/sample.gif")} />
                            <CardTitle className="geckoCard__title">{gecko.name}</CardTitle>
                        </Card>
                    )
                })}
            </section>
            )
    } else {
        return (<section className="geckoList">You haven't added any geckos yet!</section>)
    }

    
}