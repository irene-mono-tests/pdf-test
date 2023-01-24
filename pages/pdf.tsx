import Example from "../pdfTemplates/example";

import dynamic from "next/dynamic";
import usePrint, { print_status } from "@/usePrint";
import { pdfTypes } from "@/pdfTypes";

const PDFLink = dynamic(() => import("../pdfTemplates/PDFLink"), {
  ssr: false,
});

const ImageSec = () => {
  const { print, status } = usePrint();

  return (
    <article>
      <h3>With Images</h3>
      <button onClick={() => print({ type: pdfTypes.image })}>
        {status === print_status.pending ? "Generating..." : "Print"}
      </button>
    </article>
  );
};

const IframePrint = () => {
  const { iframePrint: print, status } = usePrint();

  return (
    <article>
      <h3>With Images (Iframe)</h3>
      <button onClick={() => print({ type: pdfTypes.image })}>
        {status === print_status.pending ? "Generating..." : "Print"}
      </button>
    </article>
  );
};

const PrintBasedOnOs = () => {
  const { printOrDownloadBasedOnScreen: print, status } = usePrint();

  return (
    <article>
      <h3>With Images (Iframe+ mobile hack?)</h3>
      <button onClick={() => print({ type: pdfTypes.image })}>
        {status === print_status.pending ? "Generating..." : "Print"}
      </button>
    </article>
  );
};

const LongPdfFixedImage = () => {
  const { printOrDownloadBasedOnScreen: print, status } = usePrint();

  return (
    <article>
      <h3>Long Pdf with fixed image on each page</h3>
      <button onClick={() => print({ type: pdfTypes.long })}>
        {status === print_status.pending ? "Generating..." : "Print"}
      </button>
    </article>
  );
};

const LongTable = () => {
  const { printOrDownloadBasedOnScreen: print, status } = usePrint();

  return (
    <article>
      <h3>Long Table Pdf - custom font and page numbers</h3>
      <button onClick={() => print({ type: pdfTypes.table })}>
        {status === print_status.pending ? "Generating..." : "Print"}
      </button>
    </article>
  );
};

const Pdf = () => {
  const { print, status } = usePrint();

  return (
    <div className="grid gap-2 grid-cols-2 min-h-screen place-content-center content-center p-3 ">
      <article>
        <h3>Base example</h3>

        <PDFLink Template={Example} />
      </article>

      <article>
        <h3>Test web worker</h3>
        <button
          onClick={() =>
            print({ type: pdfTypes.receipt, docData: { value: 100 } })
          }
        >
          {status === print_status.pending ? "Generating..." : "Print"}
        </button>
      </article>

      <ImageSec />

      <IframePrint />

      <PrintBasedOnOs />

      <LongPdfFixedImage />

      <LongTable />
    </div>
  );
};

export default Pdf;
