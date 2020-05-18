import React, { useContext } from "react"
import { GeckoContext } from "../geckos/GeckoProvider"
import { ImageContext } from "../images/ImageProvider"
import { FamilyContext } from "./FamilyProvider"

export default ( {geckoId} ) => {
    const { geckos } = useContext(GeckoContext)
    const { images } = useContext(ImageContext)
    const { parents } = useContext(FamilyContext)

    let geckoFamily = []

    //get the parents of the gecko
    const parentRelationships = parents.filter(parent => parent.geckoId === geckoId)
    //match relationship up with gecko object
    const geckoParents = parentRelationships.map(rel => {
        const matchedGecko = geckos.find(gecko => gecko.id === rel.parentId)
        if (matchedGecko !== undefined) {
            if (matchedGecko.sex === 0) {
                matchedGecko.relationship = "mother"
            } else if (matchedGecko.sex === 1) {
                matchedGecko.relationship = "father"
            }
            geckoFamily.push(matchedGecko)
            return matchedGecko
        } else {
            return false
        }
    })

    //get the siblings
    parentRelationships.forEach(parent => {
        const parentChildren = parents.filter(rel => rel.parentId === parent.parentId)
            parentChildren.forEach(rel => {
                const matchedGecko = geckos.find(gecko => gecko.id === rel.geckoId)
                matchedGecko.relationship = "sibling"
                geckoFamily.push(matchedGecko)
            })
    })

    //get children
    const geckoChildren = parents.filter(rel => rel.parentId === geckoId)
    geckoChildren.forEach(rel => {
        const matchedGecko = geckos.find(gecko => gecko.id === rel.geckoId)
        matchedGecko.relationship = "child"
        geckoFamily.push(matchedGecko)
    })

    //get mates
    geckoChildren.forEach(child => {
        //get parent of child that doesn't match current geckoId
        const mateRel = parents.find(rel => child.geckoId === rel.geckoId && rel.parentId !== geckoId)
        if (mateRel !== undefined) {
            const matchedGecko = geckos.find(gecko => gecko.id === mateRel.parentId)
            if (matchedGecko !== undefined) {
                matchedGecko.relationship = "mate"
                geckoFamily.push(matchedGecko)
            }
        }     
    })

    const arrayUnique = (arr) => {
        return arr.filter(function(item, index){
            return arr.indexOf(item) >= index
        })
    }

    //remove current gecko from the list
    geckoFamily = geckoFamily.filter(gecko => gecko.id !== geckoId)
    geckoFamily = arrayUnique(geckoFamily)

    return (
        <div>
            {
                geckoFamily.map(fam => {
                    return <p key={"rel_"+fam.id}>{fam.name} - {fam.relationship}</p>
                })
            }
        </div>
    )
}