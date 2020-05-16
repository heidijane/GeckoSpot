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
        weightArray.push({
            x: weight.weighDate,
            y: weight.weight
        })

        dateLabels.push(weight.weighDate)
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
            borderWidth: 2,
            data: weightArray,
            backgroundColor: 'rgba(255,209,0,1)',
            borderColor: 'rgba(255,208,135,1)',
          }
        ]
      }

    const graphOptions = {
        scales: {
            xAxes:[{
                ticks:{
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    callback: function(value, index, values) {
                        const date = new Date(value * 1000)
                        const formatter = new Intl.DateTimeFormat('default', { month: 'short', year: 'numeric' })
                        const monthYear = formatter.format(date)
                        return monthYear;
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItem, data) {
                    console.log(tooltipItem)
                    const date = new Date(tooltipItem[0].xLabel * 1000)
                    const formatter = new Intl.DateTimeFormat('en-US')
                    const formattedDate = formatter.format(date)
                    return formattedDate
                },
                label: function(tooltipItems, data) { 
                    return tooltipItems.yLabel + ' grams';
                }
            }
        }
    }

    const weightGraph = (
        <Line data={graphData} options={graphOptions} />
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