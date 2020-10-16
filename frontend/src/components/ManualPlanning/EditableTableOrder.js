import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, message } from "antd";
import axios from "axios";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTableOrder = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      "Container": "",
      "Unit type": "",
      "Booking": "",
      "Ship. comp.": "",
      "Terminal": "",
      "Truck": "",
      "Pickup": "",
      "order_number": "",
      "Status": "",
      "inl_terminal": "",
      "Gate": "",
      "Time": "",
      "Max. departure": "",
      "Time (1)": "",
      "latest_dep_time": "",
      "Truck Used": "",
      "truck_type": "",
      "hierarchy" : "",
      "City": "",
      "L/D": "",
      "Date": "",
      "Time (2)": "",
      "delivery_deadline": "",
      "driving_time": "",
      "process_time": "",
      "service_time": "",
      "Reference": "",
      "Truck (1)": "",
      "Gate (1)": "",
      "Time (3)": "",     
      "Inl. ter. (1)": "",
      "Gross (kgs)": "",
      "Temperature °C": "",
      "Seal": "",
      "Truck (2)": "",
      "Voyage/inland carrier": "",
      "Terminal (1)": "",
      "Closing": "",
      "POD": "",
      "Invoice reference": "",
      "Tariff type": "",
      "G": "",
      "F": "",
      "Positie": "",
      "Delay": "",
      "Weight": "",
      "departure_time": "",  
      "truck_id": "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const editAccount = (order_id, Data) => {
    return axios
      .patch(`/api/orders/${order_id}`, Data)
      .then((res) => {
        if (res.status === 200) {
          message.success("Order updated succesfully");
        } else {
          if (res.status === 401) {
            message.error("Bad request: " + res.message);
          } else {
            if (res.status === 404) {
              message.error("Not Found: " + res.message);
            } else {
              if (res.status === 422) {
                message.error("Unprocessable Entity: " + res.message);
              } else {
                if (res.satatus === 503) {
                  message.warning("Server not Found: " + res.message);
                } else {
                  message.error(res.message);
                }
              }
            }
          }
        }
        return true;
      })
      .catch((error) => {
        message.error("An error hsa occured");
        return false;
      });
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...props.dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        props.setData(newData);
        setEditingKey("");
        let dataToSend = {};
        for (var val of Object.keys(newData[index])) {
          if(val !="service_time" && val !="order_number" && val !="latest_dep_time" && val != "key"){
            dataToSend[val] = newData[index][val];
          }
        }
        editAccount(key, dataToSend);
      } else {
        newData.push(row);
        props.setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columnsOrder = [
    ...props.columns,
    {
      title: "Edit Row",
      dataIndex: "editRow",
      fixed: "right",
      width: 110,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm
              title="Are you sure you want to cancel?"
              onConfirm={cancel}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  const mergedColumns = columnsOrder.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered={true}
        rowSelection={props.rowSelection}
        dataSource={props.dataSource}
        columns={mergedColumns}
        scroll={{ x: "max-content", y: "50vh" }}
        pagination={{
          onChange: cancel,
        }}
        rowClassName="editable-row"
        onRow={props.onRow}
      />
    </Form>
  );
};
export default EditableTableOrder;
