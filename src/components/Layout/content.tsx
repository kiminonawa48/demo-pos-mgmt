import { Breadcrumb, Layout, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

export interface IBreadcrumbItem {
  title: string;
  path?: string;
  disabled?: boolean;
}

export interface IContentLayout {
  children: React.ReactNode;
  breadcumbs: IBreadcrumbItem[];
}

const ContentLayout = ({ children, breadcumbs }: IContentLayout) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  // Convert breadcrumb items to the format Ant Design expects
  // but with onClick handlers instead of href properties
  const breadcrumbItems = breadcumbs?.length
    ? breadcumbs.map((item, index) => {
        // Determine if this is the last item (which shouldn't be clickable)
        const isLastItem = index === breadcumbs.length - 1;

        return {
          title: item.title,
          disabled: isLastItem || item.disabled,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            if (!isLastItem && item.path && !item.disabled) {
              navigate(item.path);
            }
          },
        };
      })
    : [];

  return (
    <>
      <Content
        style={{
          margin: "0px 16px",
          padding: 12,
          width: "98%",
          // minHeight: 'calc(100vh - 65px)',
        }}
      >
        {breadcumbs && breadcumbs.length > 0 ? (
          <Breadcrumb
            style={{ margin: "16px 0", cursor: "pointer" }}
            items={breadcrumbItems}
          />
        ) : (
          <div style={{ margin: "16px 0" }}></div>
        )}

        <div
          style={{
            color: token.colorText,
          }}
        >
          {children}
        </div>
      </Content>
    </>
  );
};

export default ContentLayout;
