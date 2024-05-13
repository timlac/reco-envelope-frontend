import {RandomizationListForm} from "./RandomizationListForm";
import {api} from "../../services/api";
import {useState} from "react";
import {Card, Col, Collapse, List, message, Row, Statistic} from "antd";
import {Typography} from 'antd';

import PieDisplay from "../visualization/PieDisplay";
import "./RandomizationList.css"
import {UploadForm} from "./UploadForm";
import {countAttribute} from "../../services/utils";
import {BarDisplay} from "../visualization/BarDisplay";

const {Text} = Typography;

const {Panel} = Collapse;

export const RandomizationList = () => {

    const [generatedList, setGeneratedList] = useState([])

    const [waitingForRandomizer, setWaitingForRandomizer] = useState(false)


    function onFormSend(values) {
        console.log(values)
        setWaitingForRandomizer(true)

        api.post("/simple_randomizer", values)
            .then(response => {
                console.log(response)
                setGeneratedList(response.data)
                message.success("List Generation Successful!")
            })
            .catch((error) => {
                console.error("API error:", error)
                message.error(`Something went wrong ${error}`)
            //     TODO: make error message more informative
            })
            .finally(() => {
                setWaitingForRandomizer(false)
            });
    }

    function preprocessBlocks(data) {
        const blockCounts = countAttribute(data, "block_index")
        const valueOccurrences = {};
        Object.values(blockCounts).forEach(value => {
            valueOccurrences[value] = (valueOccurrences[value] || 0) + 1;
        });
        return valueOccurrences;
    }



    return <div>

        <Row>
            <Col style={{width: '50%'}}>
                <Card title="Simple Randomizer">
                    <RandomizationListForm onFormSend={onFormSend} isLoading={waitingForRandomizer}
                    />
                </Card>
            </Col>
            <Col style={{width: '50%'}}>
                <Card title="Upload to Database">
                    <p>Persist your generated list in a database and sample one participant at a time</p>
                    <UploadForm generatedList={generatedList}
                                waitingForRandomizer={waitingForRandomizer}></UploadForm>
                </Card>
            </Col>
        </Row>

        {generatedList.length > 0 &&
                <Row>
                    <Col>
                        <Collapse ghost>
                            <Panel header="View List Info" key="1">
                                <Card title="Statistics">
                                    <Statistic title="List Length" value={generatedList.length}/>
                                    <Text type="secondary">Group Distribution</Text>
                                    <PieDisplay data={countAttribute(generatedList, "group")}></PieDisplay>
                                    <Text type="secondary">Block Distribution</Text>
                                    <BarDisplay inputData={preprocessBlocks(generatedList)} ></BarDisplay>
                                    {/*<PieDisplay data={preprocessBlocks(generatedList)}></PieDisplay>*/}
                                </Card>
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col>

                        <Collapse ghost>
                            <Panel header="View List Items" key="2">
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
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>


        }
    </div>
}