import MainLayout from "@/components/Layout";

interface RouteWrapperProps {
  children: React.ReactNode;
  useLayout?: boolean;
  title?: string;
  breadcumbs?: any[];
}

const RouteWrapper = ({
  children,
  useLayout = true,
  title = "Page",
  breadcumbs,
}: RouteWrapperProps) => {
  
  if (!useLayout) {
    return <>{children}</>;
  }
  
  return (
    <MainLayout 
      title={title}
      breadcumbs={breadcumbs ?? []}
    >
      {children}
    </MainLayout>
  );
};

export default RouteWrapper;