import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import { useState } from "react";

export default function LoginForm() {
  const [form] = Form.useForm();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(values) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          setMessage("Please check your email and password and try again");
          break;
        default:
          setMessage("Something wrong with the server, please try again later");
          break;
      }
    }
  }

  return (
    <>
      <Form name="login_form" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please fill your email" },
            { type: "email", message: "Invalid email input" },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item 
          name="password"
          rules={[
            { required: true, message: "Please fill your password" },
          ]}
        >
          <Input prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      {message === null ? "" : <Alert style={{ textAlign: "center" }} message={message} type="error" />}
    </>
  );
}
