import { Breadcrumb, Layout, theme} from "antd";
import React from "react";
const { Content } = Layout;

export interface IContentLayout {
  children: React.ReactNode;
  breadcumb: string;
}

const ContentLayout = ({
  children,
  breadcumb
}: IContentLayout) => {
  const { token } = theme.useToken();

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
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={breadcumb.split("/").map((v: string) => {
            return {
              title: v,
            };
          })}
        />
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
