import RoleAndPermissionList from "./components/RoleAndPermissionList";
import { Card } from "antd";

const RoleAndPermissionManagementContainer = () => {
  return (
    <>
      <Card
        title="Role and permission management"
        bodyStyle={{ padding: 0, margin: 0 }}
      >
        <RoleAndPermissionList />
      </Card>
    </>
  );
};

export default RoleAndPermissionManagementContainer;
