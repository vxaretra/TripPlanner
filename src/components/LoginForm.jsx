import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "antd";
import { Typography } from "antd";
import { auth } from "../lib/firebase/firebase";

const { Title } = Typography

export default function LoginForm() {
  const [form] = Form.useForm();
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(values) {
    try {
      setIsSubmitting(true)
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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Title style={{ textAlign: "center", marginBottom: "1.2em" }} level={2} >Sign in to your account</Title>
      <Form name="login_form" layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { required: true, message: "Please fill your email" },
            { type: "email", message: "Invalid email input" },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item 
        label="Password"
          name="password"
          rules={[
            { required: true, message: "Please fill your password" },
          ]}
        >
          <Input prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} disabled={isSubmitting}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      {message === null ? "" : <Alert style={{ textAlign: "center" }} message={message} type="error" />}
    </>
  );
}
