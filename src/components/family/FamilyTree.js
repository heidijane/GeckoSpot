import React, { useContext } from "react"
import { GeckoContext } from "../geckos/GeckoProvider"
import { ImageContext } from "../images/ImageProvider"
import { FamilyContext } from "./FamilyProvider"
import "./FamilyTree.css"
var pluralize = require('pluralize')

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
            return undefined
        }
    })

    //get the siblings
    parentRelationships.forEach(parent => {
        const parentChildren = parents.filter(rel => rel.parentId === parent.parentId && rel.parentId !== 0)
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

    //auto increment key generator for unknown parents
    function* autoIncrement() {
        var index = 1
        while (true)
            yield index++
    }
    let unknownId = autoIncrement()

    //outputs a cirlce with a gecko's profile image and name/gender
    const famCircle = (geckoObj) => {
        if (geckoObj !== undefined) {
            //get gecko profile image
            const featuredImage = images.find(image => image.id === geckoObj.imageId)
            return (
                <div key={"relWrap_"+geckoObj.id} className="mx-1">
                <div key={"rel_"+geckoObj.id} className="family-icon">
                    {geckoObj.imageId === 0 || geckoObj.imageId === null ? (
                        <div className="featuredImage featuredImage_placeholder"></div>
                    ): (
                        <img src={featuredImage.imageURL} className="featuredImage" alt="" />
                    )}
                    </div>
                    {geckoObj.name} {geckoObj.sex === 0 ? <img src={require("../../images/icon_female.png")} alt="female" className="genderIcon" /> : <img src={require("../../images/icon_male.png")} alt="male" className="genderIcon" />}
                </div>
            )
        } else {
            return (
                <div key={"relWrap_"+unknownId.next().value} className="mx-1">
                <div key={"rel_"+unknownId.next().value} className="family-icon">
                        <div className="featuredImage featuredImage_placeholder"></div>
                    </div>
                    Unknown
                </div>
            )
        }
    }

    const mother = geckoFamily.find(geckObj => geckObj.relationship === "mother")
    const father = geckoFamily.find(geckObj => geckObj.relationship === "father")
    const siblings = geckoFamily.filter(geckObj => geckObj.relationship === "sibling")
    const children = geckoFamily.filter(geckObj => geckObj.relationship === "child")
    const mates = geckoFamily.filter(geckObj => geckObj.relationship === "mate")

    return (
        <div className="text-center">
                <div className="mb-3">
                    <div className="section_header">Parents</div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {famCircle(mother)}
                        {famCircle(father)}
                    </div>
                </div>

            {Array.isArray(siblings) && siblings.length ? (
                <div className="mb-3">
                    <div className="section_header">{pluralize("Siblings", siblings.length)}</div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {siblings.map(geckObj => famCircle(geckObj))}
                    </div>
                </div>
                ) : ""
            }
            {Array.isArray(mates) && mates.length ? (
                <div className="mb-3">
                    <div className="section_header">{pluralize("Mate", mates.length)}</div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {mates.map(geckObj => famCircle(geckObj))}
                    </div>
                </div>
                ) : ""
            }
            {Array.isArray(children) && children.length ? (
                <div>
                    <div className="section_header">{pluralize("Child", children.length)}</div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {children.map(geckObj => famCircle(geckObj))}
                    </div>
                </div>
                ) : ""
            }
        </div>
    )
}