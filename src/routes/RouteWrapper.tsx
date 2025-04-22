import MainLayout from "@/components/Layout";

interface RouteWrapperProps {
  children: React.ReactNode;
  useLayout?: boolean;
  title?: string;
  breadcumb?: string;
}

const RouteWrapper = ({
  children,
  useLayout = true,
  title = "Page",
  breadcumb = "Home",
}: RouteWrapperProps) => {
  
  if (!useLayout) {
    return <>{children}</>;
  }
  
  return (
    <MainLayout 
      title={title}
      breadcumb={breadcumb}
    >
      {children}
    </MainLayout>
  );
};

export default RouteWrapper;