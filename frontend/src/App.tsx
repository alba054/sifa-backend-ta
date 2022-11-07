import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomFonts from "./CustomFonts";
import Login from "./pages/global/Login/Login";
import ResetPassword from "./pages/global/ResetPassword/ResetPassword";
import Home from "./pages/lecturer/Home";
import Mark from "./pages/lecturer/Mark";
import Help from "./pages/lecturer/Help";
import Assessment from "./pages/lecturer/Assesment";
import Portfolio from "./pages/lecturer/Portfolio";
import Profile from "./pages/lecturer/Profile";
import NotFound from "./pages/global/NotFound";
import AdminHome from "./pages/admin/Home";
import ClassData from "./pages/admin/Assessment/ClassData";
import AdminClassInformation from "./pages/admin/Assessment/ClassData/ClassInformation";
import AdminMarkInformation from "./pages/admin/Assessment/MarksData/MarkInformation";
import MarksData from "./pages/admin/Assessment/MarksData";
import LecturerData from "./pages/admin/DataMaster/LecturerData";
import AddLecturer from "./pages/admin/DataMaster/LecturerData/AddLecturer";
import StudentData from "./pages/admin/DataMaster/StudentData";
import DataStatus from "./pages/admin/Report/DataStatus";
import CourseCPL from "./pages/admin/Report/CourseCPL";
import CourseCPLDetail from "./pages/admin/Report/CourseCPL/CourseCPLDetail";
import StudentCPL from "./pages/admin/Report/StudentCPL";
import Accreditation from "./pages/admin/Accreditation";
import Curriculum from "./pages/admin/References/Curriculum";
import CPL from "./pages/admin/References/CPL";
import CPMK from "./pages/admin/References/CPMK";
import RPS from "./pages/admin/References/RPS";
import Settings from "./pages/admin/Setting";
import { mantineTheme } from "./themes/mantine.theme";
import FEHomepage from "./pages/final-exam/FEHomepage";
import FEProposalPage from "src/pages/final-exam/student/proposal/FEProposalPage";
import FELabFreeApplication from "./pages/final-exam/student/lab-free/FELabFree";
import { ModalsProvider } from "@mantine/modals";
import FEEditProfilePage from "./pages/final-exam/student/profile/edit-profile/FEEditProfile.page";
import FEProfile from "./pages/final-exam/student/profile/profile-main/FEProfile.page";

function App() {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={mantineTheme}
    >
      <ModalsProvider>
        <CustomFonts />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="nilai">
              <Route index element={<Mark />} />
              <Route path="penilaian" element={<Assessment />} />
              <Route path="portfolio" element={<Portfolio />} />
            </Route>
            <Route path="admin">
              <Route index element={<AdminHome />} />
              <Route path="penilaian">
                <Route path="data-kelas">
                  <Route index element={<ClassData />} />
                  <Route path=":id" element={<AdminClassInformation />} />
                </Route>
                <Route path="data-nilai">
                  <Route index element={<MarksData />} />
                  <Route path=":id" element={<AdminMarkInformation />} />
                </Route>
              </Route>
              <Route path="master-data">
                <Route path="data-dosen">
                  <Route index element={<LecturerData />} />
                  <Route path="tambah-dosen" element={<AddLecturer />} />
                </Route>
                <Route path="data-mahasiswa">
                  <Route index element={<StudentData />} />
                </Route>
              </Route>
              <Route path="laporan">
                <Route path="status-pendataan">
                  <Route index element={<DataStatus />} />
                </Route>
                <Route path="cpl-matakuliah">
                  <Route index element={<CourseCPL />} />
                  <Route path=":matakuliah" element={<CourseCPLDetail />} />
                </Route>
                <Route path="cpl-mahasiswa">
                  <Route index element={<StudentCPL />} />
                  {/* <Route path=":matakuliah" element={<CourseCPLDetail />} /> */}
                </Route>
              </Route>
              <Route path="akreditasi">
                <Route index element={<Accreditation />} />
              </Route>
              <Route path="referensi">
                <Route path="kurikulum-matakuliah" element={<Curriculum />} />
                <Route path="cpl" element={<CPL />} />
                <Route path="cpmk" element={<CPMK />} />
                <Route path="rps" element={<RPS />} />
              </Route>
              <Route path="manajemen-pengguna">
                <Route index element={<Settings />} />
              </Route>
            </Route>
            <Route path="tugas-akhir">
              <Route index element={<FEHomepage />} />
              <Route path="proposal" element={<FEProposalPage />} />
              <Route path="bebas-lab" element={<FELabFreeApplication />} />
              <Route path="profile">
                <Route path="" element={<FEProfile />} />
                <Route path="edit" element={<FEEditProfilePage />} />
              </Route>
            </Route>
            <Route path="bantuan" element={<Help />} />
            <Route path="profil" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
