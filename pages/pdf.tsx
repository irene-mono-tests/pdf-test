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
      <button
        className=" bg-green-600 px-5 text-white p-1 inline-block my-2 rounded-sm"
        onClick={() => print({ type: pdfTypes.image })}
      >
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
      <p>
        Breaks on mozilla due to security stuff, use printr or comment out{" "}
        <code>.onafterprint</code> and <code>.onbeforeunload</code>{" "}
      </p>

      <p>Consider set timeout to clear stale iframe references</p>

      <p>Still weird on mobile</p>
      <button
        className=" bg-green-600 px-5 text-white p-1 inline-block my-2 rounded-sm"
        onClick={() => print({ type: pdfTypes.image })}
      >
        {status === print_status.pending ? "Generating..." : "Print"}
      </button>
    </article>
  );
};

const PrintBasedOnOs = () => {
  const { printOrDownloadBasedOnScreen: print, status } = usePrint();

  return (
    <article>
      <h3>With Images (mobile hack?)</h3>

      <p>Mobile hack is just downloading as pdf and not printing</p>

      <button
        className=" bg-green-600 px-5 text-white p-1 inline-block my-2 rounded-sm"
        onClick={() => print({ type: pdfTypes.image })}
      >
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
      <button
        className=" bg-green-600 px-5 text-white p-1 inline-block my-2 rounded-sm"
        onClick={() => print({ type: pdfTypes.long })}
      >
        {status === print_status.pending ? "Generating..." : "Print"}
      </button>
    </article>
  );
};

const LongTable = () => {
  const { printOrDownloadBasedOnScreen: print, status } = usePrint();

  return (
    <article>
      <h3>Long Table Pdf - custom local font and page numbers</h3>

      <p>
        Remote fonts will <strong>not</strong> work
      </p>
      <button
        className=" bg-green-600 px-5 text-white p-1 inline-block my-2 rounded-sm"
        onClick={() => print({ type: pdfTypes.table })}
      >
        {status === print_status.pending ? "Generating..." : "Print"}
      </button>
    </article>
  );
};

const Pdf = () => {
  const { print, status } = usePrint();

  return (
    <div className="grid gap-1  my-2 grid-cols-2 min-h-screen place-content-center content-center p-3 ">
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

      <article>
        <h3>Nothing to see here</h3>
      </article>
    </div>
  );
};

export default Pdf;
