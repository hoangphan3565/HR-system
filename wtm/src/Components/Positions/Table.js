import React, { useState, useEffect, useRef } from "react";
import {
  Tooltip,
  Button,
  Select,
  Input,
  Popconfirm,
  Form,
  Modal,
  notification,
  Pagination
} from "antd";
import {
  VerticalAlignBottomOutlined,
  SubnodeOutlined
} from "@ant-design/icons";
import Item from "./Item";
import PositionServices from "../../Services/PositionServices";

const Table = (props) => {
  const { Option } = Select;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const [positions, setPositions] = useState([]);
  const [message, setMessage] = useState("");
  const name = useRef();
  const search = useRef();
  const { Search } = Input;
  const [link, setLink] = useState("");
  const [temp, setTemp] = useState([]);
  const [form] = Form.useForm();
  console.log(message);
  useEffect(() => {
    const test1 = [];
    if (link !== "") {
      var fla = 0;
      for (var i = 0; i < temp.length; i++) {
        if (Number(link) === temp[i].pos_ID) {
          PositionServices.get(link).then((res) => {
            test1.push(res.data);
            setPositions(test1);
          });
          fla = 1;
          break;
        }
      }
      if (fla == 0) {
        setPositions([]);
      }
    } else {
      PositionServices.list().then((res) => {
        setPositions(res.data);
      });
    }
    refresh();
  }, [link]);

  useEffect(() => {
    PositionServices.get(link).then((res) => {
      setTemp(res.data);
    });
  }, []);

  const callback = (a) => {
    setLink(a);
  };
  const onShowSizeChange = (current, pageSize) => {
    setPerPage(pageSize);
  }
  const refresh = () => {
    setMessage("");
  };
  const pageNumbers = [];
  for (var i = 1; i <= Math.ceil(positions.length / perPage); i++) {
    pageNumbers.push(i);
  }
  const current = (a) => {
    setCurrentPage(a);
  };
  const test = (a) => {
    setLink(a);
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
  const position = currentDept.map((e, index) => {
    return <Item e={e} key={index} test={callback} />;
  });
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const onFinish = () => {
    const position = {
      "positionName": name.current.props.value,
      "isDeleted": false
    };
    const args = {
      message: "Created Successfully",
      description: "An new position was added in Your System!",
      duration: 1
    };
    PositionServices.add(1, position).then((res) => {
      if (res.status === 200) {
        setAddModal(false);
        setLink("1");
        setLink("");
        form.resetFields();
        notification.success(args)
      }
    });
  };
  const [addModal, setAddModal] = useState(false);
  const toggleModal = () => {
    addModal === false ? setAddModal(true) : setAddModal(false);
  };
  const handleCancel = () => {
    setAddModal(false);
  };

  const handleChange = (value) => {
    setHook(value);
  };
  const [hook, setHook] = useState([]);
  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col-sm-4">
                <h5>Position:</h5>
                <Search
                  placeholder="Search..."
                  onSearch={(value) => test(value)}
                  style={{ width: 250 }}
                  size="middle"
                  allowClear
                  ref={search}
                />
              </div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <Tooltip placement="topRight" title="Export excel !">
                  <Popconfirm title="Do you export to excel!">
                    <Button
                      icon={<VerticalAlignBottomOutlined />}
                      type="primary"
                      id="exportdept"
                      style={{ float: "right", marginLeft: 15 }}
                    >
                      Export
                    </Button>
                  </Popconfirm>
                </Tooltip>
                <Tooltip placement="topRight" title="Create!">
                  <Button
                    icon={<SubnodeOutlined />}
                    type="primary"
                    id="addept"
                    onClick={toggleModal}
                    style={{ float: "right" }}
                  >
                    Create
                  </Button>
                </Tooltip>
                <Modal
                  visible={addModal}
                  title="Create Position"
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onFinish}>
                      Create
                    </Button>,
                  ]}
                >
                  <Form {...layout} form={form}>
                    <Form.Item
                      label="Name"
                      name="deptName"
                      rules={[{ required: true }]}
                      hasFeedback
                    >
                      <Input size="middle" ref={name} />
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
                    <th>ID</th>
                    <th>Position Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{position}</tbody>
              </table>
              <Pagination
                showSizeChanger
                current={currentPage}
                onShowSizeChange={onShowSizeChange}
                onChange={onChange}
                total={positions.length}
                showQuickJumper
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Table;
