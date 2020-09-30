import React from 'react';
import { Tag, Tooltip, Button, Modal, Form, Select, TimePicker, notification, Pagination, message, DatePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import moment from 'moment';
import TimeIn from './TimeIn';
import TimeOut from './TImeOut';
import axios from 'axios';
import UserActivityService from '../../Services/UserActivityService';
import TimekepingService from '../../Services/TimekepingService';
const Item = (props) => {
    const [visible, setVisible] = useState(false);
    const checkType = props.e.type.split(' ');

    const checkTime = props.e.checktime.split(' ');
    const testt = props.e.tkp_id.toString();
    const testtt = testt.split(' ');
    const checkTimeIn = [];
    const checkTimeOut = [];
    const [message, setMessage] = useState("");
    const callback = (a) => {
        setMessage(a);
    }
    //console.log(message);
    if (message !== "") {
        props.call("");
        props.call("ddd");
        setMessage("");
    }


    for (var i = 0; i < checkType.length; i++) {
        if (checkType[i] === 'in') {
            checkTimeIn.push(checkTime[i] + " " + testtt[i]);
        }
    }
    
    for (var i = 0; i < checkType.length; i++) {
        if (checkType[i] ==='out') {
            checkTimeOut.push(checkTime[i] + " " + testtt[i]);
        }
    }
    let unique = [...new Set(checkTimeOut)];
    let unique1 = [...new Set(checkTimeIn)];
    const listTimeIn = unique1.map((e) => {
        return (
            <TimeIn e={e} callback={callback} date={props.date} />
        );
    })
    const listTimeOut = unique.map((e) => {
        return (
            <TimeOut e={e} callback={callback} date={props.date}/>
        );
    })
    const toggleVisible = () => {
        visible === false ? setVisible(true) : setVisible(false);
    }
    const format = 'HH:mm';
    const toggleCancel = () => {
        setVisible(false);
    }
    const [id, setId] = useState("");
    useEffect(() => {
        setId(localStorage.getItem("id"))
    },[])
    const excuteEdit = () => {
        const test={
            "reader": 0,
            "eventData": 55,
            "createBy": 1,
            "modifyBy": 1,
            "isDeleted": false,
            "dateTime": props.date+"T"+value
        }
        const actvity={
            "usr_ID":id,
            "activityName":`Create new timekeepings for employee with code ${props.e.employee_code} in ${props.date}`,
            "isdeleted":false,
        }
        TimekepingService.create(props.e.employee_code,test).then(res=>{
            setVisible(false);
            UserActivityService.add(actvity).then();
            props.call("");
            props.call("ddd");
        })
    }

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const { Option } = Select;
    const color = ["magenta", "purple", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue"];
    const makeColor = (a) => {
        for (let i = 0; i < color.length; i++) {
            if (a === i) {
                return (
                    <Tooltip title="Inside">
                        <Tag color={color[i]}>D{i}</Tag>
                    </Tooltip>

                )
            }
        }
    }
    const [value, setValue] = useState("12:00");
    const onChange = (time, timeString) => {
        setValue(timeString);
    }
    return (
        <tr>
            <td></td>
            <td>{props.e.employee_code}</td>
            <td>{props.e.fullname}</td>
            <td>{makeColor(props.e.dep_id)}</td>
            <td>{props.e.shift_name}</td>
            <td>

                {
                    listTimeIn
                }
                {
                    listTimeOut
                }

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
                                    defaultValue={moment(value, format)}
                                    format={format}
                                    style={{ width: 350 }}
                                    onChange={onChange}
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