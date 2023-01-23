import { PDFDownloadLink } from "@react-pdf/renderer";

import React from "react";

const PDFLink = ({ Template }: { Template: any }) => {
  return (
    <PDFDownloadLink document={<Template />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  );
};

export default PDFLink;
