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

const EditableTable = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      bookingNr: "",
      city: "",
      inl_terminal: "",
      truckId: "",
      deliveryDeadline: "",
      processTime: "",
      drivingTime: "",
      serviceTime: "",
      closing: "",
      container: "",
      date: "",
      delay: "",
      gate: "",
      gate1: "",
      gross: "",
      inl_ter_1: "",
      invoice_reference: "",
      l_d: "",
      max_departure: "",
      pickup: "",
      seal: "",
      status: "",
      ship_comp: "",
      tariff_type: "",
      terminal1: "",
      time: "",
      time1: "",
      time2: "",
      time3: "",
      truck1: "",
      truck2: "",
      truck_used: "",
      unit_type: "",
      voyage_inland_carrier: "",
      weight: "",
      departure_time: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const editAccount = (order_id, Data) => {
    console.log(Data);
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
        editAccount(key, newData[index]);
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
export default EditableTable;
