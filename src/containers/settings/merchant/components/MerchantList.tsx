import ButtonAction from "@/components/Button/ButtonAction";
import TagStatus from "@/components/TagStatus";
import { Modal, Space, Table, TableProps } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

interface DataType {
  id: number;
  merchant_name: string;
  status: string;
}

interface IPropUserList {
  showDrawer: () => void;
}

const MerchantList = ({ showDrawer }: IPropUserList) => {
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
      title: "Merchant Name",
      dataIndex: "merchant_name",
      key: "merchant_name",
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
              showDrawer();
            }}
            enableEdit
            onEditClick={() => {
              showDrawer();
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
      id: 1,
      merchant_name: "J-Mart",
      status: "active",
    },
    {
      id: 2,
      merchant_name: "Xokthavy",
      status: "cancel",
    },
  ];
  return <Table<DataType> columns={columns} dataSource={data} />;
};

export default MerchantList;
