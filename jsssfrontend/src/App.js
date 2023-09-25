import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GalleryLogin from "./pages/GalleryLogin";
import Gallery from "./pages/Gallery";
import Cart from "./pages/Cart";
import AdminHome from "./pages/AdminDashboard/AdminHome";
import AdminLogin from "./pages/AdminDashboard/AdminLogin";
import AdminRegister from "./pages/AdminDashboard/AdminRegister";
import GalleryMainPart from "./component/adminDashboard/GalleryPart/GalleryMainPart";
import AllListItems from "./component/adminDashboard/GalleryPart/AllListItems";
import AdminViewImages from "./component/adminDashboard/GalleryPart/AdminViewImages";
import Footer from "./Layout/Footer";
import NoticeDisplay from "./component/NoticeDisplay";
import ViewStudentData from "./component/adminDashboard/ViewStudentData";
import Eregister from "./pages/Eregister";
import Testeregisteration from "./pages/Testeregisteration";
import RegResponse from "./pages/RegResponse";
import ViewReceipt from "./component/adminDashboard/ViewReceipt";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/gallery-login" element={<GalleryLogin />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cartPage" element={<Cart />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/galleryMainPart" element={<GalleryMainPart />} />
          <Route path="/eventList" element={<AllListItems />} />
          <Route path="/notice-board" element={<NoticeDisplay />} />
          <Route path="/view-student-data/:id" element={<ViewStudentData />} />
          <Route path="/e-register" element={<Eregister />} />
          <Route path="/success-msg" element={<RegResponse />} />
          <Route path="/view-student-receipt/:id" element={<ViewReceipt />} />

          {/* <Route path="/E-register" element={<Testeregisteration/>} /> */}
          <Route
            path="/admin-view-images/:event_name"
            element={<AdminViewImages />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
