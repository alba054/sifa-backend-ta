import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FEProposalPage from "src/pages/final-exam/student/proposal/FEProposalPage";
import FERoleProvider from "./components/fe-components/FERoleContext";
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
import FEDeanApproval from "./pages/final-exam/dean/approval/FEDeanApproval";
import FEDeanMentorAndExaminersApprovalMore from "./pages/final-exam/dean/approval/mentor-and-examiners-approval/details/FEDeanMentorAndExaminersApprovalMore";
import FEDeanMentorAndExaminersApproval from "./pages/final-exam/dean/approval/mentor-and-examiners-approval/FEDeanMentorAndExaminersApproval";
import FEDeanMentorAndExaminersApprovalHistory from "./pages/final-exam/dean/approval/mentor-and-examiners-approval/history/FEDeanMentorAndExaminersApprovalHistory";
import FEHomepage from "./pages/final-exam/FEHomepage";
import FEViceDeanApproval from "./pages/final-exam/first-vice-dean/approval/FEViceDeanApproval";
import FEViceDeanTrialPermitApprovalMore from "./pages/final-exam/first-vice-dean/approval/trial-permit-approval/details/FEViceDeanTrialPermitApprovalMore";
import FEViceDeanTrialPermitApproval from "./pages/final-exam/first-vice-dean/approval/trial-permit-approval/FEViceDeanTrialPermitApproval";
import FEViceDeanTrialPermitApprovalHistory from "./pages/final-exam/first-vice-dean/approval/trial-permit-approval/history/FEViceDeanTrialPermitApprovalHistory";
import FEHeadAdministratorApproval from "./pages/final-exam/head-administrator/approval/FEHeadAdministratorApproval";
import FEHeadAdministratorMentorAndExaminersApprovalMore from "./pages/final-exam/head-administrator/approval/mentor-and-examiners-approval/details/FEHeadAdministratorMentorAndExaminersApprovalMore";
import FEHeadAdministratorMentorAndExaminersApproval from "./pages/final-exam/head-administrator/approval/mentor-and-examiners-approval/FEHeadAdministratorMentorAndExaminersApproval";
import FEHeadAdministratorMentorAndExaminersApprovalHistory from "./pages/final-exam/head-administrator/approval/mentor-and-examiners-approval/history/FEHeadAdministratorMentorAndExaminersApprovalHistory";
import FEHeadAdministratorTrialPermitApprovalApplicationDetails from "./pages/final-exam/head-administrator/approval/trial-permit-approval/application/details/FEHeadAdministratorTrialPermitApprovalApplicationDetails";
import FEHeadAdministratorTrialPermitApprovalApplication from "./pages/final-exam/head-administrator/approval/trial-permit-approval/application/FEHeadAdministratorTrialPermitApprovalApplication";
import FEHeadAdministratorTrialPermitApprovalHistory from "./pages/final-exam/head-administrator/approval/trial-permit-approval/application/history/FEHeadAdministratorTrialPermitApprovalHistory";
import FEStudentGuidance from "./pages/final-exam/student/guidance/FEStudentGuidance";
import FEStudentHomepage from "./pages/final-exam/student/home/FEStudentHomepage";
import FELabFreeApplication from "./pages/final-exam/student/lab-free/FELabFree";
import FEEditProfilePage from "./pages/final-exam/student/profile/edit-profile/FEEditProfile.page";
import FEProfile from "./pages/final-exam/student/profile/profile-main/FEProfile.page";
import FEProposalHistory from "./pages/final-exam/student/proposal/history/FEProposalHistory";
import FENewTopicPage from "./pages/final-exam/student/proposal/new/FENewTopic";
import FESeminar from "./pages/final-exam/student/seminar/FESeminar";
import FESeminarHistory from "./pages/final-exam/student/seminar/history/FESeminarHistory";
import FETrialPermit from "./pages/final-exam/student/trial-permit/FETrialPermit";
import FEStudyProgramAdminApproval from "./pages/final-exam/study-program-admin/approval/FEStudyProgramAdminApproval";
import FEStudyProgramAdminProposalApplication from "./pages/final-exam/study-program-admin/approval/proposal/application/FEStudyProgramAdminProposalApplication";
import FEStudyProgramAdminProposalApplicationHistory from "./pages/final-exam/study-program-admin/approval/proposal/application/history/FEStudyProgramAdminProposalApplicationHistory";
import FEStudyProgramAdminProposal from "./pages/final-exam/study-program-admin/approval/proposal/FEStudyProgramAdminProposal";
import FEStudyProgramAdminProposalSubmission from "./pages/final-exam/study-program-admin/approval/proposal/submission/FEStudyProgramAdminProposalSubmission";
import FEStudyProgramAdminProposalSubmissionHistory from "./pages/final-exam/study-program-admin/approval/proposal/submission/history/FEStudyProgramAdminProposalSubmissionHistory";
import FEStudyProgramAdminApprovalExaminersFramingDetermine from "./pages/final-exam/study-program-admin/examiners-framing/determine/FEStudyProgramAdminApprovalExaminersFramingDetermine";
import FEStudyProgramAdminApprovalExaminersFraming from "./pages/final-exam/study-program-admin/examiners-framing/FEStudyProgramAdminApprovalExaminersFraming";
import FEStudyProgramAdminApprovalExaminersFramingHistory from "./pages/final-exam/study-program-admin/examiners-framing/history/FEStudyProgramAdminApprovalExaminersFramingHistory";
import FESubsectionChairmanApproval from "./pages/final-exam/subsection-chairman/approval/FESubsectionChairmanApproval";
import FESubsectionChairmanMentorAndExaminersApprovalMore from "./pages/final-exam/subsection-chairman/approval/mentor-and-examiners-approval/details/FESubsectionChairmanMentorAndExaminersApprovalMore";
import FESubsectionChairmanMentorAndExaminersApproval from "./pages/final-exam/subsection-chairman/approval/mentor-and-examiners-approval/FESubsectionChairmanMentorAndExaminersApproval";
import FESubsectionChairmanMentorAndExaminersApprovalHistory from "./pages/final-exam/subsection-chairman/approval/mentor-and-examiners-approval/history/FESubsectionChairmanMentorAndExaminersApprovalHistory";
import FESubsectionChairmanTrialPermitApprovalApplicationDetails from "./pages/final-exam/subsection-chairman/approval/trial-permit-approval/application/details/FESubsectionChairmanTrialPermitApprovalApplicationDetails";
import FESubsectionChairmanTrialPermitApprovalApplication from "./pages/final-exam/subsection-chairman/approval/trial-permit-approval/application/FESubsectionChairmanTrialPermitApprovalApplication";
import FESubsectionChairmanTrialPermitApprovalApplicationHistory from "./pages/final-exam/subsection-chairman/approval/trial-permit-approval/application/history/FESubsectionChairmanTrialPermitApprovalApplicationHistory";
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

