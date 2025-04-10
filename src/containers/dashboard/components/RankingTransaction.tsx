import React from "react";
import { Card, Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  merchant_name: string;
  value: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Merchant Name",
    dataIndex: "merchant_name",
    key: "merchant_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "value",
    dataIndex: "value",
    key: "value",
  },
];

const data: DataType[] = [
  {
    key: "1",
    merchant_name: "Xokthavy",
    value: 1000,
  },
  {
    key: "2",
    merchant_name: "J-mart",
    value: 1000,
  },
  {
    key: "3",
    merchant_name: "Jiffy",
    value: 1000,
  },
  {
    key: "4",
    merchant_name: "Xokthavy",
    value: 1000,
  },
  {
    key: "5",
    merchant_name: "J-mart",
    value: 1000,
  },
  {
    key: "6",
    merchant_name: "Jiffy",
    value: 1000,
  },
  {
    key: "7",
    merchant_name: "Xokthavy",
    value: 1000,
  },
  {
    key: "8",
    merchant_name: "J-mart",
    value: 1000,
  },
  {
    key: "9",
    merchant_name: "Jiffy",
    value: 1000,
  },
  {
    key: "10",
    merchant_name: "Jiffy",
    value: 1000,
  },
];

const RankingTransaction: React.FC = () => (
  <Card title="Payment Ranking" bodyStyle={{ padding: 0, margin: 0 }}>
    <div style={{ maxHeight: 600, overflow: "auto" }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 390 }}
      />
    </div>
  </Card>
);

export default RankingTransaction;
