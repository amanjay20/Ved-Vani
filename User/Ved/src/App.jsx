import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import Pubilc_Routes from "./Routes/Pubilc_Routes";
import Admin_Routes from "./Routes/Admin_Routes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Pubilc_Routes />} />
        {/* private Routes (Accessible only if admin logged in) */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <Admin_Routes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
