import {Button, Card, Form, Input, message, Table} from "antd";
import {api} from "../../services/api";
import {useEffect, useState} from "react";
import {GetNextItem} from "./GetNextItem";


export const RetrieveItems = () => {

    const [data, setData] = useState({})

    const [nextItem, setNextItem] = useState(null)
    const [groupListId, setGroupListId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit(values) {
        console.log(values.group_list_id)
        setGroupListId(values.group_list_id)
    }


    useEffect(() => {
        if (groupListId) {
            api.get(`/group_lists/${groupListId}?only_retrieved=1`)
                .then(resp => {
                    console.log(resp)
                    setData(resp.data)
                })
        }
    }, [groupListId]);


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
                    setNextItem(response.data)
                    message.success("Item Retrieved!")
                }
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
            <Card title="Retrieve List Items">
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
            </Card>
            <>
                {data &&
                <Card title="Get Next Item">
                    <GetNextItem onSubmit={onGetNextItem}></GetNextItem>
                    {nextItem &&
                        <Card>
                            <p>Group: <b>{nextItem.group_list_item.data.group}
                            </b></p>
                            <p>Group: <b>{nextItem.participant_id}
                            </b></p>
                            <p>Retrieved at: <b>{nextItem.retrieved_at}
                            </b></p>
                            <p>Index: <b>{nextItem.group_list_item_index}
                            </b></p>
                        </Card>
                    }
                </Card>
            }
            </>
            <Table dataSource={data.group_list_items} columns={columns}/>;
        </div>
    )
}