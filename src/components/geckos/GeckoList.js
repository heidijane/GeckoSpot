import React, { useContext } from "react"
import { GeckoContext } from "./GeckoProvider"
import { Card, CardImg, CardTitle, CardText } from "reactstrap"
import "./GeckoList.css"
import { MealContext } from "../meals/MealProvider"
import { timestampToDateString } from "../../utilities/timestampToString"
var pluralize = require('pluralize')

export default ({ setPageState, setGeckoDetailsId }) => {

    const { geckos } = useContext(GeckoContext)
    const { meals } = useContext(MealContext)

    const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    const userGeckos = geckos.filter(gecko => gecko.userId === currentUserId)

    if (userGeckos.length > 0) {
        return (
            <section className="geckoList">
                {userGeckos.map(gecko => {
                    //get most recent meal for current gecko
                    const filteredMeals = meals.filter(meal => meal.geckoId === gecko.id)
                    //sort meals by date
                    filteredMeals.sort((a, b) => (a.mealDate > b.mealDate) ? 1 : (a.mealDate === b.mealDate) ? ((a.id > b.id) ? 1 : -1) : -1 )
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
                            {filteredMeals.length === 0 ? "" : <CardText>Last fed {filteredMeals[0].quantity} {pluralize(filteredMeals[0].mealType, filteredMeals[0].quantity)} on {timestampToDateString(filteredMeals[0].mealDate)}</CardText>}
                        </Card>
                    )
                })}
            </section>
            )
    } else {
        return (<section className="geckoList">You haven't added any geckos yet!</section>)
    }

    
}