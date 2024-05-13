import {Button, Col, Form, InputNumber, Row, Select} from "antd";
import {useState} from "react";


export const RandomizationListForm = ({onFormSend, isLoading}) => {
    const [treatmentGroups, setTreatmentGroups] = useState([]);


    const handleGroupsChange = (newGroups) => {
        setTreatmentGroups(newGroups);
    }

    function onSubmit(values) {

        const groupsWithAllocationRatios = {}
        for (const group of treatmentGroups) {
            groupsWithAllocationRatios[group] = parseInt(values[group])
        }
        // const ratioSum = sumDictValues(groupsWithAllocationRatios)
        values["treatment_groups"] = groupsWithAllocationRatios
        console.log(values)

        onFormSend(values)
    }

    return <div>
        <Form
            onFinish={onSubmit}>
            <Form.Item
                rules={[{required: true, message: 'This field is required'}]}
                name="treatment_groups"
                label="Treatment Groups"
            >
                <Select
                    mode="tags"
                    style={{
                        width: '100%',
                    }}
                    onChange={handleGroupsChange}
                    tokenSeparators={[',']}
                />
            </Form.Item>

            {treatmentGroups.map((group) => (
                <Form.Item
                    key={group}
                    label={`Block Proportion for ${group}`}
                    name={group}
                    rules={
                        [
                            {required: true, message: 'This field is required'},
                        ]
                    }
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <InputNumber
                                min={0}
                                controls={false}
                            />
                        </Col>
                    </Row>
                </Form.Item>
            ))}


            <Form.Item
                name="block_size_list"
                label="Block Sizes"

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

            <Form.Item
                name="list_length"
                label="List Length"
                rules={
                    [
                        {required: true, message: 'This field is required'},
                    ]
                }
            >
                <InputNumber
                    min={0}
                    controls={false}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                    Generate List
                </Button>
            </Form.Item>
        </Form>
    </div>
}