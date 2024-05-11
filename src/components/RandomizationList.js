import {RandomizationListForm} from "./RandomizationListForm";
import {api} from "../services/api";
import {useState} from "react";
import {Card, List, Statistic} from "antd";
import PieDisplay from "./PieChart";
import "./RandomizationList.css"


export const RandomizationList = () => {

    const [generatedList, setGeneratedList] = useState([])

    function onFormSend(values) {
        console.log(values)

        api.post("/simple_randomizer", values)
            .then(response => {
                console.log(response)
                setGeneratedList(response.data)
            })
            .catch((error) => console.error("API error:", error));
    }

    function preprocessPieChart(data) {
        const counts = {}

        for (const item of data) {
            counts[item.group] = (counts[item.group] || 0) + 1
        }

        return counts
    }

    return <div>
        <RandomizationListForm onFormSend={onFormSend}/>

        {generatedList.length > 0 &&
            <div className="cards-flex-container"> {/* or "cards-grid-container" for grid layout */}
                <Card title="Statistics">
                    <Statistic title="List Length" value={generatedList.length}/>
                    <h2>Group Distribution</h2>
                    <PieDisplay data={preprocessPieChart(generatedList)}></PieDisplay>
                </Card>
                <Card title="Items">
                    <List
                        size="small"
                        header={<div>Block, Group</div>}
                        footer={<div>End</div>}
                        bordered
                        dataSource={generatedList}
                        renderItem={(item) => <List.Item>{item.block_index}, {item.group}</List.Item>}
                    />
                </Card>
            </div>
        }
    </div>
}