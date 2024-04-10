import React, { Suspense } from "react";
// import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import AdminRoute from "src/Views/Admin/AdminRoute";
// import Role from "src/models/enums/role";

const DonateListView = React.lazy(() => import("../Views/DonateListView/DonateListView"));

// const AdminView = React.lazy(
//   () => import("../Views/Admin/AdminView/AdminView")
// );

function Routing(): JSX.Element {
  // Use useSelector to access the current user role from the Redux store.
//   const userRole = useSelector(
//     (state: { auth: { userRole: Role.Admin } }) => state.auth.userRole
//   );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<DonateListView />} />
        {/* <Route
          path="/admin"
          element={
            <AdminRoute userRole={userRole}>
              <AdminView />
            </AdminRoute>
          }
        /> */}
      </Routes>
    </Suspense>
  );
}

export default Routing;
