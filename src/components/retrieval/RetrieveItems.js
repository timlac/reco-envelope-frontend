import {Button, Card, Form, Input, message, Space, Table} from "antd";
import {api} from "../../services/api";
import {useState} from "react";

import "./RetrieveNextItem.css"
import {ItemDisplay} from "./ItemDisplay";

export const RetrieveItems = (callback, deps) => {

    const [groupListId, setGroupListId] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [reversedListItems, setReversedListItems] = useState([])

    const [highLightIndex, setHighLightIndex] = useState(0);

    function onSubmit(values) {
        console.log(values.group_list_id)
        setHighLightIndex(0)
        getGroupList(values.group_list_id, true)
            .then(() => {
                setGroupListId(values.group_list_id)
                message.success("Successfully retrieved list");
            })
            .catch((err) => {
                const errorMessage = err.response?.data || "An unexpected error occurred";
                message.error(`Error: ${errorMessage}`);
            });
    }

    const getGroupList = async (id, suppressErrors = false) => {
        if (id) {
            try {
                const resp = await api.get(`/group_lists/${id}?only_retrieved=1`)
                console.log(resp)
                setReversedListItems([...resp.data.group_list_items].reverse())
            } catch (err) {
                if (!suppressErrors) {
                    const errorMessage = err.response?.data || "An unexpected error occurred";
                    message.error(`Error: ${errorMessage}`);
                }
                setReversedListItems([])
                throw err;
            }
        }
    }


    function onGetNextItem(values) {

        console.log(values)

        let body = {
            participant_id: values.participant_id,
        }

        console.log(body)

        api.post(`group_lists/${groupListId}/next_item`, values)
            .then(response => {
                console.log(response)
                if (response.data.status === "finished") {
                    console.log(response)
                    message.info(response.data.message)
                } else {
                    console.log(response.data)
                    setHighLightIndex(response.data.group_list_item_index + 1)
                    message.success("Item Assigned!")
                }
            })
            .then(() => {
                getGroupList(groupListId)
            })
            .catch((error) => {
                console.error("API error:", error)
                const errorMessage = error.response?.data?.error || "An unexpected error occurred";
                message.error(`Error: ${errorMessage}`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div>
            <Card title="Retrieval Form">

                <Space direction="vertical" size="middle" style={{display: 'flex'}}>

                    <p>Start by inserting your saved retrieval code:</p>
                    <Form
                        onFinish={onSubmit}
                        layout="inline"
                    >
                        <Form.Item
                            name="group_list_id"
                            label="Retrieval Code"
                            rules={[{required: true, message: "Please input retrieval code"}]}

                        >
                            <Input>

                            </Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={isLoading}>
                                Retrieve
                            </Button>
                        </Form.Item>
                    </Form>

                    <p>Once you have inserted a valid code above you can start assigning items:</p>
                    <Form
                        onFinish={onGetNextItem}
                        layout="inline"
                    >
                        <Form.Item
                            name="participant_id"
                            label="Participant ID (optional)"
                            initialValue={""}
                        >
                            <Input>

                            </Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={!groupListId}>
                                Assign Next Item
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>

            <ItemDisplay
                highLightIndex={highLightIndex}
                reversedListItems={reversedListItems}
            />
        </div>
    )
}