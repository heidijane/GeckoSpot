import React, { useState, useEffect } from "react"

export const GeckoContext = React.createContext()

export const GeckoProvider = (props) => {
    const [geckos, setGeckos] = useState([])

    const getGeckos = () => {
        return fetch("http://localhost:8088/geckos?_embed=geckoMorphs")
            .then(res => res.json())
            .then(setGeckos)
    }

    const addGecko = gecko => {
        return fetch("http://localhost:8088/geckos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gecko)
        })
            .then(_ => _.json())
            .then(gecko => {
                getGeckos()
                return gecko.id
             })
    }

    const deleteGecko = geckoId => {
        return fetch(`http://localhost:8088/geckos/${geckoId}`, {
            method: "DELETE"
        })
            .then(console.log('gecko deleted'))
            .then(getGeckos)
    }

    const updateGecko = gecko => {
        return fetch(`http://localhost:8088/geckos/${gecko.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gecko)
        })
            .then(getGeckos)
    }

    const addMorph = morph => {
        return fetch("http://localhost:8088/geckoMorphs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(morph)
        })
            .then(getGeckos)
    }

    const updateMorph = morph => {
        return fetch(`http://localhost:8088/geckoMorphs/${morph.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(morph)
        })
            .then(getGeckos)
    }

    const updateFeaturedImage = (geckoId, imageId) => {
        fetch(`http://localhost:8088/geckos/${geckoId}`, {
            method: "PATCH",
                body: JSON.stringify({
                    imageId: imageId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(getGeckos)
    }

    const updateOwner = (geckoId, userId) => {
        fetch(`http://localhost:8088/geckos/${geckoId}`, {
            method: "PATCH",
                body: JSON.stringify({
                    userId: userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(getGeckos)
    }

    useEffect(() => {
        getGeckos()
    }, [])

    useEffect(() => {
        console.log("****  GECKO APPLICATION STATE CHANGED  ****")
    }, [geckos])

    return (
        <GeckoContext.Provider value={{
            geckos, addGecko, deleteGecko, addMorph, updateGecko, updateMorph, updateFeaturedImage, updateOwner
        }}>
            {props.children}
        </GeckoContext.Provider>
    )
}