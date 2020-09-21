import React from 'react';
import { Tag, Tooltip, Button, Modal, Form,Select,TimePicker,notification} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import moment from 'moment';
const Item = (props) => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const { Option } = Select;
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
        visible === false ? setVisible(true) : setVisible(false);
    }
    const toggleCancel = () => {
        setVisible(false);
    }
    const excuteEdit=()=>{
        setVisible(false);
        const args = {
            message: 'Updated Successfully',
            description:
                'This time was updated in Your System !',
            duration: 1,
        };
        notification.open(args);
    }
    const checkTimeIn = (a) => {
        if (a !== "") {
            {
                return (
                    <Tag color="magenta">{a}</Tag>
                );
            }
        }
        else {
            return (
                <Tag color="warning">Absent</Tag>
            );
        }
    }

    const checkTimeOut = (a) => {
        if (a !== "") {
            {
                return (
                    <Tag color="processing">{a}</Tag>
                );
            }
        }
        else {
            return (
                <Tag color="warning">Absent</Tag>
            );
        }
    }
    const makeColor = (a) => {
        if (a === 1) {
            return (
                <Tag color="orange">
                    CA1
                </Tag>
            );
        }
        if (a === 2) {
            return (
                <Tag color="geekblue">
                    CA2
                </Tag>
            );
        }
        if (a === 3) {
            return (
                <Tag color="lime">
                    CA3
                </Tag>
            );
        }
    }

    const format = 'HH:mm';
    return (
        <tr>
            <td>{props.e.key}</td>
            <td>{props.e.id}</td>
            <td>{props.e.fullName}</td>
            <td>{props.e.department}</td>
            <td>
                {
                    makeColor(props.e.workingShift)
                }
            </td>
            <td>
                <Tooltip title="Inside">
                    {
                        checkTimeIn(props.e.in)
                    }
                </Tooltip>
                <Tooltip>
                    {
                        checkTimeOut(props.e.out)
                    }
                </Tooltip>
            </td>
            <td>
                <Tooltip placement="topLeft" title="Edit!">
                    <Button shape="circle" icon={<EditOutlined />} style={{ backgroundColor: "rgb(236, 118, 82)" }} onClick={toggleVisible}></Button>
                    <Modal
                        visible={visible}
                        title="Edit TimeKeeping"
                        onCancel={toggleCancel}
                        footer={[
                            <Button key="back" onClick={toggleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={excuteEdit}>
                                Excute
                            </Button>
                        ]}
                    >
                        <Form {...layout}>
                            <Form.Item label="In">
                                <TimePicker
                                    defaultValue={moment('12:08', format)}
                                    format={format}
                                    style={{width:350}}
                                />
                            </Form.Item>

                            <Form.Item label="Out">
                                <TimePicker
                                    defaultValue={moment('12:08', format)}
                                    format={format}
                                    style={{width:350}}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Tooltip>
            </td>
        </tr>
    );
}

export default Item;