import { QueryClient, QueryClientProvider } from "react-query";
import DataProvider from "./contexts/data.context";
import Settings from "./pages/admin/Setting";
import FEFacultyAdminApproval from "./pages/final-exam/faculty-admin/approval/FEFacultyAdminApproval";
import FEFacultyAdminProposalApplicationDetails from "./pages/final-exam/faculty-admin/approval/proposal/application/details/FEFacultyAdminProposalApplicationDetails";
import FEFacultyAdminProposalApplication from "./pages/final-exam/faculty-admin/approval/proposal/application/FEFacultyAdminProposalApplication";
import FEFacultyAdminProposalApplicationHistory from "./pages/final-exam/faculty-admin/approval/proposal/application/history/FEFacultyAdminProposalApplicationHistory";
import FEFacultyAdminProposal from "./pages/final-exam/faculty-admin/approval/proposal/FEFacultyAdminProposal";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={mantineTheme}
      >
        <DataProvider>
          <ModalsProvider>
            <CustomFonts />
            <FERoleProvider>
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
                        <Route
                          path=":matakuliah"
                          element={<CourseCPLDetail />}
                        />
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
                      <Route
                        path="kurikulum-matakuliah"
                        element={<Curriculum />}
                      />
                      <Route path="cpl" element={<CPL />} />
                      <Route path="cpmk" element={<CPMK />} />
                      <Route path="rps" element={<RPS />} />
                    </Route>
                    <Route path="manajemen-pengguna">
                      <Route index element={<Settings />} />
                    </Route>
                  </Route>
                  <Route path="data-mahasiswa">
                    <Route index element={<StudentData />} />
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
                  <Route path="bantuan" element={<Help />} />
                  <Route path="profil" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="tugas-akhir">
                    <Route index element={<FEHomepage />} />
                    <Route path="mahasiswa">
                      <Route index element={<FEStudentHomepage />} />
                      <Route path="tugas-akhir" element={<FEProposalPage />} />
                      <Route
                        path="tugas-akhir/buat"
                        element={<FENewTopicPage />}
                      />
                      <Route
                        path="tugas-akhir/riwayat"
                        element={<FEProposalHistory />}
                      />
                      <Route
                        path="bebas-lab"
                        element={<FELabFreeApplication />}
                      />
                      <Route path="seminar" element={<FESeminar />} />
                      <Route
                        path="seminar/riwayat"
                        element={<FESeminarHistory />}
                      />
                      <Route path="ujian-sidang" element={<FETrialPermit />} />

                      <Route path="bimbingan" element={<FEStudentGuidance />} />
                      <Route path="profil">
                        <Route path="" element={<FEProfile />} />
                        <Route path="edit" element={<FEEditProfilePage />} />
                      </Route>
                    </Route>
                    <Route path="wakil-dekan-1">
                      <Route index element={<FEHomepage />} />
                      <Route path="persetujuan">
                        <Route index element={<FEViceDeanApproval />} />

                        <Route path="ujian-sidang">
                          <Route
                            index
                            element={<FEViceDeanTrialPermitApproval />}
                          />
                          <Route
                            path="riwayat"
                            element={<FEViceDeanTrialPermitApprovalHistory />}
                          />
                        </Route>
                        <Route
                          path="ujian-sidang/:nim"
                          element={<FEViceDeanTrialPermitApprovalMore />}
                        />
                      </Route>
                    </Route>
                    <Route path="kasubag">
                      <Route index element={<FEHomepage />} />
                      <Route path="persetujuan">
                        <Route
                          index
                          element={<FESubsectionChairmanApproval />}
                        />
                        <Route path="sk-pembimbing-dan-penguji">
                          <Route
                            index
                            element={
                              <FESubsectionChairmanMentorAndExaminersApproval />
                            }
                          />
                        </Route>
                        <Route
                          path="sk-pembimbing-dan-penguji/:nim"
                          element={
                            <FESubsectionChairmanMentorAndExaminersApprovalMore />
                          }
                        />
                        <Route
                          path="sk-pembimbing-dan-penguji/riwayat"
                          element={
                            <FESubsectionChairmanMentorAndExaminersApprovalHistory />
                          }
                        />
                        <Route path="izin-ujian-sidang">
                          <Route
                            index
                            element={
                              <FESubsectionChairmanTrialPermitApprovalApplication />
                            }
                          />
                          <Route
                            path="riwayat"
                            element={
                              <FESubsectionChairmanTrialPermitApprovalApplicationHistory />
                            }
                          />
                        </Route>
                        <Route
                          path="izin-ujian-sidang/:nim"
                          element={
                            <FESubsectionChairmanTrialPermitApprovalApplicationDetails />
                          }
                        />
                      </Route>
                    </Route>
                    <Route path="admin-program-studi">
                      <Route index element={<FEHomepage />} />
                      <Route path="persetujuan">
                        <Route
                          index
                          element={<FEStudyProgramAdminApproval />}
                        />
                        <Route path="judul-penelitian">
                          <Route
                            index
                            element={<FEStudyProgramAdminProposal />}
                          />
                          <Route path="permohonan-judul-penelitian">
                            <Route
                              index
                              element={
                                <FEStudyProgramAdminProposalApplication />
                              }
                            />
                            <Route
                              path="riwayat"
                              element={
                                <FEStudyProgramAdminProposalApplicationHistory />
                              }
                            />
                          </Route>
                          <Route path="pengajuan-judul-penelitian">
                            <Route
                              index
                              element={
                                <FEStudyProgramAdminProposalSubmission />
                              }
                            />
                            <Route
                              path="riwayat"
                              element={
                                <FEStudyProgramAdminProposalSubmissionHistory />
                              }
                            />
                          </Route>
                        </Route>
                        <Route path="penyusunan-tim-penguji">
                          <Route
                            index
                            element={
                              <FEStudyProgramAdminApprovalExaminersFraming />
                            }
                          />

                          <Route
                            path="riwayat"
                            element={
                              <FEStudyProgramAdminApprovalExaminersFramingHistory />
                            }
                          />
                        </Route>

                        <Route
                          path="penyusunan-tim-penguji/:nim"
                          element={
                            <FEStudyProgramAdminApprovalExaminersFramingDetermine />
                          }
                        />
                      </Route>
                    </Route>
                    <Route path="ktu">
                      <Route index element={<FEHomepage />} />
                      <Route path="persetujuan">
                        <Route
                          index
                          element={<FEHeadAdministratorApproval />}
                        />
                        <Route path="sk-pembimbing-dan-penguji">
                          <Route
                            index
                            element={
                              <FEHeadAdministratorMentorAndExaminersApproval />
                            }
                          />
                        </Route>
                        <Route
                          path="sk-pembimbing-dan-penguji/:nim"
                          element={
                            <FEHeadAdministratorMentorAndExaminersApprovalMore />
                          }
                        />
                        <Route
                          path="sk-pembimbing-dan-penguji/riwayat"
                          element={
                            <FEHeadAdministratorMentorAndExaminersApprovalHistory />
                          }
                        />
                        <Route path="sk-izin-ujian-sidang">
                          <Route
                            index
                            element={
                              <FEHeadAdministratorTrialPermitApprovalApplication />
                            }
                          />
                          <Route
                            path="riwayat"
                            element={
                              <FEHeadAdministratorTrialPermitApprovalHistory />
                            }
                          />
                        </Route>
                        <Route
                          path="sk-izin-ujian-sidang/:nim"
                          element={
                            <FEHeadAdministratorTrialPermitApprovalApplicationDetails />
                          }
                        />
                      </Route>
                    </Route>
                    <Route path="dekan">
                      <Route index element={<FEHomepage />} />
                      <Route path="persetujuan">
                        <Route index element={<FEDeanApproval />} />
                        <Route path="sk-pembimbing-dan-penguji">
                          <Route
                            index
                            element={<FEDeanMentorAndExaminersApproval />}
                          />

                          <Route
                            path="riwayat"
                            element={
                              <FEDeanMentorAndExaminersApprovalHistory />
                            }
                          />
                        </Route>
                        <Route
                          path="sk-pembimbing-dan-penguji/:nim"
                          element={<FEDeanMentorAndExaminersApprovalMore />}
                        />
                      </Route>
                    </Route>
                    <Route path="admin-fakultas">
                      <Route index element={<FEHomepage />} />
                      <Route path="persetujuan">
                        <Route index element={<FEFacultyAdminApproval />} />
                        <Route path="sk-pembimbing-dan-penguji">
                          <Route index element={<FEFacultyAdminProposal />} />

                          <Route path="permohonan-judul">
                            <Route
                              index
                              element={<FEFacultyAdminProposalApplication />}
                            />
                            <Route
                              path="riwayat"
                              element={
                                <FEFacultyAdminProposalApplicationHistory />
                              }
                            />
                          </Route>
                          <Route
                            path="permohonan-judul/:nim"
                            element={
                              <FEFacultyAdminProposalApplicationDetails />
                            }
                          />
                          <Route
                            path="pembuatan"
                            element={<FEFacultyAdminProposalApplication />}
                          >
                            {" "}
                          </Route>
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Routes>
              </BrowserRouter>
            </FERoleProvider>
          </ModalsProvider>
        </DataProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
