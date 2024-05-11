import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import {useEffect, useState} from "react";
import {all} from "axios";

export const RandomizationListForm = ({onFormSend}) => {
    const [treatmentGroups, setTreatmentGroups] = useState([]);
    const [allocationRatios, setAllocationRatios] = useState({});


    const handleGroupsChange = (newGroups) => {
        setTreatmentGroups(newGroups);
    }

    // Initialize the allocation ratios state if treatment groups change
    useEffect(() => {
        const initialRatios = {};
        treatmentGroups.forEach((group) => {
            if (!(group in allocationRatios)) {
                initialRatios[group] = '';
            }
        });
        setAllocationRatios((prevRatios) => ({ ...initialRatios, ...prevRatios }));
    }, [treatmentGroups]);

    // Update the allocation ratio for a specific group
    const handleRatioChange = (group, value) => {
        setAllocationRatios({ ...allocationRatios, [group]: value });
    };

    function onSubmit(values) {
        values["treatment_groups"] = allocationRatios

        console.log(values)

        onFormSend(values)
    }


    return <div>
        <Card>
            <Form
                onFinish={onSubmit}>
                <h2>Treatment Groups</h2>
                <Form.Item
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

                <h2>Allocation Ratios</h2>
                {treatmentGroups.map((group) => (
                    <Form.Item key={group} label={group} name={group}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Input
                                    placeholder={`Enter ratio for ${group}`}
                                    value={allocationRatios[group]}
                                    onChange={(e) => handleRatioChange(group, e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                ))}

                <h2>Block Sizes</h2>
                <Form.Item
                    name="block_size_list">
                    <Select
                        mode="tags"
                        style={{
                            width: '100%',
                        }}
                        tokenSeparators={[',']}
                    />
                </Form.Item>

                <h2>List Length</h2>
                <Form.Item
                    name="list_length">
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Generate List
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
}