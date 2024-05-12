import {Button, Card, Form, message} from "antd";
import {api} from "../services/api";
import {useState} from "react";
import CopyableText from "./CopyableText";

export const UploadForm = ({generatedList, waitingForRandomizer}) => {

    const [waitingForUpload, setWaitingForUpload] = useState(false)
    const [hash, setHash] = useState(null)

    function onFormSend() {
        setWaitingForUpload(true)

        api.post("/group_lists", generatedList)
            .then(response => {
                console.log(response)
                setHash(response.data.group_list_id)
                message.success("upload successful")
            })
            .then(() => setWaitingForUpload(false))
            .catch((error) => console.error("API error:", error))
    }

    return (<div>
        <Form onFinish={onFormSend}>
            <Form.Item>
                <Button type="primary" htmlType="submit"
                        disabled={generatedList.length === 0 || waitingForRandomizer || waitingForUpload}>
                    Upload
                </Button>
            </Form.Item>
        </Form>
        {hash &&
            <Card title="Unique Code">
                <CopyableText text={hash}></CopyableText>
            </Card>}
    </div>)
}