import { Tag } from "antd";

const TagStatus = ({ text, type }: { text: string; type: string }) => {
  const handleStatusColor = (type: string) => {
    if (type === "active") {
      // success
      return "success";
    } else if (type === "cancel") {
      // error
      return "red";
    } else {
      return "info";
    }
  };
  return <Tag color={handleStatusColor(type)}>{text}</Tag>;
};

export default TagStatus;
