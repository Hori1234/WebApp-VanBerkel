"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _axios = _interopRequireDefault(require("axios"));

var _icons = require("@ant-design/icons");

require("antd/dist/antd.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Text,
  Title
} = _antd.Typography;
const {
  Option
} = _antd.Select;

class CreateAccountsComponent extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "addAccount", async (vUsername, vPassword, vRole) => {
      return _axios.default.post("/api/auth/user", {
        username: vUsername,
        password: vPassword,
        role: vRole
      }).then(res => {
        this.setState(state => _objectSpread(_objectSpread({}, state), {}, {
          rUsername: res.username,
          rRole: res.role,
          status: "success"
        }));
        return true;
      }).catch(error => {
        this.setState(state => _objectSpread(_objectSpread({}, state), {}, {
          status: "error",
          error: error
        }));
        return false;
      });
    });

    _defineProperty(this, "handleChangeUsername", event => {
      this.setState({
        username: event.target.value
      });
    });

    _defineProperty(this, "handleChangePassword", event => {
      this.setState({
        password: event.target.value
      });
    });

    _defineProperty(this, "handleChangeRole", value => {
      this.setState({
        role: value
      });
    });

    _defineProperty(this, "onFinish", values => {
      console.log(values);
    });

    _defineProperty(this, "onFinishFailed", errorInfo => {
      _antd.message.error("Failed: Please complete all the required fields", errorInfo);

      this.setState({
        status: "error"
      });
    });

    this.state = {
      role: "",
      username: "",
      password: "",
      rUsername: "",
      rRole: "",
      status: ""
    };
  }

  render() {
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };
    /* eslint no-template-curly-in-string: "off" */

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not validate email!",
        number: "${label} is not a validate number!"
      },
      number: {
        range: "${label} must be between ${min} and ${max}"
      }
    };
    return /*#__PURE__*/_react.default.createElement(_antd.Layout, {
      style: {
        alignItems: "center",
        width: "70vh",
        height: "50vh",
        backgroundColor: "white"
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Layout, {
      style: {
        flexDirection: "row",
        backgroundColor: "white"
      }
    }, /*#__PURE__*/_react.default.createElement(_icons.UserAddOutlined, {
      style: {
        fontSize: 50
      }
    }), /*#__PURE__*/_react.default.createElement(_antd.Layout, {
      style: {
        backgroundColor: "white"
      }
    }, /*#__PURE__*/_react.default.createElement(Title, {
      style: {
        fontSize: 16
      }
    }, "Welcome "), /*#__PURE__*/_react.default.createElement(Text, {
      style: {
        fontSize: 14
      }
    }, "Complete the following form in order to add a new user. Every field is required to be filled."))), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
      style: {
        backgroundColor: "white"
      }
    }), /*#__PURE__*/_react.default.createElement(_antd.Layout, {
      style: {
        backgroundColor: "white"
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Form, _extends({}, layout, {
      name: "nest-messages",
      onFinish: this.onFinish,
      onFinishFailed: this.onFinishFailed,
      validateMessages: validateMessages,
      style: {
        width: "60vh",
        marginRight: 50
      }
    }), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
      name: ["user", "name"],
      label: "Name",
      rules: [{
        required: true
      }]
    }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
      value: this.state.username,
      onChange: this.handleChangeUsername
    })), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
      name: ["user", "password"],
      label: "password",
      rules: [{
        required: true
      }]
    }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
      value: this.state.password,
      onChange: this.handleChangePassword
    })), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
      name: ["user", "role"],
      label: "Role",
      rules: [{
        type: "string",
        min: 0,
        max: 99,
        required: true
      }]
    }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      placeholder: "Select an option",
      onChange: this.handleChangeRole,
      allowClear: true
    }, /*#__PURE__*/_react.default.createElement(Option, {
      value: "administrator"
    }, "Administrator"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "view-only"
    }, "View Only"), /*#__PURE__*/_react.default.createElement(Option, {
      value: "planner"
    }, "Planner"))), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
      name: ["user", "introduction"],
      label: "Introduction"
    }, /*#__PURE__*/_react.default.createElement(_antd.Input.TextArea, null)), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
      wrapperCol: _objectSpread(_objectSpread({}, layout.wrapperCol), {}, {
        offset: 8
      })
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "primary",
      htmlType: "submit",
      onClick: () => {
        if (this.state.username !== "" && this.state.password !== "" && this.state.role !== "") {
          this.addAccount(this.state.username, this.state.password, this.state.role);
          this.props.modalHandleOk();
          window.location.reload(false);

          _antd.message.success("Account created !");
        }
      }
    }, "Submit")))));
  }

}