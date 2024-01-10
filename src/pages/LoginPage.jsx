import LoginForm from "../components/LoginForm";
import { Col, Row } from "antd";
import useAuth from "../hooks/auth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <Row style={{ height: "100vh" }} align={"middle"} justify={"center"}>
      <Col xs={20} lg={6}>
        <LoginForm />
      </Col>
    </Row>
  );
}
