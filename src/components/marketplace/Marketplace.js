import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import SellGeckoForm from "../marketplace/SellGeckoForm"
import ListingList from "./ListingList"

export default () => {

    //state for the sell gecko modal
    const [sellGeckoModal, setsellGeckoModal] = useState(false)
    const sellGeckoModalToggle = () => setsellGeckoModal(!sellGeckoModal)

    return (
        <>
            <div className="text-right">
                <Button onClick={sellGeckoModalToggle} color="primary" className="ml-2">Sell a Gecko</Button>
            </div>
            <ListingList />
            <Modal isOpen={sellGeckoModal} toggle={sellGeckoModalToggle} backdrop={"static"}>
                <ModalHeader toggle={sellGeckoModalToggle}>
                    Create Marketplace Listing
                </ModalHeader>
                <ModalBody>
                    <SellGeckoForm toggle={sellGeckoModalToggle} geckoId={null} />
                </ModalBody>
            </Modal>
        </>
    )
}