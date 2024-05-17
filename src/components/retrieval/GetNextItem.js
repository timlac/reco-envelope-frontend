import {Button, Form, Input} from "antd";


export const GetNextItem = ({onSubmit}) => {

    return (
        <Form
            onFinish={onSubmit}
            layout="inline"
        >
            <Form.Item
                name="participant_id"
                label="Assign Participant ID (optional)"
            >
                <Input>

                </Input>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Retrieve Next Item
                </Button>
            </Form.Item>
        </Form>
    )
}