import { Button, Space } from "antd";
import React from "react";
import {
  DownloadOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  SaveOutlined,
  SendOutlined,
  EyeOutlined,
} from "@ant-design/icons";

type IProps = {
  enableView?: boolean;
  enableEdit?: boolean;
  enableDelete?: boolean;
  enableCopy?: boolean;
  enableCancel?: boolean;
  enableDownload?: boolean;
  enableSave?: boolean;
  enableSend?: boolean;
  onCopy?: () => void;
  onViewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onCancelClick?: () => void;
  onSaveClick?: () => void;
  onDownloadClick?: () => void;
  onSendClick?: () => void;
  disabledDownload?: boolean;
  disabledView?: boolean;
  disabledEdit?: boolean;
  disabledDelete?: boolean;
  disabledCopy?: boolean;
  disabledCancel?: boolean;
  disabledSave?: boolean;
  disabledSend?: boolean;
};

const ButtonAction: React.FC<IProps> = ({
  enableDelete,
  enableEdit,
  enableView,
  onEditClick,
  onDeleteClick,
  onViewClick,
  enableCopy,
  enableSend,
  onCopy,
  onCancelClick,
  onSaveClick,
  disabledCancel,
  disabledSave,
  enableCancel,
  enableSave,
  disabledCopy,
  disabledDelete,
  disabledEdit,
  disabledView,
  disabledSend,
  enableDownload,
  disabledDownload,
  onDownloadClick,
  onSendClick
}: IProps) => {
  return (
    <Space>
      {enableView && (
        <Button
          variant="outlined"
          type="default"
          icon={<EyeOutlined />}
          disabled={disabledView}
          onClick={onViewClick}
        />
      )}
      {enableCopy && (
        <Button
          variant="outlined"
          type="default"
          icon={<CopyOutlined />}
          disabled={disabledCopy}
          onClick={onCopy}
        />
      )}
      {enableEdit && (
        <Button
          variant="outlined"
          color="primary"
          icon={<EditOutlined />}
          disabled={disabledEdit}
          onClick={onEditClick}
        />
      )}
      {enableDownload && (
        <Button
          variant="outlined"
          type="default"
          icon={<DownloadOutlined />}
          disabled={disabledDownload}
          onClick={onDownloadClick}
        />
      )}
      {enableDelete && (
        <Button
          variant="outlined"
          color="danger"
          icon={<DeleteOutlined />}
          disabled={disabledDelete}
          onClick={onDeleteClick}
        />
      )}
      {enableCancel && (
        <Button
          variant="outlined"
          type="default"
          icon={<CloseOutlined />}
          disabled={disabledCancel}
          onClick={onCancelClick}
        />
      )}
      {enableSave && (
        <Button
          variant="outlined"
          type="default"
          icon={<SaveOutlined />}
          disabled={disabledSave}
          onClick={onSaveClick}
        />
      )}
      {enableSend && (
        <Button
          variant="outlined"
          type="default"
          icon={<SendOutlined />}
          disabled={disabledSend}
          onClick={onSendClick}
        />
      )}
    </Space>
  );
};

export default ButtonAction;
