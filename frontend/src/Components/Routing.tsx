import React, { Suspense, memo } from "react";
// import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import AdminRoute from "src/Views/Admin/AdminRoute";
// import Role from "src/models/enums/role";

const CustomerAddressesView = React.lazy(()=> import('../Views/CustomerAddressesView/CustomerAddressesView'))
const SocialCustomerView = React.lazy(() => import("../Views/SocialCustomerView/SocialCustomerListView"));
const AddSocialCustomerView = React.lazy(() => import("../Views/AddSocialCustomerView/AddSocialCustomerView"));

// const AdminView = React.lazy(
//   () => import("../Views/Admin/AdminView/AdminView")
// );

function Routing(): JSX.Element {
  // Use useSelector to access the current user role from the Redux store.
//   const userRole = useSelector(
//     (state: { auth: { userRole: Role.Admin } }) => state.auth.userRole
//   );

  return (
    <Suspense fallback={<div>Loading...</div>}> {/* React will display loading fallback until all the code and data needed by the children has been loaded. */}
      <Routes>
        <Route path="/" element={<CustomerAddressesView />} />
        <Route path="/social-customer" element={<SocialCustomerView />} />
        <Route path="/add-customer" element={<AddSocialCustomerView />} />
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

export default memo(Routing);
