import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    flexWrap: "wrap",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = ({ value }: { value: number }) => (
  <Document>
    <Page size="C6" style={styles.page} orientation="landscape">
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2 {value}</Text>
      </View>

      <View style={styles.section}>
        <Text>Section #2 {value}</Text>
      </View>

      <View style={styles.section}>
        <Text>Section #2 {value}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
