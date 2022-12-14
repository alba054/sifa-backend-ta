import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FEProposalPage from "src/pages/final-exam/student/proposal/FEProposalPage";
import CustomFonts from "./CustomFonts";
import Accreditation from "./pages/admin/Accreditation";
import ClassData from "./pages/admin/Assessment/ClassData";
import AdminClassInformation from "./pages/admin/Assessment/ClassData/ClassInformation";
import MarksData from "./pages/admin/Assessment/MarksData";
import AdminMarkInformation from "./pages/admin/Assessment/MarksData/MarkInformation";
import LecturerData from "./pages/admin/DataMaster/LecturerData";
import AddLecturer from "./pages/admin/DataMaster/LecturerData/AddLecturer";
import StudentData from "./pages/admin/DataMaster/StudentData";
import AdminHome from "./pages/admin/Home";
import CPL from "./pages/admin/References/CPL";
import CPMK from "./pages/admin/References/CPMK";
import Curriculum from "./pages/admin/References/Curriculum";
import RPS from "./pages/admin/References/RPS";
import CourseCPL from "./pages/admin/Report/CourseCPL";
import CourseCPLDetail from "./pages/admin/Report/CourseCPL/CourseCPLDetail";
import DataStatus from "./pages/admin/Report/DataStatus";
import StudentCPL from "./pages/admin/Report/StudentCPL";
import Settings from "./pages/admin/Setting";
import FEHomepage from "./pages/final-exam/FEHomepage";
import FEApproval from "./pages/final-exam/first-vice-dean/approval/FEApproval";
import FEMentorAndExaminersApproval from "./pages/final-exam/first-vice-dean/approval/mentor-and-examiners-approval/FEMentorAndExaminersApproval";
import FEMentorAndExaminersApprovalMore from "./pages/final-exam/first-vice-dean/approval/mentor-and-examiners-approval/more/FEMentorAndExaminersApprovalMore";
import FELabFreeApplication from "./pages/final-exam/student/lab-free/FELabFree";
import FEEditProfilePage from "./pages/final-exam/student/profile/edit-profile/FEEditProfile.page";
import FEProfile from "./pages/final-exam/student/profile/profile-main/FEProfile.page";
import FEProposalHistory from "./pages/final-exam/student/proposal/history/FEProposalHistory";
import FENewTopicPage from "./pages/final-exam/student/proposal/new/FENewTopic";
import FESeminar from "./pages/final-exam/student/seminar/FESeminar";
import FESeminarHistory from "./pages/final-exam/student/seminar/history/FESeminarHistory";
import FETrialPermit from "./pages/final-exam/student/trial-permit/FETrialPermit";
import Login from "./pages/global/Login/Login";
import NotFound from "./pages/global/NotFound";
import ResetPassword from "./pages/global/ResetPassword/ResetPassword";
import Assessment from "./pages/lecturer/Assesment";
import Help from "./pages/lecturer/Help";
import Home from "./pages/lecturer/Home";
import Mark from "./pages/lecturer/Mark";
import Portfolio from "./pages/lecturer/Portfolio";
import Profile from "./pages/lecturer/Profile";
import { mantineTheme } from "./themes/mantine.theme";

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
              <Route path="tugas-akhir" element={<FEProposalPage />} />
              <Route path="tugas-akhir/buat" element={<FENewTopicPage />} />
              <Route
                path="tugas-akhir/riwayat"
                element={<FEProposalHistory />}
              />
              <Route path="bebas-lab" element={<FELabFreeApplication />} />
              <Route path="seminar" element={<FESeminar />} />
              <Route path="seminar/riwayat" element={<FESeminarHistory />} />
              <Route path="ujian-sidang" element={<FETrialPermit />} />
              <Route path="profil">
                <Route path="" element={<FEProfile />} />
                <Route path="edit" element={<FEEditProfilePage />} />
              </Route>
              <Route path="persetujuan">
                <Route index element={<FEApproval />} />
                <Route path="sk-pembimbing-dan-penguji">
                  <Route index element={<FEMentorAndExaminersApproval />} />
                <Route path="nim/:nim" element={<FEMentorAndExaminersApprovalMore />} />
                </Route>
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
