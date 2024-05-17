import {Button, Card, Form, Input, message, Space, Table} from "antd";
import {api} from "../../services/api";
import {useCallback, useEffect, useState} from "react";
import {GetNextItem} from "./GetNextItem";

import "./RetrieveNextItem.css"

export const RetrieveItems = (callback, deps) => {

    const [data, setData] = useState({})

    const [groupListId, setGroupListId] = useState(null)

    const [validGroupListId, setValidGroupListId] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [reversedListItems, setReversedListItems] = useState([])
    const [prevListLength, setPrevListLength] = useState(0);


    function onSubmit(values) {
        console.log(values.group_list_id)
        setPrevListLength(1000)
        setGroupListId(values.group_list_id)
    }

    const getGroupList = useCallback(async ( ) => {
        if (groupListId) {
            try {
                const resp = await api.get(`/group_lists/${groupListId}?only_retrieved=1`)
                setData(resp.data)
                setReversedListItems([...resp.data.group_list_items].reverse())
                setValidGroupListId(true)
                message.success("Successfully retrieved list")
            } catch (err) {
                const errorMessage = err.response?.data || "An unexpected error occurred";
                message.error(`Error: ${errorMessage}`);
                setValidGroupListId(false)
                setReversedListItems([])
            }
        }
    }, [groupListId])

    useEffect(() => {
        console.log("get group list id triggered")
        getGroupList()
    }, [groupListId, getGroupList]);


    function onGetNextItem(values) {

        let body = {
            participant_id: values.participant_id,
        }

        api.post(`group_lists/${groupListId}/next_item`, body)
            .then(response => {
                console.log(response)
                if (response.data.status === "finished") {
                    console.log(response)
                    message.info(response.data.message)
                } else {
                    console.log(response.data)
                    message.success("Item Retrieved!")
                }
            })
            .then(() => {
                setPrevListLength(reversedListItems.length);
                getGroupList();
            })
            .catch((error) => {
                console.error("API error:", error);
                const errorMessage = error.response?.data?.error || "An unexpected error occurred";
                message.error(`Error: ${errorMessage}`);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    const columns = [
        {
            title: 'Index',
            key: 'index',
            render: (text, record, index) => reversedListItems.length - index
        },
        {
            title: 'Retrieved At',
            dataIndex: 'retrieved_at',
            key: 'retrieved_at',
        },
        {
            title: 'Participant ID',
            dataIndex: 'participant_id',
            key: 'participant_id',
        },
        {
            title: 'Group',
            dataIndex: 'data',
            key: 'group',
            render: item => item.group

        },
    ];

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
                        >
                            <Input>

                            </Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={!validGroupListId}>
                                Assign Next Item
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>

            <>

                <Table
                    dataSource={reversedListItems}
                    columns={columns}
                    rowClassName={(record, index) =>
                        index < (reversedListItems.length - prevListLength) ? 'new-row' : ''}/>;
            </>

        </div>
    )
}