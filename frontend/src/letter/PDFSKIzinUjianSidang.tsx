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
import { extractDate } from "../utils/functions/date.function";

export interface IPDFSKIzinUjianSidang {
  name: string;
  nim: string;
  department: string;
  faculty?: string;
  checkList: boolean[];
  firstViceDean: string;
  firstViceDeanNip: string;
  letterDate: Date;
}

// Font.register({ family: "Times-Roman", src: "Times-Roman" });
// Font.register({
//   family: "Arial",
//   src: "/arial.ttf"
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
    fontFamily: "Times-Bold"
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
  body2: {
    marginTop: "20px"
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
  group1Apart: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  group2: {
    marginTop: "20px",
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
  stackBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2px"
  },
  stack1: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px"
  },
  stack2: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px"
  },
  stackML: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px"
  },
  textStack: {
    fontSize: "12px",
    marginTop: "4px",
    fontFamily: "Times-Roman"
  },
  text1noIndent: {
    // textIndent: "",
    fontSize: "12px",
    fontFamily: "Times-Roman"
    // letterSpacing: "0.01cm"
    // w},
  },
  text2noIndent: {
    fontSize: "12px",
    fontFamily: "Times-Roman",
    textDecoration: "underline",
    marginBottom: "4px"
  },
  text1noIndentMB: {
    // textIndent: "",
    fontSize: "12px",
    fontFamily: "Times-Roman",
    marginBottom: "4px"
    // letterSpacing: "0.01cm"
    // w},
  },
  // text1nip:{
  //   fontSize: "12px",
  //   alignSelf: "center",
  //   marginRight: "124px"
  // },
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
    alignSelf: "flex-end",
    fontFamily: "Times-Roman",
    marginTop: "4px"
  },
  signPlace2: {
    fontSize: "12px",
    alignSelf: "flex-end",
    fontFamily: "Times-Roman",
    marginRight: "94px"
  },
  signPlace3: {
    fontSize: "12px",
    alignSelf: "flex-end",
    fontFamily: "Times-Roman",
    marginTop: "60px"
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
  box: {
    width: "12px",
    height: "12px",
    border: "1px solid black",
    marginBottom: "4px"
  }
});

const PDFSKIzinUjianSidang: React.FC<IPDFSKIzinUjianSidang> = ({
  department,
  faculty="Farmasi",
  name,
  nim,
  checkList,
  firstViceDean,
  firstViceDeanNip,
  letterDate
}) => {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.page} size="A4">
          <KopSurat />
          <View style={styles.headerContainer}>
            <View style={styles.pageTitle1}>
              <Text style={styles.header3}>
                Surat Pengantar Berkas Ujian Sidang
              </Text>
            </View>
            <View style={styles.group2}>
              <View style={styles.stack}>
                <Text style={styles.textStack}>NAMA</Text>
                <Text style={styles.textStack}>NIM</Text>
                <Text style={styles.textStack}>FAKULTAS</Text>
                <Text style={styles.textStack}>PROGRAM STUDI</Text>
              </View>
              <View style={styles.stack2}>
                <Text style={styles.textStack}>: {name}</Text>
                <Text style={styles.textStack}>: {nim}</Text>
                <Text style={styles.textStack}>: {faculty}</Text>
                <Text style={styles.textStack}>
                  : STRATA SATU {department.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.body2}>
              <Text style={styles.text1noIndent}>
                Telah memenuhi syarat bebas untuk pengurusan Surat Persetujuan
                Ujian Sidang Sarjana dengan susunan sebagai berikut :
              </Text>
            </View>
            <View style={styles.group1Apart}>
              <View style={styles.group}>
                <View style={styles.stack}>
                  <Text style={styles.text1noIndentMB}>1.</Text>
                  <Text style={styles.text1noIndentMB}>2.</Text>
                  <Text style={styles.text1noIndentMB}>3.</Text>
                  <Text style={styles.text1noIndentMB}>4.</Text>
                  <Text style={styles.text1noIndentMB}>5.</Text>
                  <Text style={styles.text1noIndentMB}>6.</Text>
                  <Text style={styles.text1noIndentMB}>7.</Text>
                  <Text style={styles.text1noIndentMB}>8.</Text>
                  <Text style={styles.text1noIndentMB}>9.</Text>
                  <Text style={styles.text1noIndentMB}>10.</Text>
                  <Text style={styles.text1noIndentMB}>11.</Text>
                  <Text style={styles.text1noIndentMB}>12.</Text>
                  <Text style={styles.text1noIndentMB}>13.</Text>
                  <Text style={styles.text1noIndentMB}>14.</Text>
                  <Text style={styles.text1noIndentMB}>15.</Text>
                  <Text style={styles.text1noIndentMB}>16.</Text>
                  <Text style={styles.text1noIndentMB}>17.</Text>
                  <Text style={styles.text1noIndentMB}>18.</Text>
                  <Text style={styles.text1noIndentMB}>19.</Text>
                </View>
                <View style={styles.stack2}>
                  <Text style={styles.text1noIndentMB}>
                    Kartu Rencana Studi (KRS) Terakhir
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bukti Pembayaran SPP Terakhir
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bukti Klirins SPP/UKT
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Kartu Kontrol Pembimbingan Melampirkan Log Book Penelitian
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Pinjaman Buku dari Perpustakaan Pusat
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Pustaka dari Perpustakaan Fakultas
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Biofarmaka
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Biofarmasi
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Fitokimia
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Mikrobiologi Farmasi
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Farmasetika
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Kimia Farmasi
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Farmakologi-Toksikologi
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Farmakognosi
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Bebas Alat dari Laboratorium Farmasi Klinik
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Academic Record dan KHS
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Pas Poto Hitam Putih (Terbaru) ukuran 4 x 6 = 3 lbr ; 3 x 4
                    = 3 lbr
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    Poto copy Ijazah Terakhir (SMA) yang dilegalisir 2 lbr
                  </Text>
                  <Text style={styles.text1noIndentMB}>
                    SK Pembimbing dan SK Penguji
                  </Text>
                </View>
              </View>
              <View style={styles.stackBox}>
                {checkList.map((checked: boolean, e: number) => {
                  return (
                    <View style={styles.box}>
                      {checked ? (
                        <Image
                          src={window.location.origin + "/images/check.png"}
                        />
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={styles.stack1}>
              <Text style={styles.signPlace}>Makassar, {extractDate(letterDate)}</Text>
              <Text style={styles.signPlace}>
                Wakil Dekan Bidang Akademik dan
              </Text>
              <Text style={styles.signPlace2}>Kemahasiswaan</Text>
              <View style={styles.signPlace3}>
                <Text style={styles.text2noIndent}>
                  {firstViceDean}
                </Text>
                <Text style={styles.text1noIndent}>
                  NIP. {firstViceDeanNip}
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default PDFSKIzinUjianSidang;
