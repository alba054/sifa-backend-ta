import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image
} from "@react-pdf/renderer";
import KopSurat from "./KopSurat";
import {
  dateToRange,
  extractDate,
  extractDay
} from "../utils/functions/date.function";

// Create styles footerContentRight contentTitleSubtext
export interface IPDFSuratKesediaan {
  name: string;
  nim: string;
  proposalTitle: string;
  letterDate: Date;
  seminarDate: Date;
  seminarTimeStart: Date;
  seminarTimeEnd: Date;
  place?: string;
  firstExaminer: string;
  secondExaminer: string;
  thirdExaminer: string;
  fourthExaminer: string;
}
const PDFSuratKesediaan: React.FC<IPDFSuratKesediaan> = ({
  // Create Document Component
  firstExaminer,
  fourthExaminer,
  letterDate,
  name,
  nim,
  proposalTitle,
  secondExaminer,
  seminarDate,
  seminarTimeEnd,
  seminarTimeStart,
  thirdExaminer,
  place = "Hybrid (via Zoom)"
}) => (
  <PDFViewer style={styles.viewer}>
    <Document title="PDF Sifa">
      <Page size="A4" style={styles.page}>
        <KopSurat />

        <View style={styles.content}>
          <Text style={styles.location}>
            Makassar, {extractDate(letterDate)}
          </Text>
          <View style={styles.contentTitle}>
            <Text style={styles.contentTitleText}>SURAT KESEDIAAN PENGUJI</Text>
          </View>

          <View style={styles.students}>
            <Text style={styles.headerTextContent}>
              Yang bertanda tangan dibawah ini, panitia penguji mahasiswa :
            </Text>
            <View style={styles.biodata}>
              <View style={styles.studentData}>
                <Text style={styles.data}>NIM</Text>
                <Text style={styles.data}>Nama</Text>
                {/* <Text style={styles.data}>Program Studi</Text> */}
                <Text style={styles.data}>Judul Tugas Akhir</Text>
              </View>
              <View style={styles.studentDataValue}>
                <Text style={styles.data}>: {name}</Text>
                <Text style={styles.data}>: {nim}</Text>
                <Text style={styles.data}>: {proposalTitle}</Text>
                {/* <Text style={styles.data}></Text> */}
              </View>
            </View>

            <Text style={styles.headerTextContent}>
              Menyetujui pelaksanaan seminar/ujian Seminar Proposal pada:
            </Text>
            <View style={styles.biodata}>
              <View style={styles.studentData}>
                <Text style={styles.data}>Hari/Tanggal</Text>
                <Text style={styles.data}>Pukul</Text>
                {/* <Text style={styles.data}>Program Studi</Text> */}
                <Text style={styles.data}>Tempat</Text>
              </View>
              <View style={styles.studentDataValue}>
                <Text style={styles.data}>
                  : {extractDay(seminarDate)}, {extractDate(seminarDate)}
                </Text>
                <Text style={styles.data}>
                  : {dateToRange(seminarTimeStart, seminarTimeEnd)}
                </Text>
                <Text style={styles.data}>: {place}</Text>
                {/* <Text style={styles.data}></Text> */}
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <Text style={styles.row1}>No.</Text>
                <Text style={styles.row2}>Nama Penguji </Text>
                <Text style={styles.row3}>Jabatan</Text>
                <Text style={styles.row4}>Tanda Tangan</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.row1}>1</Text>
                <Text style={styles.row2}>{firstExaminer}</Text>
                <Text style={styles.row3}>Ketua (Ex Officio)</Text>
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
                <View style={styles.row4}>
                  <Image
                    style={styles.ttdImage}
                    src={`${window.location.origin}/images/ttd_sifa.jpg`}
                  />
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.row1}>4</Text>
                <Text style={styles.row2}>{fourthExaminer}</Text>
                <Text style={styles.row3}>Anggota</Text>
                <View style={styles.row4}>
                  <Image
                    style={styles.ttdImage}
                    src={`${window.location.origin}/images/ttd_sifa.jpg`}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.footerTextContent}>
                Bila ada yang tidak hadir pada acara seminar/ujian tersebut maka
                keputusan diserahkan kepada ketua panitia tim penguji. Demikian
                surat keterangan ini dibuat untuk digunakan memperlancar
                jalannya Ujian Sidang Sarjana.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

const styles = StyleSheet.create({
  viewer: {
    width: "100vw",
    height: "100vh"
  },
  page: {
    paddingHorizontal: 52,
    paddingVertical: 30
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  kopSurat: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10
  },
  images: {
    width: 55,
    height: 65
  },
  location: {
    fontSize: 10,
    position: "absolute",
    top: 0,
    right: 0
  },
  header: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontSize: 13.5,
    width: "100%",
    paddingLeft: 16
  },
  name: {
    marginBottom: 3
  },
  faculty: {
    textTransform: "uppercase",
    marginBottom: 3,
    fontFamily: "Helvetica-Bold"
  },
  university: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "Helvetica-Bold"
  },
  line: {
    width: "100%",
    height: "3px",
    backgroundColor: "black"
  },
  contentTitle: {
    textAlign: "center",
    fontSize: 10,
    marginVertical: 25,
    fontFamily: "Helvetica-Bold"
  },
  contentTitleText: {
    marginTop: 5,
    fontSize: 12
  },
  data: {
    fontSize: 11,
    fontWeight: "bold",
    paddingLeft: 12,
    marginBottom: 10
  },
  headerTextContent: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 16
  },
  footerTextContent: {
    fontSize: 11,
    textAlign: "justify",
    marginTop: 16,
    lineHeight: "1.75px",
    letterSpacing: "0.5px",
    fontFamily: "Helvetica"
  },
  address: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  students: {
    display: "flex",
    flexDirection: "column"
  },
  biodata: {
    flexDirection: "row"
  },
  studentData: {
    width: "30%",
    fontFamily: "Helvetica"
  },
  studentDataValue: {
    width: "70%"
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between"
  },

  barcodeImage: {
    width: 90,
    height: 90
  },
  ttdImage: {
    width: 45,
    height: 45
  },

  table: {
    borderWidth: 1
  },
  tableHead: {
    flexDirection: "row",
    fontFamily: "Helvetica-Bold",
    fontSize: 12
  },
  tableRow: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 11,
    borderTop: 1
  },
  row1: {
    width: "6%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRight: 1
  },
  row2: {
    width: "45%",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRight: 1
  },
  row3: {
    width: "27%",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRight: 1
  },
  row4: {
    width: "22%",
    paddingHorizontal: 7,
    paddingVertical: 5
  }
});

export default PDFSuratKesediaan;
