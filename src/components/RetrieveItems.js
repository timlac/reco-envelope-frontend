import {Button, Card, Form, Input, message} from "antd";
import {api} from "../services/api";
import {useState} from "react";


export const RetrieveItems = () => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit(values) {

        console.log(values)
        console.log(values.group_list_id)

        setIsLoading(true)

        api.get("group_lists/" + values.group_list_id + "/next_item")
            .then(response => {
                console.log(response)
                if (response.data.status === "finished") {
                    console.log(response)
                    message.info(response.data.message)
                } else {
                    setData(response.data)
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

    return (
        <div>
            <Card title="Retrieve Next Item">
                <Form
                    onFinish={onSubmit}
                >
                    <h3>Retrieval Code</h3>
                    <Form.Item
                        name="group_list_id"
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

            {data &&
                <Card>
                    {/* TODO: handle cases where the data is none*/}
                    <p>Group: <b>{data.group_list_item.data.group}
                    </b></p>
                    <p>Retrieved at: <b>{data.retrieved_at}
                    </b></p>
                    {/*TODO: increment index +1 here instead of back-end*/}
                    <p>Index: <b>{data.group_list_item_index}
                    </b></p>
                </Card>
            }
        </div>
    )
}