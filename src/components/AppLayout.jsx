import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/auth";

const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        zeroWidthTriggerStyle={{ top: 14 }}
      >
        Sider
      </Sider>
      <Layout>
        <Header style={{ background: "#ffffff" }}>Header</Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "200vh",
              backgroundColor: "#ffffff",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
