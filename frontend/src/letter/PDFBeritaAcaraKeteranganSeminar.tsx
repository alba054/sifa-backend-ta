import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import KopSurat from "./KopSurat";
import {
  dateToRange,
  extractDate,
  extractDay,
} from "../utils/functions/date.function";
import { getFERubric } from "../utils/functions/scoring.function";

// Create styles footerContentRight contentTitleSubtext font

// Create Document Component
export interface IPDFBeritaAcaraKeteranganSeminar {
  name: string;
  nim: string;
  proposalTitle: string;
  letterDate: Date;
  seminarDate: Date;
  seminarTimeStart: Date;
  seminarTimeEnd: Date;
  studyProgram: string;
  dean: string;
  deanNip: string;
  firstExaminer: string;
  secondExaminer: string;
  thirdExaminer: string;
  fourthxaminer: string;
  mainMentor: string;
  sideMentor: string;
  secondExaminerScore: number;
  firstExaminerScore: number;
  thirdExaminerScore: number;
  fourthxaminerScore: number;
  isPassed: boolean;
  seminarType: string;
}
const PDFBeritaAcaraKeteranganSeminar: React.FC<
  IPDFBeritaAcaraKeteranganSeminar
> = ({
  dean,
  deanNip,
  firstExaminer,
  firstExaminerScore,
  sideMentor,
  letterDate,
  name,
  nim,
  proposalTitle,
  secondExaminer,
  secondExaminerScore,
  seminarDate,
  seminarTimeEnd,
  seminarTimeStart,
  studyProgram,
  mainMentor,
  fourthxaminer,
  fourthxaminerScore,
  thirdExaminer,
  thirdExaminerScore,
  isPassed,
  seminarType,
}) => (
  <PDFViewer style={styles.viewer}>
    <Document title="PDF Sifa">
      <Page size="A4" style={styles.page}>
        <KopSurat />

        <View style={styles.content}>
          <View style={styles.contentTitle}>
            <Text style={styles.contentTitleText}>
              BERITA ACARA{" "}
              {seminarType.trim().toUpperCase() === "UJIAN SKRIPSI"
                ? "SEMINAR UJIAN SKRIPSI"
                : seminarType.toUpperCase()}
            </Text>
          </View>

          <View style={styles.students}>
            <Text style={styles.headerTextContent}>
              Pada hari ini {extractDay(seminarDate)}, tanggal{" "}
              {extractDate(seminarDate)}, pukul{" "}
              {dateToRange(seminarTimeStart, seminarTimeEnd)} WITA telah
              dilaksanakan Seminar Proposal untuk Saudara
            </Text>
            <View style={styles.biodata}>
              <View style={styles.studentData}>
                <Text style={styles.data}>NIM</Text>
                <Text style={styles.data}>Nama</Text>
                <Text style={styles.data}>Program Studi</Text>
                <Text style={styles.dataMB}>Pembimbing</Text>
                <Text style={styles.dataMB}>Penguji</Text>
                <Text style={styles.dataMT}>Judul Penelitian</Text>
              </View>
              <View style={styles.studentDataValue}>
                <Text style={styles.data}>: {nim}</Text>
                <Text style={styles.data}>: {name}</Text>
                <Text style={styles.data}>: {studyProgram}</Text>
                <View style={styles.biodata}>
                  <Text style={styles.data}>:</Text>
                  <View style={styles.stack}>
                    <Text style={styles.data2}>1. {mainMentor}</Text>
                    <Text style={styles.data2}>2. {sideMentor}</Text>
                  </View>
                </View>
                <View style={styles.biodata}>
                  <Text style={styles.data}>:</Text>
                  <View style={styles.stack}>
                    <Text style={styles.data2}>1. {firstExaminer}</Text>
                    <Text style={styles.data2}>2. {secondExaminer}</Text>
                  </View>
                </View>
                <Text style={styles.data}>: {proposalTitle}</Text>
                {/* <Text style={styles.data}></Text> */}
              </View>
            </View>

            <Text style={styles.headerTextContent2}>
              Yang dihadiri oleh panitia Seminar Proposal berikut:
            </Text>
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <Text style={styles.row1}>No.</Text>
                <Text style={styles.row2}>Nama Penguji </Text>
                <Text style={styles.row3}>Jabatan</Text>
                <Text style={styles.rowNilai}>Nilai</Text>
                <Text style={styles.row4}>Tanda Tangan</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.row1}>1</Text>
                <Text style={styles.row2}>{firstExaminer}</Text>
                <Text style={styles.row3}>Ketua (Ex Officio)</Text>
                <Text style={styles.rowNilai}>{firstExaminerScore}</Text>
                <View style={styles.row4}>
                  <Image
                    style={styles.ttdImage}
                    src={`${window.location.origin}/images/ttd_sifa.jpg`}
                  />
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.row1}>2</Text>
                <Text style={styles.row2}>{secondExaminer}</Text>
                <Text style={styles.row3}>Sekretaris (Ex Officio)</Text>
                <Text style={styles.rowNilai}>{secondExaminerScore}</Text>
                <View style={styles.row4}>
                  <Image
                    style={styles.ttdImage}
                    src={`${window.location.origin}/images/ttd_sifa.jpg`}
                  />
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.row1}>3</Text>
                <Text style={styles.row2}>{thirdExaminer}</Text>
                <Text style={styles.row3}>Anggota</Text>
                <Text style={styles.rowNilai}>{thirdExaminerScore}</Text>
                <View style={styles.row4}>
                  <Image
                    style={styles.ttdImage}
                    src={`${window.location.origin}/images/ttd_sifa.jpg`}
                  />
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.row1}>4</Text>
                <Text style={styles.row2}>{fourthxaminer}</Text>
                <Text style={styles.row3}>Anggota</Text>
                <Text style={styles.rowNilai}>{fourthxaminerScore}</Text>
                <View style={styles.row4}>
                  <Image
                    style={styles.ttdImage}
                    src={`${window.location.origin}/images/ttd_sifa.jpg`}
                  />
                </View>
              </View>
              <View style={styles.rowFooterContainer}>
                <Text style={styles.rowFooter}>
                  Keputusan panitia Seminar Proposal:
                  <Text style={styles.textBold}>
                    {" "}
                    {isPassed ? "Lulus" : "Tidak Lulus"}{" "}
                  </Text>
                  dengan nilai angka{" "}
                  {(firstExaminerScore +
                    secondExaminerScore +
                    thirdExaminerScore +
                    fourthxaminerScore) /
                    4}{" "}
                  dan huruf{" "}
                  {getFERubric(
                    (firstExaminerScore +
                      secondExaminerScore +
                      thirdExaminerScore +
                      fourthxaminerScore) /
                      4
                  )}
                  .
                </Text>
              </View>
            </View>
            <View style={styles.footer1}>
              <View>
                <Image
                  style={styles.barcodeImage}
                  src={`${window.location.origin}/images/qr.png`}
                />
              </View>
              <View>
                <View>
                  <View>
                    <View>
                      <Text style={styles.footerBottomText}>
                        Dikeluarkan di Makassar
                      </Text>
                      <Text style={styles.footerBottomText}>
                        Tanggal {extractDate(letterDate)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.footerBottomText}>Dekan</Text>
                </View>
                <View>
                  <Image
                    style={styles.ttdImage}
                    src={`${window.location.origin}/images/ttd_sifa.jpg`}
                  />
                </View>
                <View style={styles.footerTextContent}>
                  <Text>{dean}</Text>
                  <Text>NIP. {deanNip}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100vh",
  },
  page: {
    paddingHorizontal: 52,
    paddingVertical: 30,
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  kopSurat: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  images: {
    width: 55,
    height: 65,
  },
  location: {
    fontSize: 10,
    position: "absolute",
    top: 0,
    right: 0,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontSize: 13.5,
    width: "100%",
    paddingLeft: 16,
  },
  name: {
    marginBottom: 3,
  },
  faculty: {
    textTransform: "uppercase",
    marginBottom: 3,
    fontFamily: "Helvetica-Bold",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
  },
  university: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "Helvetica-Bold",
  },
  line: {
    width: "100%",
    height: "3px",
    backgroundColor: "black",
  },
  footerBottomText: {
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  contentTitle: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
  },
  contentTitleText: {
    fontSize: 12,
  },
  data: {
    fontSize: 11,
    fontWeight: "bold",
    paddingLeft: 12,
    marginBottom: 4,
  },
  data2: {
    fontSize: 11,
    fontWeight: "bold",
    paddingLeft: 1,
    marginBottom: 4,
  },
  headerTextContent: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 10,
  },
  headerTextContent2: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 8,
  },
  footerTextContent: {
    fontSize: 11,
    textAlign: "justify",
    marginTop: 0,
    lineHeight: "1.75px",
    letterSpacing: "0.5px",
    fontFamily: "Helvetica",
  },
  address: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  students: {
    display: "flex",
    flexDirection: "column",
  },
  biodata: {
    flexDirection: "row",
  },
  dataMT: {
    fontSize: 11,
    fontWeight: "bold",
    paddingLeft: 12,
    marginTop: 1,
  },
  dataMB: {
    fontSize: 11,
    fontWeight: "bold",
    paddingLeft: 12,
    marginBottom: 19,
  },
  studentData: {
    width: "30%",
    fontFamily: "Helvetica",
  },
  studentDataValue: {
    width: "70%",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between",
  },
  footer1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
  },

  barcodeImage: {
    width: 90,
    height: 90,
  },
  ttdImage: {
    width: 45,
    height: 45,
  },

  table: {
    borderWidth: 1,
  },
  tableHead: {
    flexDirection: "row",
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 11,
    borderTop: 1,
  },
  row1: {
    width: "6%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRight: 1,
  },
  row2: {
    width: "35%",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRight: 1,
  },

  rowFooter: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontSize: 11,
  },
  rowFooterContainer: {
    width: "100%",
    // borderRight: 1,
    borderTop: 1,
    // borderLeft: 1,
    // borderBottom: 1
  },
  rowNilai: {
    width: "10%",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRight: 1,
  },
  row3: {
    width: "27%",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRight: 1,
  },
  row4: {
    width: "22%",
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
});

export default PDFBeritaAcaraKeteranganSeminar;
