import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const withTable = () => {
  return (
    <Document>
      <Page>
        <Text>Table</Text>
      </Page>
    </Document>
  );
};

export default withTable;
