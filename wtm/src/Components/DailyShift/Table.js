import React from 'react';
import { Tooltip, Row, Col, Button, Select, Input, Popconfirm, Form, Modal, DatePicker, notification, Pagination } from "antd";
import { VerticalAlignBottomOutlined, UsergroupAddOutlined, UserAddOutlined } from "@ant-design/icons";
import { useEffect } from 'react';
import ShiftDailyService from '../../Services/ShiftDailyService';
import ShiftService from '../../Services/ShiftService';
import DailyScheduleService from '../../Services/DailyScheduleService';
import UserActivityService from '../../Services/UserActivityService';
import { useState } from 'react';
import Item from './Item';
import { useRef } from 'react';
const Table = (props) => {
    const { Search } = Input;
    const [dailyShift, setDailyShift] = useState([]);
    const [dailySchedule, setDailySchedule] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [shift, setShift] = useState([]);
    const [fla, setFla] = useState("");
    const [form] = Form.useForm();
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const callBack = (a) => {
        setFla(a);
    }
    const { Option } = Select;
    const dow = useRef("");
    const dsc = useRef("");
    const sh = useRef("");
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const [modal, setModal] = useState(false);
    useEffect(() => {
        ShiftDailyService.get().then(res => {
            setDailyShift(res.data);
        })
    }, [fla])
    useEffect(() => {
        ShiftService.list().then(res => {
            setShift(res.data)
        })
        DailyScheduleService.list().then(res => {
            setDailySchedule(res.data)
        })
    }, [])

    const handleCancel = () => {
        setModal(false)
    }
    const [id, setId] = useState("");
    useEffect(() => {
        setId(localStorage.getItem("id"))
    }, [])
    const toggleModal = () => {
        setModal(true);
    }
    const onFinish = () => {
        const args = {
            message: 'Created Successfully',
            description:
                'A new daily shift was  created in Your System !',
            duration: 1,

        };
        const args1 = {
            message: 'Created Unsuccessfully',
            description:
                'Something`s wrong !',
            duration: 1,

        };
        const dls = {
            "dayOfWeek": Number(dow.current.props.value),
            "isDeleted": false
        }
        const actvity = {
            "usr_ID": id,
            "activityName": `Create new DailyShift by Daily Schedule with name ${dsc.current.props.value}`,
            "isdeleted": false,
        }
        ShiftDailyService.add(dsc.current.props.value, sh.current.props.value, 1, dls).then(res => {
            if (res.status === 200) {
                setModal(false);
                setFla("");
                setFla("1");
                notification.success(args);
                form.resetFields();
                UserActivityService.add(actvity).then();
            }
            else {
                notification.error(args1)
            }
        })
    }

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
    const onShowSizeChange = (current, pageSize) => {
        setPerPage(pageSize);

    }
    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const currentDls = dailyShift.slice(indexOfFirst, indexOfLast);
    const dailyShifts = currentDls.map((e) => {
        return (
            <Item e={e} callBack={callBack} />
        );
    })
    return (
        <div className="container">
            <h5>Daily Shifts</h5>
            <div className="card">
                <div className="card-header">
                    <div className="row align-items-center">
                        <div className="col-sm-4">
                            <Search
                                placeholder="Input department name"
                                onSearch={value => console.log(value)}
                                style={{ width: 250 }}
                                size="middle"
                            />
                        </div>
                        <div className="col-sm-4">

                        </div>
                        <div className="col-sm-4">
                            <Tooltip placement="topRight" title="Export!">
                                <Popconfirm title="Do you export to excel!">
                                    <Button icon={<VerticalAlignBottomOutlined />} type="primary" id="exportdept" style={{ float: "right", marginLeft: 15 }}>
                                        Export
                                </Button>
                                </Popconfirm>
                            </Tooltip>
                            <Tooltip placement="topRight" title="Add!">
                                <Button
                                    id="btnaddempl"
                                    icon={<UserAddOutlined />}
                                    type="primary"
                                    onClick={toggleModal}
                                    style={{ float: "right" }}>Create</Button>
                            </Tooltip>
                            <Modal
                                visible={modal}
                                onCancel={handleCancel}
                                title="Create DailyShift"
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Cancel
                     </Button>,
                                    <Button key="submit" type="primary" htmlType="submit" onClick={onFinish} style={{ float: "right" }}>
                                        Create
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
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive-md">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>DailyShift ID</th>
                                    <th>DailySchedule Name</th>
                                    <th>Shift Name</th>
                                    <th>Day Of Week</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dailyShifts
                                }
                            </tbody>
                        </table>
                        <Pagination

                            showSizeChanger
                            current={currentPage}
                            onShowSizeChange={onShowSizeChange}
                            onChange={onChange}
                            total={dailyShift.length}
                            showQuickJumper
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Table;