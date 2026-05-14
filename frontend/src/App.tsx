import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "@/pages/Home";
import { SignIn } from "@/pages/SignIn";
import { SidebarProvider } from "@/components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
