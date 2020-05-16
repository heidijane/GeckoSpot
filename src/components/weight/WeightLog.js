import React, { useContext, useState } from "react"
import { Card, CardHeader, CardBody, Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap"
import { WeightContext } from "./WeightProvider"
import { timestampToDateString } from "../../utilities/timestampToString"
import AddWeightForm from "./AddWeightForm"
import {Line} from 'react-chartjs-2';

export default ({ geckoId }) => {

    const { weights, deleteWeight } = useContext(WeightContext)
    const geckoWeights = weights.filter(weight => weight.geckoId === geckoId)

    geckoWeights.sort((a, b) => (a.weighDate > b.weighDate) ? 1 : (a.weighDate === b.weighDate) ? ((a.id > b.id) ? 1 : -1) : -1 )

    //states for add weight modal
    const [addWeightModal, setAddWeightModal] = useState(false)
    const addWeightModalToggle = () => setAddWeightModal(!addWeightModal)

    //make an array of weights for the graph
    let weightArray = []
    let dateLabels = []
    geckoWeights.forEach(weight => {
        const date = new Date(weight.weighDate * 1000)
        const formatter = new Intl.DateTimeFormat('default', { month: 'short', year: 'numeric' })
        const month = formatter.format(date)

        weightArray.push({
            x: month,
            y: weight.weight
        })

        dateLabels.push(month)
    })

    const arrayUnique = (arr) => {
        return arr.filter(function(item, index){
            return arr.indexOf(item) >= index
        })
    }

    //create the data for the graph
    const graphData = {
        labels: arrayUnique(dateLabels),
        datasets: [
          {
            label: 'Weight',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: weightArray
          }
        ]
      }

    console.log(weightArray)

    const weightGraph = (
        <Line data={graphData} />
    )

    const weightTable = (
        <Table className="mealLog table-sm table-responsive">
                    <thead>
                        <tr>
                            <th className="align-middle border-top-0 pr-3">Date</th>
                            <th className="align-middle w-100 border-top-0">Weight</th>
                            <th className="text-nowrap border-top-0"></th>
                        </tr>
                    </thead>
                    <tbody>
                {geckoWeights.map(weight => {
                    return (
                        
                            <tr key={"weightrow"+weight.id}>
                                <td className="align-middle">{timestampToDateString(weight.weighDate)}</td>
                                <td className="align-middle">{weight.weight} grams</td>
                                <td className="text-right">
                                    <div className="text-nowrap">
                                    <Button 
                                        className="btn-sm"
                                        color="danger"
                                        onClick={() => deleteWeight(weight.id)}
                                    >delete</Button>
                                    </div>
                                </td>
                            </tr>
                        
                    )
                })}
                </tbody>
                </Table>
    )

    return (
        <>
        <Card className="mt-3">
            <CardHeader className="align-middle">
                Weight Log
                <Button 
                    color="primary"
                    className="btn-sm float-right"
                    onClick={addWeightModalToggle}
                    >
                        Log Weight
                </Button>
            </CardHeader>
            <CardBody>
                {geckoWeights.length > 0 ? (<>{weightGraph} {weightTable}</>) : "You have not logged your gecko's weight yet."}
            </CardBody>
        </Card>

        <Modal isOpen={addWeightModal} toggle={addWeightModalToggle}>
        <ModalHeader toggle={addWeightModalToggle}>
        Log Weight
        </ModalHeader>
        <ModalBody>
            <AddWeightForm toggle={addWeightModalToggle} geckoId={geckoId} />
        </ModalBody>
        </Modal>
        </>
    )
}