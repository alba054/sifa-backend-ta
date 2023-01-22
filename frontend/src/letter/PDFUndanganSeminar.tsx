import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
  PDFViewer,
  Font
} from "@react-pdf/renderer";
import KopSurat from "./KopSurat";
import { dateToRange, extractDate, extractDay } from "../utils/functions/date.function";

// Font.register({ family: "Times-Roman", src: "Times-Roman" });
// Font.register({ group1
//   family: "Arial",
//   src: "/arial.ttf"body
// });

const styles = StyleSheet.create({
  page: {
    padding: "1.25cm 2cm"
    // backgroundColor: "red"
  },
  viewer: {
    padding: "0px",
    width: "100%", //the pdf viewer will take up all of the width and height
    height: "100vh"
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "14px",
    // backgroundColor: "blue",
    // fontFamily: "Arial",
    lineHeight: "1px",
    position: "relative"
  },
  header1: {
    textAlign: "center",
    fontSize: "14px"
  },
  header1Block: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Times-Bold"
  },
  header2: {
    textAlign: "center",
    fontSize: "12px",
    fontFamily: "Times-Roman"
  },
  header3: {
    textAlign: "center",
    fontSize: "14px",
    textDecoration: "underline",
    fontFamily: "Helvetica-Bold"
  },
  header4: {
    marginTop: "4px",
    textAlign: "center",
    fontSize: "14px",
    fontFamily: "Helvetica-Bold"
  },
  body1: {
    marginTop: "20px"
  },
  group2: {
    display: "flex",
    flexDirection: "row",
    marginTop: "4px"
  },
  group: {
    display: "flex",
    flexDirection: "row"
  },
  group1: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "row"
  },
  group3: {
    marginTop: "-10px",
    display: "flex",
    flexDirection: "row"
  },
  rubricList: {
    width: "80%",
    display: "flex",
    marginTop: "10px",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center"
  },
  rubricText: {
    fontSize: "13px",
    fontFamily: "Helvetica-Bold"
  },
  stack: {
    display: "flex",
    flexDirection: "column"
  },
  stackML: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px"
  },
  textStack: {
    fontSize: "12px",
    paddingLeft: "48px",
    marginTop: "4px"
  },

  text1noIndentW: {
    fontSize: "12px",
    minWidth: "30%"
  },
  text1noIndentWMB: {
    fontSize: "12px",
    minWidth: "30%",
    marginBottom: "4px"
  },
  text1noIndent: {
    fontSize: "12px"
  },
  text1noIndentW2: {
    fontSize: "12px",
    maxWidth: "70%"
  },
  text1noIndentMB: {
    fontSize: "12px",
    marginBottom: "2px"
  },
  text1center: {
    // textIndent: "",
    fontSize: "12px",
    alignSelf: "center"
    // letterSpacing: "0.01cm"
    // w},
  },
  text1: {
    // textIndent: "",
    fontSize: "12px",
    paddingLeft: "48px"
    // letterSpacing: "0.01cm"
    // wordSpacing: "100px"
  },
  hr: {
    width: "103%",
    marginLeft: "-0.2125cm",
    // width: "100%",
    height: "40px"
  },
  imageHeader: {
    width: "2.8cm",
    // height: "3.72cm",
    position: "absolute",
    top: "0cm"
  },
  pageTitle1: {
    marginTop: "-20px"
  },
  scoreBody: {
    marginTop: "20px",
    alignSelf: "center",
    border: "2px solid black",
    width: "70px",
    height: "40px",
    justifyContent: "center"
  },
  scoreBodyText: {
    alignSelf: "center",
    fontFamily: "Helvetica-Bold"
  },
  signPlace: {
    fontSize: "12px",
    alignSelf: "flex-end"
  },
  titik2: {
    marginTop: "80px",
    alignSelf: "center"
  },
  scoreDescriptionTitle: {
    fontSize: "11px",
    fontFamily: "Helvetica-Oblique"
  },
  scoreDescription: {
    fontSize: "11px"
  },
  signPlace2: {
    fontSize: "12px",
    alignSelf: "flex-end",
    marginRight: "94px"
  },
  signPlace3: {
    fontSize: "12px",
    marginTop: "50px"
  },
  signPlaceContainer: {
    fontSize: "12px",
    alignSelf: "flex-end",
    marginTop: "10px"
  },
  text2noIndent: {
    fontSize: "12px",
    textDecoration: "underline",
    marginBottom: "4px"
  }
});

export interface IPDFUndanganSeminar {
  name: string;
  nim: string;
  proposalTitle: string;
  letterDate: Date;
  seminarDate: Date;
  seminarTimeStart: Date;
  seminarTimeEnd: Date;
  mainMentor: string;
  sideMentor: string;
  firstExaminer: string;
  secondExaminer: string;
  mainMentorNip: string;
  sideMentorNip: string;
  firstExaminerNip: string;
  secondExaminerNip: string;
  place?: string;
  seminarCoordinator: string;
  seminarCoordinatorNip: string;
  onlinePlace?: string;
  studyProgram: string;
  letterNumber: string;
  department: string;
}

