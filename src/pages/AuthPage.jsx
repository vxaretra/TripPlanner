import LoginForm from "../components/LoginForm";
import { Col, Row, Typography } from "antd";
import useAuth from "../hooks/auth";
import { Navigate } from "react-router-dom";

const { Title } = Typography

export default function AuthPage() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <Row style={{ height: "100vh" }} align={"middle"}>
      <Col xs={4} lg={10}></Col>
      <Col xs={16} lg={4}>
        <Title style={{ textAlign: "center" }} level={3} >Sign in to your account</Title>
        <LoginForm />
      </Col>
      <Col xs={4} lg={10}></Col>
    </Row>
  );
}
