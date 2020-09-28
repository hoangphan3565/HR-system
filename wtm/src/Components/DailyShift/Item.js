import React from 'react';
import { Tag, Tooltip, Button, Modal, Form, Input, Select, DatePicker, notification, Popconfirm } from 'antd';
import { SolutionOutlined, DeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import ShiftService from '../../Services/ShiftService';
import DailyScheduleService from '../../Services/DailyScheduleService';
import ShiftDailyService from '../../Services/ShiftDailyService';
import UserActivityService from '../../Services/UserActivityService';
const Item = (props) => {
    const [visible, setVisible] = useState(false);
    const { Option } = Select;
    const [form] = Form.useForm();
    const dow = useRef("");
    const dsc = useRef("");
    const sh = useRef("");
    const [shift, setShift] = useState([]);
    const [dailyShift, setDailyShift] = useState([]);
    const [dailySchedule, setDailySchedule] = useState([]);
    useEffect(() => {
        ShiftService.list().then(res => {
            setShift(res.data)
        })
        DailyScheduleService.list().then(res => {
            setDailySchedule(res.data)
          
        })
    },[])
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const optionsShift = shift.map((e) => {
        return (
            <Option value={e.sif_ID}>{e.shiftName}</Option>
        );
    })

    const optionsDsc = dailySchedule.map((e) => {
        return (
            <Option value={e.dls_ID}>{e.name}</Option>
        );
    })
    useEffect(() => {
        form.setFieldsValue({
            DailySch:props.e.daily_schedule.dls_ID,
            Shift:props.e.shift.sif_ID,
            DOW:props.e.dayOfWeek
        });
    },)
    const toggleVisible = () => {
        setVisible(true);
    }
    const handleCancel = () => {
        setVisible(false)
    }
    const onFinish = () => {
        const args = {
            message: 'Updated Successfully',
            description:
                'A daily shift was  updated in Your System !',
            duration: 1,
        };
        const dailyshift={
            "dayOfWeek":Number(dow.current.props.value)
        };
        const actvity = {
            "usr_ID": 1,
            "activityName": `Updated daily shift with id ${props.e.sdl_ID}`,
            "isdeleted": false,
        }
        ShiftDailyService.update(props.e.sdl_ID,1,dailyshift).then(res=>{
            if(res.status===200){
                notification.success(args);
                UserActivityService.add(actvity).then();
                props.callBack("1");
                props.callBack("");
                setVisible(false);
            }
        })
        
    }
    const onDelete = () => {
        const args = {
            message: 'Deleted Successfully',
            description:
                'A daily shift was  deleted in Your System !',
            duration: 1,

        };
        const actvity = {
            "usr_ID": 1,
            "activityName": `Deleted daily shift with id ${props.e.sdl_ID}`,
            "isdeleted": false,
        }
        ShiftDailyService.dlte(props.e.sdl_ID,1).then(res=>{
            if(res.status===200){
                notification.success(args);
                UserActivityService.add(actvity).then();
                props.callBack("1")
                props.callBack("")
            }
        })
    }
    return (
        <tr>
            <td>{props.e.sdl_ID}</td>
            <td>{props.e.daily_schedule.name}</td>
            <td>{props.e.shift.shiftName}</td>
            <td>{props.e.dayOfWeek}</td>
            <td>
                <Tooltip title="Update!">
                    <Button
                        shape="circle"
                        icon={<SolutionOutlined />}
                        onClick={toggleVisible}
                        style={{ backgroundColor: "rgb(107, 189, 243)" }}
                    />
                    <Modal
                        visible={visible}
                        title="Employee Information"
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                          </Button>,
                            <Button key="submit" type="primary" onClick={onFinish}>
                                Update
                          </Button>
                        ]}
                    >
                        <Form {...layout} onFinish={onFinish} form={form} name="control-hooks">
                            <Form.Item label="Daily Schedule" name="DailySch">
                                <Select ref={dsc}>
                                    {
                                        optionsDsc
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Shift" name="Shift">
                                <Select ref={sh}>
                                    {
                                        optionsShift
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Day Of Week" name="DOW" >
                                <Input ref={dow} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Tooltip>
                <Tooltip title="Delete!">
                    <Popconfirm title="Are you sure to delete this employee!" placement="topRight" onConfirm={onDelete}>
                        <Button
                            shape="circle"
                            icon={<DeleteOutlined />}
                            style={{ backgroundColor: "rgb(236, 118, 82)" }}
                        />
                    </Popconfirm>
                </Tooltip>
            </td>
        </tr>
    );
}

export default Item;