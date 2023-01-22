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

export interface ITemplate {}

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

const Template: React.FC<ITemplate> = ({}) => {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.page} size="A4">
          <KopSurat />
          <View style={styles.headerContainer}>

          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default Template;
