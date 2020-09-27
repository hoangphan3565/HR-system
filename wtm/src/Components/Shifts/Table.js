import React, { useState, useEffect, useRef } from "react";
import {
  Tooltip,
  Button,
  Input,
  Popconfirm,
  Form,
  Modal,
  notification,
} from "antd";
import {
  VerticalAlignBottomOutlined,
  BankOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Item from "./Item";
import ShiftService from "../../Services/ShiftService";
const Table = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const [sif, setShift] = useState([]);
  const [message, setMessage] = useState("");
  const name = useRef();
  const code = useRef();
  const search = useRef();
  const { Search } = Input;

  const [link, setLink] = useState("");
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    const test1 = [];
    if (link !== "") {
      var fla = 0;
      for (var i = 0; i < temp.length; i++) {
        console.log(link);
        if (Number(link) === temp[i].sif_ID) {
          ShiftService.get(link).then((res) => {
            test1.push(res.data);
            setShift(test1);
          });
          fla = 1;
          break;
        }
      }
      if (fla == 0) {
        setShift([]);
      }
    } else {
      ShiftService.list().then((res) => {
        setShift(res.data);
      });
    }
    refresh();
  }, [link]);

  useEffect(() => {
    ShiftService.get(link).then((res) => {
      setTemp(res.data);
    });
  }, []);

  const callback = (a) => {
    setLink(a);
  };
  const refresh = () => {
    setMessage("");
  };
  const pageNumbers = [];
  for (var i = 1; i <= Math.ceil(sif.length / perPage); i++) {
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
  const currentShift = sif.slice(indexOfFirst, indexOfLast);
  const shift = currentShift.map((e, index) => {
    return <Item e={e} key={index} test={callback} />;
  });

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const onFinish = () => {
    const shift = {
      shiftCode: code.current.props.value,
      shiftName: name.current.props.value,
    };
    const args = {
      message: "Created Successfully",
      description: "An new shift was added in Your System !",
      duration: 1,
      icon: <UserAddOutlined />,
    };
    ShiftService.add(shift).then((res) => {
      setAddModal(false);
      setLink("1");
      setLink("");
    }, notification.open(args));
    setMessage("added");
  };
  const [addModal, setAddModal] = useState(false);
  const toggleModal = () => {
    addModal === false ? setAddModal(true) : setAddModal(false);
  };
  const handleCancel = () => {
    setAddModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col-sm-4">
                <h5>Shifts:</h5>
                <Search
                  placeholder="Input id "
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
                    icon={<BankOutlined />}
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
                  title="Create Shift"
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
                  <Form {...layout}>
                    <Form.Item
                      label="Shift Code"
                      name="shiftCode"
                      rules={[{ required: true }]}
                      hasFeedback
                    >
                      <Input size="middle" ref={code} />
                    </Form.Item>
                    <Form.Item
                      label="Shift Name"
                      name="shiftName"
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
                    <th>Id</th>
                    <th>Shift Code</th>
                    <th>Shift Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{shift}</tbody>
              </table>
            </div>
          </div>
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1">
                Previous
              </a>
            </li>
            {showpage}
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
};

export default Table;
