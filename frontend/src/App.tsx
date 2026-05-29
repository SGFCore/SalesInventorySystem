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
import { NotificationProvider } from "@/context/notificationContext";
import EmpManagementPage from "@/pages/2-emp-management/EmpManagementPage";
import ComboManagementPage from "@/pages/6.2-combo-management/ComboManagementPage";
import WarehouseManagementPage from "@/pages/11.1-warehouse-management-page/WarehouseManagementPage";
import NotificationManagementPage from "@/pages/0-notification-management/NotificationManagementPage";

import { DashboardProvider } from "@/context/dashboardContext";

// New Grouped Pages
import CustomerPartnerManagement from "@/pages/grouped/CustomerPartnerManagement";
import ProductManagementGroup from "@/pages/grouped/ProductManagementGroup";
import MultiChannelOrderManagement from "@/pages/grouped/MultiChannelOrderManagement";
import PolicyManagementGroup from "@/pages/grouped/PolicyManagementGroup";
import CirculatingSlipsManagement from "@/pages/grouped/CirculatingSlipsManagement";
import ReportManagementGroup from "@/pages/grouped/ReportManagementGroup";
import ShippingManagementGroup from "@/pages/grouped/ShippingManagementGroup";
import AccountingManagementGroup from "@/pages/grouped/AccountingManagementGroup";

function App() {
  return (
    <EmpProvider>
      <AuthProvider>
        <NotificationProvider>
          <DashboardProvider>
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
                  path="/notification-management"
                  element={
                    <PrivateRoute>
                      <NotificationManagementPage />
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
                path="/combo-management"
                element={
                  <PrivateRoute>
                    <ComboManagementPage />
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

              {/* Grouped themed routes */}
              <Route
                path="/customer-partner-management"
                element={
                  <PrivateRoute>
                    <CustomerPartnerManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/product-management"
                element={
                  <PrivateRoute>
                    <ProductManagementGroup />
                  </PrivateRoute>
                }
              />
              <Route
                path="/multichannel-order-management"
                element={
                  <PrivateRoute>
                    <MultiChannelOrderManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/policy-management"
                element={
                  <PrivateRoute>
                    <PolicyManagementGroup />
                  </PrivateRoute>
                }
              />
              <Route
                path="/circulating-slips-management"
                element={
                  <PrivateRoute>
                    <CirculatingSlipsManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/report-management"
                element={
                  <PrivateRoute>
                    <ReportManagementGroup />
                  </PrivateRoute>
                }
              />
              <Route
                path="/shipping-management"
                element={
                  <PrivateRoute>
                    <ShippingManagementGroup />
                  </PrivateRoute>
                }
              />
              <Route
                path="/accounting-management"
                element={
                  <PrivateRoute>
                    <AccountingManagementGroup />
                  </PrivateRoute>
                }
              />

              {/* Legacy Route redirects for backwards compatibility */}
              <Route
                path="/comp-management"
                element={<Navigate to="/customer-partner-management?tab=partners" replace />}
              />
              <Route
                path="/customer-management"
                element={<Navigate to="/customer-partner-management?tab=customers" replace />}
              />
              <Route
                path="/customertype-management"
                element={<Navigate to="/customer-partner-management?tab=customer-types" replace />}
              />
              <Route
                path="/cat-management"
                element={<Navigate to="/product-management?tab=categories" replace />}
              />
              <Route
                path="/producttype-management"
                element={<Navigate to="/product-management?tab=product-types" replace />}
              />
              <Route
                path="/order-management"
                element={<Navigate to="/multichannel-order-management?tab=orders" replace />}
              />
              <Route
                path="/invoice-management"
                element={<Navigate to="/multichannel-order-management?tab=invoices" replace />}
              />
              <Route
                path="/discount-management"
                element={<Navigate to="/policy-management?tab=promotions" replace />}
              />
              <Route
                path="/orderreturn-management"
                element={<Navigate to="/policy-management?tab=returns" replace />}
              />
              <Route
                path="/request-management"
                element={<Navigate to="/circulating-slips-management?tab=replenishment-requests" replace />}
              />
              <Route
                path="/importreceipt-management"
                element={<Navigate to="/circulating-slips-management?tab=import-receipts" replace />}
              />
              <Route
                path="/countsheet-management"
                element={<Navigate to="/circulating-slips-management?tab=count-sheets" replace />}
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </Router>
          </SidebarProvider>
        </DashboardProvider>
      </NotificationProvider>
    </AuthProvider>
  </EmpProvider>
);
}

export default App;
