import {Button, Card, Col, Form, Input, InputNumber, Row, Select, Switch} from "antd";
import {useState} from "react";


export const RandomizationListForm = ({onFormSend, isLoading, setHideStats, setHideList}) => {
    const [treatmentGroups, setTreatmentGroups] = useState([]);


    const handleGroupsChange = (newGroups) => {
        setTreatmentGroups(newGroups);
    }
    const sumDictValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);

    function onSubmit(values) {

        const groupsWithAllocationRatios = {}
        for (const group of treatmentGroups){
            groupsWithAllocationRatios[group] = parseInt(values[group])
        }
        // const ratioSum = sumDictValues(groupsWithAllocationRatios)
        values["treatment_groups"] = groupsWithAllocationRatios
        console.log(values)

        onFormSend(values)
    }

    return <div>
        <Card>
            <h1>Simple Randomizer</h1>
            <Form
                onFinish={onSubmit}>
                <h3>Treatment Groups</h3>
                <Form.Item
                    rules={[{required: true, message: 'This field is required'}]}
                    name="treatment_groups">
                    <Select
                        mode="tags"
                        style={{
                            width: '100%',
                        }}
                        onChange={handleGroupsChange}
                        tokenSeparators={[',']}
                    />
                </Form.Item>

                <h3>Allocation Ratios</h3>

                {treatmentGroups.map((group) => (
                    <Form.Item
                        key={group}
                        label={group}
                        name={group}
                        rules={
                            [
                                {required: true, message: 'This field is required'},
                            ]
                        }
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <InputNumber min={0}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                ))}


                <h3>Block Sizes</h3>
                <Form.Item
                    name="block_size_list"
                    rules={[{required: true, message: 'This field is required'}]}

                >
                    <Select
                        mode="tags"
                        style={{
                            width: '100%',
                        }}
                        tokenSeparators={[',']}
                    />
                </Form.Item>

                <h3>List Length</h3>
                <Form.Item
                    name="list_length"
                    rules={
                        [
                            {required: true, message: 'This field is required'},
                        ]
                    }
                >
                    <InputNumber min={0}></InputNumber>
                </Form.Item>

                <Form.Item
                name="hide_stats"
                label="Hide List Info"
                >
                    <Switch defaultChecked={false} onChange={(e) => setHideList(e)} />
                </Form.Item>
                <Form.Item
                name="hide_list"
                label="Hide Generated List"
                >
                    <Switch defaultChecked={false} onChange={(e) => setHideStats(e)} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isLoading}>
                        Generate List
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
}