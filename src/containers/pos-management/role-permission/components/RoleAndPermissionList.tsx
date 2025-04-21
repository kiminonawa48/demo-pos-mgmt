import ButtonAction from "@/components/Button/ButtonAction";
import TagStatus from "@/components/TagStatus";
import { Modal, Space, Table, TableProps } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

interface DataType {
  key: string;
  role_name: string;
  person: number;
  name: string;
  status: string;
}

// interface IPropRoleAndPermissionList {}

const RoleAndPermissionList = () => {
  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Role Name",
      dataIndex: "role_name",
      key: "role_name",
      render: (text) => <>{text}</>,
    },
    {
      title: "Person",
      dataIndex: "person",
      key: "person",
      render: (text) => <>{text}</>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text) => (
        <>
          <TagStatus text={text} type={text} />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <ButtonAction
            enableView
            onViewClick={() => {
              navigate("/admin/role-permission/1/update?mode=VIEW");
            }}
            enableEdit
            onEditClick={() => {
              navigate("/admin/role-permission/1/update?mode=Update");
            }}
            enableDelete
            onDeleteClick={() => {
              showConfirm();
            }}
          />
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      role_name: "SuperAdmin",
      person: 1,
      name: "User 1",
      status: "active",
    },
    {
      key: "2",
      role_name: "Employee",
      person: 20,
      name: "User 2",
      status: "cancel",
    },
  ];
  return <Table<DataType> columns={columns} dataSource={data} />;
};

export default RoleAndPermissionList;
