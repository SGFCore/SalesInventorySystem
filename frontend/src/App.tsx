import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PublicRoute } from "@/components/PublicRoute";
import Home from "@/pages/Home";
import EmpInfoPage from "@/pages/1-emp-info/EmpInfoPage";
import { SignIn } from "@/pages/SignIn";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EmpProvider } from "@/context/empContext";
import EmpManagementPage from "@/pages/2-emp-management/EmpManagementPage";
import CompManagementPage from "@/pages/3-comp-management/CompManagementPage";
import CustomerManagementPage from "@/pages/4-customer-management-page/CustomerManagementPage";
import CatManagementPage from "@/pages/5.1-category-management-page/CatManagementPage";
import ProductTypeManagementPage from "@/pages/5.2-producttype-management-page/ProductTypeManagementPage";
import ProductManagementPage from "@/pages/6.1-product-management/ProductManagementPage";
import CustomerTypeManagementPage from "@/pages/7.1-customertype-management-page/CustomerTypeManagementPage";
import DiscountManagementPage from "@/pages/7.2-discount-management-page/DiscountManagementPage";
import InvoiceManagementPage from "@/pages/8.1-invoice-management-page/InvoiceManagementPage";
import OrderManagementPage from "@/pages/8.2-order-management-page/OrderManagementPage";
import OrderReturnManagementPage from "@/pages/9-orderreturn-management-page/OrderReturnManagementPage";
import WarehouseManagementPage from "@/pages/11.1-warehouse-management-page/WarehouseManagementPage";
import RequestManagementPage from "@/pages/11.2-request-management-page/RequestManagementPage";
import ImportReceiptManagementPage from "@/pages/12.1-importreceipt-management-page/ImportReceiptManagementPage";
import CountsheetManagementPage from "@/pages/15-countsheet-management-page/CountsheetManagementPage";

function App() {
  return (
    <EmpProvider>
      <AuthProvider>
        <SidebarProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                }
              />
              {/* Private Routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <EmpInfoPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/emp-management"
                element={
                  <PrivateRoute>
                    <EmpManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/comp-management"
                element={
                  <PrivateRoute>
                    <CompManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/customer-management"
                element={
                  <PrivateRoute>
                    <CustomerManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cat-management"
                element={
                  <PrivateRoute>
                    <CatManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/producttype-management"
                element={
                  <PrivateRoute>
                    <ProductTypeManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/product-management"
                element={
                  <PrivateRoute>
                    <ProductManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/customertype-management"
                element={
                  <PrivateRoute>
                    <CustomerTypeManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/discount-management"
                element={
                  <PrivateRoute>
                    <DiscountManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/invoice-management"
                element={
                  <PrivateRoute>
                    <InvoiceManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/order-management"
                element={
                  <PrivateRoute>
                    <OrderManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orderreturn-management"
                element={
                  <PrivateRoute>
                    <OrderReturnManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/warehouse-management"
                element={
                  <PrivateRoute>
                    <WarehouseManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/request-management"
                element={
                  <PrivateRoute>
                    <RequestManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/importreceipt-management"
                element={
                  <PrivateRoute>
                    <ImportReceiptManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/countsheet-management"
                element={
                  <PrivateRoute>
                    <CountsheetManagementPage />
                  </PrivateRoute>
                }
              />
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </SidebarProvider>
      </AuthProvider>
    </EmpProvider>
  );
}

export default App;
