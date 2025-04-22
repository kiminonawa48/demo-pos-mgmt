import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Checkbox,
  Card,
  Row,
  Col,
  Divider,
  Typography,
} from "antd";

interface Permission {
  code: string;
  permit: boolean;
  name: string;
}

interface PermissionGroup {
  id: number;
  name: string;
  code: string;
  permit: boolean;
  permissions: Permission[];
}

const RoleAndPermissionForm = ({
  form,
  onFinish,
  loading,
}: {
  form: any;
  onFinish: (value: any) => void;
  loading: boolean;
}) => {
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      id: 1,
      name: "Dashboard",
      code: "dashboard",
      permit: true,
      permissions: [
        {
          code: "dashboard.unit.view",
          permit: true,
          name: "VIEW",
        },
      ],
    },
    {
      id: 2,
      name: "Merchant",
      code: "merchant",
      permit: true,
      permissions: [
        {
          code: "merchant.unit.view",
          permit: true,
          name: "VIEW",
        },
        {
          code: "merchant.unit.add",
          permit: true,
          name: "CREATE",
        },
        {
          code: "merchant.unit.edit",
          permit: true,
          name: "UPDATE",
        },
        {
          code: "merchant.unit.delete",
          permit: true,
          name: "DELETE",
        },
      ],
    },
    {
      id: 3,
      name: "Terminal",
      code: "terminal",
      permit: true,
      permissions: [
        {
          code: "terminal.unit.view",
          permit: true,
          name: "VIEW",
        },
        {
          code: "terminal.unit.add",
          permit: true,
          name: "CREATE",
        },
        {
          code: "terminal.unit.edit",
          permit: true,
          name: "UPDATE",
        },
        {
          code: "terminal.unit.delete",
          permit: true,
          name: "DELETE",
        },
      ],
    },
  ]);

  // Handle permission change for a specific permission
  const handlePermissionChange = (
    groupId: number,
    permissionCode: string,
    value: boolean
  ) => {
    const updatedGroups = permissionGroups.map((group) => {
      if (group.id === groupId) {
        const updatedPermissions = group.permissions.map((permission) => {
          if (permission.code === permissionCode) {
            return { ...permission, permit: value };
          }
          return permission;
        });
        return { ...group, permissions: updatedPermissions };
      }
      return group;
    });

    setPermissionGroups(updatedGroups);

    // Update form values
    const permissionsFormValue = {};
    updatedGroups.forEach((group) => {
      group.permissions.forEach((permission) => {
        permissionsFormValue[permission.code] = permission.permit;
      });
    });

    form.setFieldsValue({ permissions: permissionsFormValue });
  };

  // Handle selecting/deselecting all permissions in a group
  const handleGroupPermissionChange = (groupId: number, value: boolean) => {
    const updatedGroups = permissionGroups.map((group) => {
      if (group.id === groupId) {
        const updatedPermissions = group.permissions.map((permission) => ({
          ...permission,
          permit: value,
        }));
        return { ...group, permit: value, permissions: updatedPermissions };
      }
      return group;
    });

    setPermissionGroups(updatedGroups);

    // Update form values
    const permissionsFormValue = {};
    updatedGroups.forEach((group) => {
      group.permissions.forEach((permission) => {
        permissionsFormValue[permission.code] = permission.permit;
      });
    });

    form.setFieldsValue({ permissions: permissionsFormValue });
  };

  // Check if all permissions in a group are selected
  const isGroupFullySelected = (groupId: number): boolean => {
    const group = permissionGroups.find((g) => g.id === groupId);
    return group ? group.permissions.every((p) => p.permit) : false;
  };

  // Check if some permissions in a group are selected
  const isGroupPartiallySelected = (groupId: number): boolean => {
    const group = permissionGroups.find((g) => g.id === groupId);
    const selectedCount = group
      ? group.permissions.filter((p) => p.permit).length
      : 0;
    return group
      ? selectedCount > 0 && selectedCount < group.permissions.length
      : false;
  };

  // Handle select all permissions
  const handleSelectAll = (checked: boolean) => {
    const updatedGroups = permissionGroups.map((group) => ({
      ...group,
      permit: checked,
      permissions: group.permissions.map((permission) => ({
        ...permission,
        permit: checked,
      })),
    }));

    setPermissionGroups(updatedGroups);

    // Update form values
    const permissionsFormValue = {};
    updatedGroups.forEach((group) => {
      group.permissions.forEach((permission) => {
        permissionsFormValue[permission.code] = permission.permit;
      });
    });

    form.setFieldsValue({ permissions: permissionsFormValue });
  };

  // Check if all permissions across all groups are selected
  const areAllPermissionsSelected = permissionGroups.every((group) =>
    group.permissions.every((permission) => permission.permit)
  );

  // Check if some permissions are selected
  const areSomePermissionsSelected =
    permissionGroups.some((group) =>
      group.permissions.some((permission) => permission.permit)
    ) && !areAllPermissionsSelected;

  const handleFormSubmit = (values: any) => {
    // Combine role data with permissions
    const permissionData = {};
    permissionGroups.forEach((group) => {
      group.permissions.forEach((permission) => {
        permissionData[permission.code] = permission.permit;
      });
    });

    const formData = {
      ...values,
      permissionData,
    };

    onFinish(formData);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        autoComplete="off"
        initialValues={{ status: true }}
      >
        <Card className="mb-4">
          <Form.Item
            name="role_name"
            label="Role Name"
            rules={[
              { required: true, message: "Please enter a role name" },
              { min: 4, message: "Role name must be at least 4 characters" },
            ]}
          >
            <Input placeholder="Enter Role name" />
          </Form.Item>
        </Card>

        <Divider orientation="left">Permissions</Divider>

        <Form.Item name="permissions" hidden>
          <Input />
        </Form.Item>

        <Card className="mb-4">
          <Checkbox
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={areAllPermissionsSelected}
            indeterminate={areSomePermissionsSelected}
          >
            Select All Permissions
          </Checkbox>
        </Card>

        {permissionGroups.map((group) => (
          <Card key={group.id} className="mb-4">
            <div className="mb-3">
              <Row align="middle" justify="space-between">
                <Col span={8}>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    {group.id}. {group.name}
                  </Typography.Text>
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <Checkbox
                    onChange={(e) =>
                      handleGroupPermissionChange(group.id, e.target.checked)
                    }
                    checked={isGroupFullySelected(group.id)}
                    indeterminate={isGroupPartiallySelected(group.id)}
                  >
                    Select All
                  </Checkbox>
                </Col>
              </Row>
            </div>

            <br />
            <div className="ml-8">
              <Row gutter={[16, 16]}>
                {group.permissions.map((permission) => (
                  <Col key={permission.code} span={6} className="mb-2">
                    <Checkbox
                      checked={permission.permit}
                      onChange={(e) =>
                        handlePermissionChange(
                          group.id,
                          permission.code,
                          e.target.checked
                        )
                      }
                    >
                      {permission.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        ))}

        {/* <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item> */}

        <br />
        <Card className="form-actions-card">
          <Form.Item style={{ marginBottom: 0 }}>
            <Row justify="start">
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>

                <Button onClick={() => form.resetFields()} disabled={loading}>
                  Reset
                </Button>
              </Space>
            </Row>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
};

export default RoleAndPermissionForm;
