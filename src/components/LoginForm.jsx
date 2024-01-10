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
    </>
  );
}
