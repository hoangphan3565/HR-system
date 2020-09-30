import React, { useState } from 'react';
import { Tooltip, Radio, Button, Select, Input, Popconfirm, DatePicker, BackTop, Empty, Spin } from "antd";
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import './css/styles.css';
import Item from './Item';
import { useEffect } from 'react';
import TimekepingService from '../../Services/TimekepingService';
import DepartmentService from '../../Services/DepartmentService';
import { useRef } from 'react';
const Table = (props) => {
    const { Option } = Select;
    const { Search } = Input;
    const [depting, setDepting] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [start, setStartDate] = useState("");
    const datekeeping = useRef();
    const [id, setId] = useState("");
    const [timekeepings, setTimekeepings] = useState([]);
    const [test1, setTest] = useState();
    const [department, setDepartment] = useState([]);
    const [root, setRoot] = useState("");
    const calla = (q) => {
        setRoot(q)
    }
    useEffect(() => {
        DepartmentService.list().then(res => {
            setDepartment(res.data);
        })
    }, [])
    const deptOptions = [];
    for (let i = 0; i < department.length; i++) {
        deptOptions.push(department[i].dep_ID)
    }
    const optionsDept = deptOptions.map((e) => {
        return (
            <Option value={e}>Department 0{e}</Option>
        );
    })
    const a=[];
    for (var i = 0; i < timekeepings.length; i++) {
        if (a.some(e => e.fullname === timekeepings[i].fullname && e.shift_name == timekeepings[i].shift_name && e.employee_code === timekeepings[i].employee_code && e.dep_id === timekeepings[i].dep_id)) {
            i++;
        }
        else {
            a.push(timekeepings[i]);
        }
    }

    for (let j = 0; j < a.length; j++) {
        for (let k = 0; k < timekeepings.filter(e => e.fullname === a[j].fullname).length; k++) {
            if (a[j].tkp_id !== timekeepings.filter(e => e.fullname === a[j].fullname)[k].tkp_id 
            && a[j].dep_id === timekeepings.filter(e => e.fullname === a[j].fullname)[k].dep_id
            &&a[j].checktime!== timekeepings.filter(e => e.fullname === a[j].fullname)[k].checktime
            ) {
                const ax = timekeepings.filter(e => e.fullname === a[j].fullname)[k].checktime;
                const bx = timekeepings.filter(e => e.fullname === a[j].fullname)[k].type;
                const cx = timekeepings.filter(e => e.fullname === a[j].fullname)[k].tkp_id;
                const dx = timekeepings.filter(e => e.fullname === a[j].fullname)[k].shift_name;
                a[j].checktime += " " + ax;
                a[j].type += " " + bx;
                a[j].tkp_id += " " + (cx).toString();
                a[j].shift_name = " " + dx;
                //console.log(a[j].time);
            }
        }
    }
    const timekeeping = a.map((e, index) => {
        return (
            <Item e={e} key={index} call={calla} date={test1}/>
        );
    })
    const onSync = () => {
     
        TimekepingService.sync(start).then(res=>{});
        setTest(start);
    }
    useEffect(() => {
        if (root === "" && test1 !== "") {
            TimekepingService.findByDept(test1, depting).then(res => {
                setTimekeepings(res.data);

            })
        }
    }, [depting])

    useEffect(() => {
        if (depting === "" && test1 !== "") {
            TimekepingService.list(test1).then(res => {
                setTimekeepings(res.data);
                setRoot("");
            })
        }
        if (depting !== "" && test1 !== "") {
            TimekepingService.findByDept(test1, depting).then(res => {
                setTimekeepings(res.data);
                setRoot("");
            })
        }
    }, [root])

    useEffect(() => {
        if (depting === "" && root === "") {
            TimekepingService.list(test1).then(res => {
                setTimekeepings(res.data);

            })
        }
        if (depting === "" && root !== "") {
            TimekepingService.list(test1).then(res => {
                setTimekeepings(res.data);
                setRoot("");
            })
        }
        if (depting !== "" && root === "") {
            TimekepingService.findByDept(test1, depting).then(res => {
                setTimekeepings(res.data);

            })
        }
        if (depting !== "" && root !== "") {
            TimekepingService.findByDept(test1, depting).then(res => {
                setTimekeepings(res.data);
                setRoot("");
            })
        }
    }, [test1])
    const handleDatePickerChange = (date, dateString) => {
        setStartDate(dateString);
        setTimekeepings("");
    }
    const getDepartment = (a) => {
        setDepting(a);
    }
    const getTKPByID = (a) => {
        setId(a);
    }
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-8" style={{ display: "inline", marginBottom: "2%" }}>
                    <h4>TimeKeeping</h4>
                    <DatePicker
                        size="middle"
                        style={{ width: 350 }}
                        onChange={(date, dateString) => handleDatePickerChange(date, dateString)}
                        ref={datekeeping} />
                    <Button type="ghost" onClick={onSync}>Excute</Button>
                </div>
                <div className="col-md-4">

                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <Select
                                showArrow
                                placeholder="Select A Department"
                                size="middle"
                                style={{ width: 325 }}
                                onChange={getDepartment}
                            >
                                {
                                    optionsDept
                                }
                            </Select>
                        </div>
                        <div className="col-md-4">
                            <Search
                                placeholder="Search..."
                                onSearch={value => getTKPByID(value)}
                                style={{ width: 325 }}
                                size="middle"
                                allowClear
                            />
                        </div>
                        <div className="col-md-4">
                            <Tooltip placement="topRight" title="Export!">
                                <Popconfirm title="Do you export to excel!" placement="bottomLeft">
                                    <Button
                                        icon={<VerticalAlignBottomOutlined />}
                                        type="primary"
                                        style={{ float: "right" }}>
                                        Export
                                </Button>
                                </Popconfirm>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row" style={{ marginBottom: "2%" }}>
                        <div className="col-md-2"></div>
                        <div className="col-md-8" style={{ textAlign: "center" }}>
                            <Radio.Group>
                                <Radio value={1} style={{ color: "blue" }}>All</Radio>
                                <Radio value={2} style={{ color: "green" }}>Valid</Radio>
                                <Radio value={3} style={{ color: "purple" }}>Empty</Radio>
                                <Radio value={4} style={{ color: "orange" }}>Missing</Radio>
                            </Radio.Group>
                        </div>
                        <div className="col-md-2"></div>
                    </div>

                    <div className="table-responsive-md">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Employee Code</th>
                                    <th>Full Name</th>
                                    <th>Department</th>
                                    <th>Working Shift</th>
                                    <th>Working Hour</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timekeeping.length !== 0 ? timekeeping : <Empty />}
                            </tbody>
                        </table>
                        {/*
                            <Pagination
                            showSizeChanger
                            current={currentPage}
                            onShowSizeChange={onShowSizeChange}
                            onChange={onChange}
                            total={a.length}
                            showQuickJumper
                        />
                        */
                        }

                    </div>
                    <BackTop>
                        <Button shape="circle" style={{ backgroundColor: "rgba(0,0,0,0.85)", color: "white", opacity: 0.4 }} icon={<VerticalAlignTopOutlined />}></Button>
                    </BackTop>
                </div>
            </div>
        </div>
    );
}

export default Table;