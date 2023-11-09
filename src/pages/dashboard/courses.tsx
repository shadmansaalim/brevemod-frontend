// Imports
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";

const DashboardCoursesPage = () => {
  return (
    <div>
      <h1>Admin Dashboard Courses Page</h1>
    </div>
  );
};

export default DashboardCoursesPage;

DashboardCoursesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
    // onlyAdminAccess={true}
    >
      <DashboardLayout>{page}</DashboardLayout>
    </AuthLayout>
  );
};
