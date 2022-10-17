import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CustomFonts from './CustomFonts';
import Login from './pages/global/Login/Login';
import ResetPassword from './pages/global/ResetPassword/ResetPassword';
import Home from './pages/lecturer/Home';
import Mark from './pages/lecturer/Mark'
import Help from './pages/lecturer/Help'
import Assessment from './pages/lecturer/Assesment';
import Portfolio from './pages/lecturer/Portfolio';
import Profile from './pages/lecturer/Profile';
import NotFound from './pages/global/NotFound';
import AdminHome from './pages/admin/Home'
import ClassData from './pages/admin/Assessment/ClassData';
import AdminClassInformation from './pages/admin/Assessment/ClassData/ClassInformation'
import AdminMarkInformation from './pages/admin/Assessment/MarksData/MarkInformation'
import MarksData from './pages/admin/Assessment/MarksData';
import LecturerData from './pages/admin/DataMaster/LecturerData';
import AddLecturer from './pages/admin/DataMaster/LecturerData/AddLecturer';
import StudentData from './pages/admin/DataMaster/StudentData';
import DataStatus from './pages/admin/Report/DataStatus';
import CourseCPL from './pages/admin/Report/CourseCPL';
import CourseCPLDetail from './pages/admin/Report/CourseCPL/CourseCPLDetail';
import StudentCPL from './pages/admin/Report/StudentCPL';
import Accreditation from './pages/admin/Accreditation';
import Curriculum from './pages/admin/References/Curriculum';
import CPL from './pages/admin/References/CPL';
import CPMK from './pages/admin/References/CPMK';
import RPS from './pages/admin/References/RPS';
import Settings from './pages/admin/Setting';


function App() {
  return (
    <MantineProvider 
      withCSSVariables
      withGlobalStyles 
      withNormalizeCSS
      theme={{
          headings: {
            fontWeight: 400,
            fontFamily: 'Nunito Sans, sans-serif'
          },
          breakpoints: {
            "sm" : 640,
            "md" : 768,
            "lg" : 1024,
            xl : 1280,
            "2xl": 1536
          },
          primaryShade: 5,
          colors: {
            "primary-text" : ["#657387", "#5b697d", "#515f73", "#475569", "#3d4b5f", "#334155", "#29374b", "#1f2d41", "#152337", "#0b192d"],
            "secondary-text" : ["#c6d5ea", "#bccbe0", "#b2c1d6", "#a8b7cc", "#9eadc2", "#94a3b8", "#8a99ae", "#808fa4", "#76859a", "#6c7b90"],
            "primary" : ["#918cff", "#8782ff", "#7d78ff", "#736eff", "#6964ff", "#5f5af7", "#5550ed", "#4b46e3", "#413cd9", "#3732cf"],
            "error" : ["#ff5e88", "#ff547e", "#ff4a74", "#ff406a", "#ff3660", "#ff2c56", "#f5224c", "#eb1842", "#e10e38", "#d7042e"],
            "background" : ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f5f5f5", "#ebebeb", "#e1e1e1", "#d7d7d7"],
            "divider" : ["#e7f4ff", "#ddeaf9", "#d3e0ef", "#c9d6e5", "#bfccdb", "#b5c2d1", "#abb8c7", "#a1aebd", "#97a4b3", "#8d9aa9"],
            "secondary" : ["#ffffff", "#ffffff", "#fcfbff", "#f2f1ff", "#e8e7fb", "#deddf1", "#d4d3e7", "#cac9dd", "#c0bfd3", "#b6b5c9"],
          },
          primaryColor: 'primary-text',
          fontFamily: 'Nunito Sans, sans-serif'
      }}
    >
      <CustomFonts />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />}/>
          <Route path='reset-password' element={<ResetPassword />}/>
          <Route path='nilai'>
            <Route index element={<Mark />} />
            <Route path='penilaian' element={<Assessment />} />
            <Route path='portfolio' element={<Portfolio />} />
          </Route>
          <Route path='admin'>
            <Route index element={<AdminHome />} />
            <Route path="penilaian">
              <Route path='data-kelas' >
                <Route index element={<ClassData />}  />
                <Route path=":id" element={<AdminClassInformation />} />
              </Route>
              <Route path='data-nilai'>
                <Route index element={<MarksData />} />
                <Route path=":id" element={<AdminMarkInformation />} />
              </Route>
            </Route>
            <Route path='master-data'>
              <Route path="data-dosen">
                <Route index element={<LecturerData />} />
                <Route path='tambah-dosen' element={<AddLecturer />} />
              </Route>
              <Route path="data-mahasiswa">
                <Route index element={<StudentData />} />
              </Route>
            </Route>
            <Route path='laporan'>
              <Route path='status-pendataan'>
                <Route index element={<DataStatus />} />
              </Route>
              <Route path='cpl-matakuliah' >
                <Route index element={<CourseCPL />} />
                <Route path=":matakuliah" element={<CourseCPLDetail />} />
              </Route>
              <Route path='cpl-mahasiswa' >
                <Route index element={<StudentCPL />} />
                {/* <Route path=":matakuliah" element={<CourseCPLDetail />} /> */}
              </Route>
            </Route>
            <Route path='akreditasi'>
              <Route index element={<Accreditation />} />
            </Route>
            <Route path="referensi">
              <Route path="kurikulum-matakuliah" element={<Curriculum />}/>
              <Route path='cpl' element={<CPL />} />
              <Route path='cpmk' element={<CPMK />} />
              <Route path='rps' element={<RPS />} />
            </Route>
            <Route path='manajemen-pengguna'>
              <Route index element={<Settings />} />
            </Route>
          </Route>
          <Route path='bantuan' element={<Help />} />
          <Route path='profil' element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
