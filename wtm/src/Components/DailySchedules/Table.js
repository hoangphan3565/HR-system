import React, { useState, useEffect, useRef } from "react";
import {
  Tooltip,
  Pagination,
  Button,
  Select,
  Input,
  Popconfirm,
  Form,
  Modal,
  TimePicker,
  notification,
} from "antd";
import {
  VerticalAlignBottomOutlined,
  SubnodeOutlined
} from "@ant-design/icons";
import Item from "./Item";
import moment from "moment";
import DailyScheduleService from "../../Services/DailyScheduleService";
import UserActivityService from '../../Services/UserActivityService';
const Table = (props) => {
  const { Option } = Select;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const [dailysche, setDailySchedule] = useState([]);
  const name = useRef();
  const search = useRef();
  const { Search } = Input;
  const [link, setLink] = useState("");
  const [temp, setTemp] = useState([]);
  const [start, setStartTime] = useState("12:00:00");
  const [end, setEndTime] = useState("12:00:00");
  useEffect(() => {
    const test1 = [];
    if (link !== "") {
      var fla = 0;
      for (var i = 0; i < temp.length; i++) {
        if (Number(link) === temp[i].dls_ID) {
          DailyScheduleService.get(link).then((res) => {
            test1.push(res.data);
            setDailySchedule(test1);
          });
          fla = 1;
          break;
        }
      }
      if (fla == 0) {
        setDailySchedule([]);
      }
    } else {
      DailyScheduleService.list().then((res) => {
        setDailySchedule(res.data);
      });
    }
  }, [link]);

  useEffect(() => {
    DailyScheduleService.get(link).then((res) => {
      setTemp(res.data);
    });
  }, []);

  const callback = (a) => {
    setLink(a);
  };
  const pageNumbers = [];
  for (var i = 1; i <= Math.ceil(dailysche.length / perPage); i++) {
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
  const currentDept = dailysche.slice(indexOfFirst, indexOfLast);
  const dailyschedule = currentDept.map((e, index) => {
    return <Item e={e} key={index} test={callback} />;
  });
  const [id, setId] = useState("");
  useEffect(() => {
    setId(localStorage.getItem("id"))
  },[])
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const onFinish = () => {
    const dailyschedule = {
      "name": name.current.props.value,
      "startTime": start,
      "endTime": end,
      "isdeleted": false
    };
    const actvity = {
      "usr_ID": id,
      "activityName": `Created new daily schedule with name ${dailyschedule.name}`,
      "isdeleted": false,
    };
    const args = {
      message: "Created Successfully",
      description: "An new daily schedule was added in Your System !",
      duration: 1
    };
    DailyScheduleService.add(dailyschedule).then((res) => {
      if (res.status === 200) {
        setAddModal(false);
        setLink("dome");
        setLink("");      
        form.resetFields();
        UserActivityService.add(actvity).then();
        notification.success(args);
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
  const onChangeStart = (time, timeString) => {
    setStartTime(timeString);
  };
  const onChangeEnd = (time, timeString) => {
    setEndTime(timeString);
  };
  const onShowSizeChange = (current, pageSize) => {
    setPerPage(pageSize);
  }
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const format = "HH:mm:ss";
  return (
    <div>
      <div className="container">
        <h5>Daily Schedules</h5>
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col-sm-4">
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
                    icon={<SubnodeOutlined/>}
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
                  title="Create DailySchedule"
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
                      name="Name"
                      rules={[{ required: true }]}
                      hasFeedback
                    >
                      <Input size="middle" ref={name} />
                    </Form.Item>
                    <Form.Item label="Start Time">
                      <TimePicker
                        defaultValue={moment(start, format)}
                        format={format}
                        onChange={onChangeStart}
                        style={{ width: 354 }}
                      />
                    </Form.Item>

                    <Form.Item label="End Time">
                      <TimePicker
                        defaultValue={moment(end, format)}
                        format={format}
                        onChange={onChangeEnd}
                        style={{ width: 354 }}
                      />
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
                    <th>Daily Schedule Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{dailyschedule}</tbody>
              </table>
              <Pagination
                showSizeChanger
                current={currentPage}
                onShowSizeChange={onShowSizeChange}
                onChange={onChange}
                total={dailysche.length}
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
