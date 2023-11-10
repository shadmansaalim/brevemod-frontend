// Imports
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";

const DashboardUsersPage = () => {
  return (
    <div>
      <h1>Admin Dashboard Users Page</h1>
    </div>
  );
};

export default DashboardUsersPage;

DashboardUsersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout onlyAdminAccess={true}>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthLayout>
  );
};
