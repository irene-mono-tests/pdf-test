import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const longPdf = () => {
  return (
    <Document>
      <Page>
        <Text>LongPdf</Text>
      </Page>
    </Document>
  );
};

export default longPdf;
