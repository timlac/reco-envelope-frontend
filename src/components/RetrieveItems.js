import {Button, Card, Form, Input} from "antd";
import {api} from "../services/api";
import {useState} from "react";


export const RetrieveItems = () => {

    const [data, setdata] = useState(null)

    function onSubmit (values) {

        console.log(values)
        console.log(values.group_list_id)

        api.get("group_lists/" + values.group_list_id + "/next_item")
            .then(response => {
                console.log(response)
                setdata(response.data)
            })
            .catch((error) => console.error("API error:", error))
    }

    return (
        <div>
            <Card title="Retrieve Next Item">
                <Form
                onFinish={onSubmit}
                >
                    <h3>Retrieval Code</h3>
                    <Form.Item
                        name="group_list_id"
                        rules={[{required: true}]}

                    >
                        <Input>

                        </Input>
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Retrieve
                    </Button>
                </Form.Item>
                </Form>

            </Card>

            {data &&
                <Card>
                    <p>Group: <b>{data.group_list_item.data.group}
                    </b></p>
                    <p>Retrieved at: <b>{data.retrieved_at}
                    </b></p>
                    <p>Index: <b>{data.group_list_item_index}
                    </b></p>
                </Card>
            }
        </div>
    )
}