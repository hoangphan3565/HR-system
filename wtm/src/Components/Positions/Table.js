import React, { useState, useEffect,useRef } from 'react';
import { Tooltip, Row, Col, Button, Select, Input, Popconfirm, Form, Modal, DatePicker, notification } from "antd";
import { VerticalAlignBottomOutlined, BankOutlined } from "@ant-design/icons";
import Item from './Item';
import PositionServices from '../../Services/PositionServices';
const Table = (props) => {
    const { Option } = Select;
    const { Search } = Input;
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(8);
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const [modal, setModal] = useState(false);
    const [positions, setPositions] = useState([]);
    const [message, setMessage] = useState();
    const name=useRef();
    useEffect(() => {
        PositionServices.list().then(res => {
            //console.log(res.headers);
            setPositions(res.data);
        })
        refresh(); 
    },[message])
    //console.log(positions.length);
    const callback = (a) => {
        setMessage(a);
      
      };
    const refresh=()=>{
        setMessage("");
    }
    const pageNumbers = [];
    for (var i = 1; i <= Math.ceil(positions.length / perPage); i++) {
        pageNumbers.push(i);
    }
    const current = (a) => {
        setCurrentPage(a);
    };

    const showpage = pageNumbers.map((page, index) => {
        return (
            <Tooltip title={index + 1} key={index}>
                <li className="page-item">
                    <a className="page-link" onClick={() => current(index + 1)}>
                        {page}
                    </a>
                </li>
            </Tooltip>
        );
    });
    const currentDept = positions.slice(indexOfFirst, indexOfLast);
    const employee1 = currentDept.map((e, index) => {
        return (
            <Item e={e} key={index} test={callback}/>
        );
    })

   
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const onFinish = () => {
       const position={
           positionName:name.current.props.value
       }
       PositionServices.add(position).then(res=>{
          //console.log(res.status);
       })
    }
    const toggleModal = () => {
        setModal(true);
    }
    const handleCancel = () => {
        setModal(false);
    }


    const handleChange = (value) => {
        setHook(value);
    }
    const [hook, setHook] = useState([]);
    return (
        <div>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-sm-4">
                            </div>
                            <div className="col-sm-4">
                            </div>
                            <div className="col-sm-4">
                                <Tooltip placement="topRight" title="Export excel !">
                                    <Popconfirm title="Do you export to excel!">
                                        <Button icon={<VerticalAlignBottomOutlined />} type="primary" id="exportdept" style={{float:"right",marginLeft:15}}>
                                            Export
                                    </Button>
                                    </Popconfirm>
                                </Tooltip>
                                <Tooltip placement="topRight" title="Create!">
                                    <Button icon={<BankOutlined />} type="primary" id="addept" onClick={toggleModal} style={{float:"right"}}>
                                        Create
                            </Button>
                                </Tooltip>
                                <Modal
                                    visible={modal}
                                    title="Create Position"
                                    onCancel={handleCancel}
                                    footer={[
                                        <Button key="back" onClick={handleCancel}>
                                            Cancel
                      </Button>,
                                        <Button key="submit" type="primary" onClick={onFinish}>
                                            Create
                      </Button>
                                    ]}
                                >
                                    <Form {...layout}>
                                        <Form.Item
                                            label="Name"
                                            name="deptName"
                                            rules={[{ required: true }]}
                                            hasFeedback>
                                            <Input size="middle" ref={name}/>
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
                                        <th>Id</th>
                                        <th>Position Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employee1
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">
                                Previous
    </a>
                        </li>
                       {
                           showpage
                       }
                        <Tooltip title="Next :)">
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    Next
      </a>
                            </li>
                        </Tooltip>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Table;