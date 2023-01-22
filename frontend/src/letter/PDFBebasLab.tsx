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
import { extractDate } from "../utils/functions/date.function";

// Create styles
export interface IPDFBebasLab {
  name: string;
  letterNumber: string;
  nim: string;
  faculty?: string;
  labHead: string;
  labHeadNip: string;
  laboratory?: string;
  letterDate: Date;
}

// Create Document Component
const PDFBebasLab: React.FC<IPDFBebasLab> = ({
  faculty="Farmasi",
  labHead,
  labHeadNip,
  laboratory,
  letterDate,
  letterNumber,
  name,
  nim
}) => (
  <PDFViewer style={styles.viewer}>
    <Document title="PDF Sifa">
      <Page size="A4" style={styles.page}>
        <KopSurat />
        <View style={styles.content}>
          <View style={styles.contentTitle}>
            <Text style={styles.contentTitleText}>SURAT KETERANGAN</Text>
            <Text>No. {letterNumber}</Text>
          </View>

          <View style={styles.students}>
            <Text style={styles.headerTextContent}>
              Yang bertanda tangan dibawah ini, Kepada Kepala Laboratorium
              Fakultas Farmasi, menerangkan bahwa :
            </Text>
            <View style={styles.biodata}>
              <View style={styles.studentData}>
                <Text style={styles.data}>Nama</Text>
                <Text style={styles.data}>No. Pokok</Text>
                {/* <Text style={styles.data}>Program Studi</Text> */}
                <Text style={styles.data}>Fakultas</Text>
              </View>
              <View style={styles.studentData}>
                <Text style={styles.data}>: {name}</Text>
                <Text style={styles.data}>: {nim}</Text>
                <Text style={styles.data}>: {faculty}</Text>
                {/* <Text style={styles.data}></Text> */}
              </View>
            </View>
            <View>
              <Text style={styles.footerTextContent}>
                Benar Mahasiswa (i) tersebut tidak mempunyai pinjaman berupa
                alat-alat Laboratorium Fakultas Farmasi Universitas Hasanuddin
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Image
              style={styles.barcodeImage}
              src={`${window.location.origin}/images/qr.png`}
            />
          </View>
          <View>
            <View style={styles.headerTextContent}>
              <Text>Makassar, {extractDate(letterDate)}</Text>
              <Text>Kepala laboratorium</Text>
            </View>
            <View>
              <Image
                style={styles.ttdImage}
                src={`${window.location.origin}/images/ttd_sifa.jpg`}
              />
            </View>
            <View style={styles.footerTextContent}>
              <Text>{labHead}</Text>
              <Text>NIP. {labHeadNip}</Text>
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
    paddingHorizontal: 65,
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
    width: 50,
    height: 60
  },
  header: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontSize: 12,
    width: "100%"
  },
  name: {
    marginBottom: 3
  },
  faculty: {
    textTransform: "uppercase",
    marginBottom: 3
  },
  university: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 3
  },
  line: {
    width: "100%",
    height: "3px",
    backgroundColor: "black"
  },
  contentTitle: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 25,
    fontFamily: "Helvetica-Bold"
  },
  contentTitleText: {
    textDecoration: "underline",
    marginBottom: 3
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
    marginTop: 16
  },
  address: {
    fontSize: 9
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
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 30,
    fontFamily: "Helvetica-Bold"
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
    width: 70,
    height: 70
  }
});

export default PDFBebasLab;
