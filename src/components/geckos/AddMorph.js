import React, { useRef, useContext, useState } from "react"
import { Form, FormGroup, FormText, Input, Label, Button } from "reactstrap"
import "./AddGeckoForm.css"
import { GeckoContext } from "./GeckoProvider"
  

export default ({ geckoId, toggle }) => {

    const { addMorph } = useContext(GeckoContext)

    const knowMorph = useRef()
    const colorMorph = useRef()
    const eyeMorph = useRef()
    const sizeMorph = useRef()

    const [formEnabled, setFormEnabled] = useState(true)
    const [formClass, setFormClass] = useState("disabled-form")
    const formToggler = () => {
        if (knowMorph.current.value === "yes") {
            setFormEnabled(false)
            setFormClass("")
        } else {
            setFormEnabled(true)
            setFormClass("disabled-form")
        }         
    }

    const createMorph = () => {
        if (colorMorph.current.value === "" && eyeMorph.current.value === "" && sizeMorph.current.value === "") {
            window.alert("Please select at least one type of morph or just click the skip button.")
        } else {
            const newMorphObj = {
                geckoId: geckoId,
                colorMorph: colorMorph.current.value,
                eyeMorph: eyeMorph.current.value,
                sizeMorph: sizeMorph.current.value
            }

            addMorph(newMorphObj)
                .then(toggle)
        }
    }

    const colorMorphList = [
        "High Yellow",
        "Mack Snow",
        "Super Snow",
        "Tremper Albino",
        "Bell Albino",
        "Rainwater Albino (Las Vegas)",
        "Bold Stripe",
        "Red Stripe",
        "Raining Red Stripe",
        "Super Hypo",
        "Baldy",
        "Hybino",
        "Sunglow",
        "Hypo Ghost",
        "Black Velvet",
        "Black Pearl",
        "Banana Blizzard",
        "Blazing Blizzard",
        "Blazing Banana Blizzard",
        "Patternless",
        "Murphy's Patternless",
        "Enigma",
        "Tangerine",
        "Carrot Tail",
        "Carrot Head",
        "Aberrant",
        "Jungle",
        "Lavender",
        "Halloween Mask",
        "RAPTOR",
        "APTOR",
        "Diablo Blanco",
        "Dreamsicle",
        "Nova",
        "Abyssinian",
        "Aurora",
        "Aurora RADAR",
        "Bell Blazing Blizzard",
        "Black Hole",
        "Blizzard",
        "Bold Stripe Albino",
        "Creamsicle",
        "Crystal",
        "Cyclone",
        "Eclipse",
        "Ember",
        "Emerald",
        "Firewater",
        "Gem Snow",
        "Ghost",
        "Hyglo",
        "Hyper Melanistic",
        "Hypomelanistic",
        "Icicle",
        "JBR Glow",
        "Lavender",
        "Line Bred Snow",
        "Mack Snow Albino",
        "Mack Snow Blizzard",
        "Mack Snow Cyclone",
        "Mack Snow Diablo Blanco",
        "Mack Snow Ember",
        "Mack Snow Enigma",
        "Mac Snow Fasciolatus",
        "Mac Snow Ghost",
        "Mack Snow Patternless",
        "Mack Snow Patternless Albino",
        "Mack Snow Predator",
        "Mack Snow RADAR",
        "Mac Snow RAPTOR",
        "Mac Snow Typhoon",
        "Mac Snow White Knight",
        "Nieves Tangerine",
        "Nova",
        "Paradox",
        "Mack Pastel",
        "Tremper Pastel",
        "Patternless Albino",
        "Patternless Stripe",
        "Phantom",
        "Predator",
        "RADAR",
        "Raining Red Stripe",
        "Rainwater Blazing Blizzard",
        "Rainwater Hybino",
        "Rainwater Mack Snow",
        "Raptor Creamsicle",
        "RAPTOR Enigma",
        "Reverse Stripe",
        "Super Hypo Tangerine (SHT)",
        "Super Hypo Tangerine Carrot Tail (SHTCT)",
        "Snow Storm",
        "Snowflake",
        "Snowglow",
        "Snowglow RAPTOR",
        "Sonar",
        "Stealth",
        "Stripe",
        "Stripe Albino",
        "Sunburst Tangerine",
        "Sunglow",
        "Super Bee",
        "Super Calcite",
        "Super Crystal",
        "Super Cyclone",
        "Super Hypo",
        "Super Hypo Tangerine",
        "Super Nova",
        "Super Platinum",
        "Super RADAR",
        "Super RAPTOR",
        "Super Snow",
        "Super Snow Albino",
        "Super Snow Enigma",
        "Super Snow Blazing Blizzard",
        "Super Snow Diablo Blanco",
        "Super Snow Eclipse",
        "Super Snow Enigma Eclipse",
        "Super Snow Patternmess",
        "Super Snow White Knight",
        "Super Stealth",
        "Super Typhoon",
        "Tangelo",
        "Tangerine",
        "Tangerine Dorsal Stripe",
        "Tangerine Tornado",
        "Total Eclipse",
        "Tremper Albino",
        "Tremper Blazing Blizzard",
        "Tremper Hybino",
        "Tremper Mack Snow",
        "TUG Snow",
        "TUG Snow Black Hole",
        "TUG Snow Ember",
        "TUG Snow Murphy's Patternless Albino",
        "TUG Snow RAPTOR",
        "Typhoon",
        "Universe",
        "Vermillion",
        "Vortex",
        "White and Yellow",
        "White and Yellow Super RADAR",
        "White Knight",
        "White Out",
        "White Side",
        "Bandit"
    ]

    const eyeMorphList = [
        "Blue Amber",
        "Marble Eye",
        "Noir Désir",
        "Snake Eyes",
        "Eclipse"
    ]

    const sizeMorphList = [
        "Giant",
        "Super Giant",
        "Godzilla Super Giant"
    ]

    //sort the lists alphabetically
    colorMorphList.sort()
    eyeMorphList.sort()

    return (
        <>
        <FormGroup>
            <Label for="morphForm__toggle">Do you know your gecko's morph?</Label>
                <Input
                    innerRef={knowMorph}
                    type="select"
                    name="formToggle"
                    id="morphForm__toggle"
                    onChange={formToggler}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </Input>
                <FormText color="muted">
                If you don't know your gecko's morph that's okay! Geckos purchased as pets and not for breeding will often be sold without
                their genetic information. Feel free to skip this step if you are unsure!
                </FormText>
        </FormGroup>
        <Form className={formClass}>
            <FormGroup>
                <Label for="morphForm__colorMorph">Color Morph</Label>
                <Input
                    innerRef={colorMorph}
                    type="text"
                    name="colorMorph"
                    id="morphForm__colorMorph"
                    list="colorMorphs"
                    disabled={formEnabled}
                />
                    <datalist id="colorMorphs">
                            <option key="color_default">Normal (Wild Type)</option>
                        {colorMorphList.map((morph, key) => {
                            return <option key={"color_"+key}>{morph}</option>
                        })}
                    </datalist>
            </FormGroup>
            <FormGroup>
                <Label for="morphForm__eyeMorph">Eye Morph</Label>
                <Input
                    innerRef={eyeMorph}
                    type="text"
                    name="eyeMorph"
                    id="morphForm__eyeMorph"
                    list="eyeMorphs"
                    disabled={formEnabled}
                />
                    <datalist id="eyeMorphs">
                            <option key="eye_default">Normal</option>
                        {eyeMorphList.map((morph, key) => {
                            return <option key={"color_"+key}>{morph}</option>
                        })}
                    </datalist>
            </FormGroup>
            <FormGroup>
                <Label for="morphForm__colorMorph">Size Morph</Label>
                <Input
                    innerRef={sizeMorph}
                    type="text"
                    name="sizeMorph"
                    id="morphForm__sizeMorph"
                    list="sizeMorphs"
                    disabled={formEnabled}
                />
                    <datalist id="sizeMorphs">
                            <option key="color_default">Normal</option>
                        {sizeMorphList.map((morph, key) => {
                            return <option key={"color_"+key}>{morph}</option>
                        })}
                    </datalist>
            </FormGroup>
            <FormGroup className="text-right">
                <Button
                disabled={formEnabled}
                type="submit"
                color="primary"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        createMorph()
                    }
                }
                >Save Morph</Button>
                <Button onClick={toggle}>Skip</Button>
            </FormGroup>
            
        </Form>
        </>
    )
}