const PDFUndanganSeminar: React.FC<IPDFUndanganSeminar> = ({
  letterNumber,
  department,
  firstExaminer,
  firstExaminerNip,
  letterDate,
  mainMentor,
  mainMentorNip,
  name,
  nim,
  proposalTitle,
  secondExaminer,
  secondExaminerNip,
  seminarCoordinator,
  seminarCoordinatorNip,
  seminarDate,
  seminarTimeEnd,
  seminarTimeStart,
  sideMentor,
  sideMentorNip,
  studyProgram,
  onlinePlace,
  place
}) => {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.page} size="A4">
          <KopSurat />
          <View style={styles.headerContainer}>
            <View style={styles.group3}>
              <View style={styles.stack}>
                <Text style={styles.text1noIndentMB}>Nomor</Text>
                <Text style={styles.text1noIndentMB}>Lampiran</Text>
                <Text style={styles.text1noIndentMB}>Hal</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.text1noIndentMB}>: {letterNumber}</Text>
                <Text style={styles.text1noIndentMB}>: -</Text>
                <Text style={styles.text1noIndentMB}>: Undangan Seminar</Text>
              </View>
            </View>
            <View style={styles.group1}>
              <Text style={styles.text1noIndent}>Kepada Yth,</Text>
              <Text style={styles.text1noIndent}>
                Ketua Bapak/Ibu Dosen Departemen {department}
              </Text>
              <Text style={styles.text1noIndent}>{" "}di-</Text>
              <Text style={styles.text1noIndent}>{" "}Tempat</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1noIndentMB}>Dengan Hormat,</Text>
              <Text style={styles.text1noIndentMB}>
                Sehubungan akan diadakannya Seminar Proposal Mahasiswa
                Program Studi
              </Text>
              <Text style={styles.text1noIndent}>
                {studyProgram} Fakultas Farmasi berikut :
              </Text>
            </View>
            <View>
              <View style={styles.stack}>
                <View style={styles.group1}>
                  <Text style={styles.text1noIndentW}>NIM</Text>
                  <Text style={styles.text1noIndent}>: </Text>
                  <Text style={styles.text1noIndent}>{nim}</Text>
                </View>
                <View style={styles.group1}>
                  <Text style={styles.text1noIndentW}>Nama</Text>
                  <Text style={styles.text1noIndent}>: </Text>
                  <Text style={styles.text1noIndent}>{name}</Text>
                </View>
                <View style={styles.group1}>
                  <Text style={styles.text1noIndentW}>Judul Tugas Akhir</Text>
                  <Text style={styles.text1noIndent}>: </Text>
                  <Text style={styles.text1noIndentW2}>{proposalTitle}
                  </Text>
                </View>
                <View style={styles.group1}>
                  <Text style={styles.text1noIndentW}>Pembimbing Utama</Text>
                  <Text style={styles.text1noIndent}>: </Text>
                  <View style={styles.stack}>
                    <Text style={styles.text1noIndentMB}>
                      {mainMentor}
                    </Text>
                    <Text style={styles.text1noIndent}>
                      NIP. {mainMentorNip}
                    </Text>
                  </View>
                </View>
                <View style={styles.group1}>
                  <Text style={styles.text1noIndentW}>
                    Pembimbing Pendamping
                  </Text>
                  <Text style={styles.text1noIndent}>: </Text>
                  <View style={styles.stack}>
                    <Text style={styles.text1noIndentMB}>
                      {sideMentor}
                    </Text>
                    <Text style={styles.text1noIndent}>
                      NIP. {sideMentorNip}
                    </Text>
                  </View>
                </View>
                <View style={styles.group1}>
                  <Text style={styles.text1noIndentW}>Penguji</Text>
                  <Text style={styles.text1noIndent}>: </Text>
                  <View style={styles.stack}>
                    <View style={styles.group}>
                      <Text style={styles.text1noIndent}>1. </Text>
                      <View style={styles.stack}>
                        <Text style={styles.text1noIndentMB}>
                          {firstExaminer}
                        </Text>
                        <Text style={styles.text1noIndent}>
                          NIP. {firstExaminerNip}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.group2}>
                      <Text style={styles.text1noIndent}>2. </Text>
                      <View style={styles.stack}>
                        <Text style={styles.text1noIndentMB}>
                          {secondExaminer}
                        </Text>
                        <Text style={styles.text1noIndent}>
                          NIP. {secondExaminerNip}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.body1}>
                  <Text style={styles.text1noIndent}>
                    Maka kami mengharapkan kehadiran Bapak/Ibu untuk ikut
                    berpastisipasi di dalamnya. Seminar tersebut akan diadakan
                    pada:
                  </Text>
                  <View style={styles.group1}>
                    <View style={styles.stack}>
                      <Text style={styles.text1noIndentWMB}>Hari/Tanggal</Text>
                      <Text style={styles.text1noIndentWMB}>Pukul</Text>
                      <Text style={styles.text1noIndentWMB}>Tempat</Text>
                      <Text style={styles.text1noIndentWMB}>Akses Daring</Text>
                    </View>
                    <View style={styles.stack}>
                      <Text style={styles.text1noIndentWMB}>
                        : {extractDay(seminarDate)}, {extractDate(seminarDate)}
                      </Text>
                      <Text style={styles.text1noIndentWMB}>
                        : {dateToRange(seminarTimeStart, seminarTimeEnd)}
                      </Text>
                      <Text style={styles.text1noIndentWMB}>
                        : {place || "Hybrid (via Zoom)"}
                      </Text>
                      <Text style={styles.text1noIndentW2}>
                        :
                        {onlinePlace}
                        </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.body1}>
                  <Text style={styles.text1noIndent}>
                    Atas Perhatian dan Kehadiran Bapak/Ibu kami ucapkan terima
                    kasih.
                  </Text>
                </View>
                <View style={styles.signPlaceContainer}>
                  <Text style={styles.text1noIndentMB}>
                    Makassar, {extractDate(letterDate)}
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Koordinator Seminar
                  </Text>
                  <Text style={styles.text1noIndentMB}>Farmasi,</Text>
                  <View style={styles.signPlace3}>
                    <Text style={styles.text2noIndent}>
                      {seminarCoordinator}
                    </Text>
                    <Text style={styles.text1noIndent}>
                      NIP. {seminarCoordinatorNip}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default PDFUndanganSeminar;
