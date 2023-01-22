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
import { extractDate } from "../utils/functions/date.function";

export interface IPDFBlankoNilaiSurat {
  name: string;
  nim: string;
  department: string;
  proposalTitle: string;
  score: number;
  letterDate: Date;
  mainMentorNim: string;
  sideMentorNim: string;
  season: string;
  whatSeason: "Awal" | "Akhir";
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
  group1: {
    marginTop: "10px",
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

  text1noIndent: {
    // textIndent: "",
    fontSize: "12px"
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
  }
});

const PDFBlankoNilaiSurat: React.FC<IPDFBlankoNilaiSurat> = ({
  department,
  letterDate,
  mainMentorNim,
  name,
  nim,
  proposalTitle,
  score,
  sideMentorNim,
  season,
  whatSeason
}) => {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.page} size="A4">
          <View style={styles.headerContainer}>
            <Text style={styles.header1}>
              KEMENTERIAN PENDIDIKAN, KEBUDAYAAN,
            </Text>
            <Text style={styles.header1}>RISET, DAN TEKNOLOGI</Text>
            <Text style={styles.header1}>UNIVERSITAS HASANUDDIN</Text>
            <Text style={styles.header1Block}>Fakultas Farmasi</Text>
            <Text style={styles.header2}>
              Jalan Perintis Kemerdekaan Km.10, Makassar 90245
            </Text>
            <Text style={styles.header2}>
              Telepon (0411) 588556, Faksimili (0411) 590663
            </Text>
            <Text style={styles.header2}>Laman : farmasi.unhas.ac.id</Text>
            <Image
              style={styles.hr}
              src={window.location.origin + "/images/hr.png"}
            />
            <Image
              style={styles.imageHeader}
              src={window.location.origin + "/images/logo-unhas.png"}
            />
            <View style={styles.pageTitle1}>
              <Text style={styles.header3}>Surat Keterangan</Text>
              <Text style={styles.header4}>Nilai Skripsi</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1}>
                Yang bertandatangan di bawah ini, Pembimbing Pendamping
                menerangkan bahwa:
              </Text>
            </View>
            <View style={styles.group1}>
              <View style={styles.stack}>
                <Text style={styles.textStack}>Nama</Text>
                <Text style={styles.textStack}>Stambuk</Text>
                <Text style={styles.textStack}>Jurusan</Text>
                <Text style={styles.textStack}>Judul Penelitian</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.textStack}>: {name}</Text>
                <Text style={styles.textStack}>: {nim}</Text>
                <Text style={styles.textStack}>: {department}</Text>
                <Text style={styles.textStack}>: {proposalTitle}</Text>
              </View>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1}>
                Benar mahasiswa yang bersangkutan telah menyusun Skripsi pada
                semester {whatSeason}
              </Text>
              <Text style={styles.text1noIndent}>
                {`${season}`} dan juga telah memperbaiki koreksi yang diajukan
                oleh para Dosen Penguji kepadanya dinyatakan lulus dengan nilai:
              </Text>
            </View>
            <View style={styles.scoreBody}>
              <Text style={styles.scoreBodyText}>{score}</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1}>
                Demikian surat keterangan ini diberikan kepada yang bersangkutan
                untuk digu-
              </Text>
              <Text style={styles.text1noIndent}>nakan seperlunya.</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.signPlace}>
                Makassar, {extractDate(letterDate)}
              </Text>
              <Text style={styles.text1noIndent}>Disahkan oleh :</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1center}>Pembimbing Pendamping</Text>
              <Text style={styles.titik2}>
                .....................................
              </Text>
              <Text style={styles.text1center}>NIP. {sideMentorNim}</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.scoreDescriptionTitle}>
                Keterangan Nilai:
              </Text>
              <View style={styles.group1}>
                <View style={styles.stack}>
                  <Text style={styles.scoreDescription}>{">"}85</Text>
                  <Text style={styles.scoreDescription}>81-85</Text>
                  <Text style={styles.scoreDescription}>76-80</Text>
                  <Text style={styles.scoreDescription}>71-75</Text>
                  <Text style={styles.scoreDescription}>66-70</Text>
                  <Text style={styles.scoreDescription}>61-65</Text>
                  <Text style={styles.scoreDescription}>51-60</Text>
                  <Text style={styles.scoreDescription}>45-50</Text>
                  <Text style={styles.scoreDescription}>{"<"}45</Text>
                </View>
                <View style={styles.stackML}>
                  <Text style={styles.scoreDescription}>: A</Text>
                  <Text style={styles.scoreDescription}>: A-</Text>
                  <Text style={styles.scoreDescription}>: B+</Text>
                  <Text style={styles.scoreDescription}>: B</Text>
                  <Text style={styles.scoreDescription}>: B-</Text>
                  <Text style={styles.scoreDescription}>: C+</Text>
                  <Text style={styles.scoreDescription}>: C</Text>
                  <Text style={styles.scoreDescription}>: D</Text>
                  <Text style={styles.scoreDescription}>: E</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
        <Page style={styles.page} size="A4">
          <View style={styles.headerContainer}>
            <Text style={styles.header1}>
              KEMENTERIAN PENDIDIKAN, KEBUDAYAAN,
            </Text>
            <Text style={styles.header1}>RISET, DAN TEKNOLOGI</Text>
            <Text style={styles.header1}>UNIVERSITAS HASANUDDIN</Text>
            <Text style={styles.header1Block}>Fakultas Farmasi</Text>
            <Text style={styles.header2}>
              Jalan Perintis Kemerdekaan Km.10, Makassar 90245
            </Text>
            <Text style={styles.header2}>
              Telepon (0411) 588556, Faksimili (0411) 590663
            </Text>
            <Text style={styles.header2}>Laman : farmasi.unhas.ac.id</Text>
            <Image
              style={styles.hr}
              src={window.location.origin + "/images/hr.png"}
            />
            <Image
              style={styles.imageHeader}
              src={window.location.origin + "/images/logo-unhas.png"}
            />
            <View style={styles.pageTitle1}>
              <Text style={styles.header3}>Surat Keterangan</Text>
              <Text style={styles.header4}>Nilai Skripsi</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1}>
                Yang bertandatangan di bawah ini, Pembimbing Utama menerangkan
                bahwa:
              </Text>
            </View>
            <View style={styles.group1}>
              <View style={styles.stack}>
                <Text style={styles.textStack}>Nama</Text>
                <Text style={styles.textStack}>Stambuk</Text>
                <Text style={styles.textStack}>Jurusan</Text>
                <Text style={styles.textStack}>Judul Penelitian</Text>
              </View>
              <View style={styles.stack}>
                <Text style={styles.textStack}>: {name}</Text>
                <Text style={styles.textStack}>: {nim}</Text>
                <Text style={styles.textStack}>: {department}</Text>
                <Text style={styles.textStack}>: {proposalTitle}</Text>
              </View>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1}>
                Benar mahasiswa yang bersangkutan telah menyusun Skripsi pada
                semester {whatSeason}
              </Text>
              <Text style={styles.text1noIndent}>
                {season} dan juga telah memperbaiki koreksi yang diajukan oleh
                para Dosen Penguji kepadanya dinyatakan lulus dengan nilai:
              </Text>
            </View>
            <View style={styles.scoreBody}>
              <Text style={styles.scoreBodyText}>{score}</Text>
            </View>
            <View style={styles.rubricList}>
              {/* A A- B+ B B- C+ C D E */}
              <Text style={styles.rubricText}>A</Text>
              <Text style={styles.rubricText}>A-</Text>
              <Text style={styles.rubricText}>B+</Text>
              <Text style={styles.rubricText}>B</Text>
              <Text style={styles.rubricText}>B-</Text>
              <Text style={styles.rubricText}>C+</Text>
              <Text style={styles.rubricText}>C</Text>
              <Text style={styles.rubricText}>D</Text>
              <Text style={styles.rubricText}>E</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1}>
                Demikian surat keterangan ini diberikan kepada yang bersangkutan
                untuk digu-
              </Text>
              <Text style={styles.text1noIndent}>nakan seperlunya.</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.signPlace}>
                Makassar, {extractDate(letterDate)}
              </Text>
              <Text style={styles.text1noIndent}>Disahkan oleh :</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.text1center}>Pembimbing Utama</Text>
              <Text style={styles.titik2}>
                .....................................
              </Text>
              <Text style={styles.text1center}>NIP. {mainMentorNim}</Text>
            </View>
            <View style={styles.body1}>
              <Text style={styles.scoreDescriptionTitle}>
                Keterangan Nilai:
              </Text>
              <View style={styles.group1}>
                <View style={styles.stack}>
                  <Text style={styles.scoreDescription}>{">"}85</Text>
                  <Text style={styles.scoreDescription}>81-85</Text>
                  <Text style={styles.scoreDescription}>76-80</Text>
                  <Text style={styles.scoreDescription}>71-75</Text>
                  <Text style={styles.scoreDescription}>66-70</Text>
                  <Text style={styles.scoreDescription}>61-65</Text>
                  <Text style={styles.scoreDescription}>51-60</Text>
                  <Text style={styles.scoreDescription}>45-50</Text>
                  <Text style={styles.scoreDescription}>{"<"}45</Text>
                </View>
                <View style={styles.stackML}>
                  <Text style={styles.scoreDescription}>: A</Text>
                  <Text style={styles.scoreDescription}>: A-</Text>
                  <Text style={styles.scoreDescription}>: B+</Text>
                  <Text style={styles.scoreDescription}>: B</Text>
                  <Text style={styles.scoreDescription}>: B-</Text>
                  <Text style={styles.scoreDescription}>: C+</Text>
                  <Text style={styles.scoreDescription}>: C</Text>
                  <Text style={styles.scoreDescription}>: D</Text>
                  <Text style={styles.scoreDescription}>: E</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default PDFBlankoNilaiSurat;
