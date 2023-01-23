import { pdf } from "@react-pdf/renderer";
import PdfDocument from "@/pdfTemplates/fakePdf";
import { pdfTypes } from "./pdfTypes";
import longPdf from "./pdfTemplates/longPdf";
import withImage from "./pdfTemplates/withImage";
import withTable from "./pdfTemplates/withTable";

const getDocTemplate = (type: pdfTypes) => {
  switch (type) {
    case pdfTypes.long:
      return longPdf;

    case pdfTypes.table:
      return withTable;

    case pdfTypes.image:
      return withImage;

    default:
      return PdfDocument;
  }
};

addEventListener("message", async (event: MessageEvent<any>) => {
  const { type, docData = {} } = event.data;

  const Doc = getDocTemplate(type);

  const blob = await pdf(<Doc {...docData} />).toBlob();
  postMessage(blob);
});
