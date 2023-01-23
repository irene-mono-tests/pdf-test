import React, { useEffect, useState } from "react";
import prntr from "prntr";
import { pdfTypes } from "./pdfTypes";

export const enum print_status {
  idle = "idle",
  pending = "pending",
  success = "success",
  error = "error",
}

interface Props {
  type: pdfTypes;
  docData?: any;
}

const usePrint = () => {
  const [status, setStatus] = useState(print_status.idle);

  const print = ({ type, docData }: Props) => {
    setStatus(print_status.pending);

    const worker = new Worker(new URL("./pdfWorker.tsx", import.meta.url));

    worker.onmessage = (e) => {
      setStatus(print_status.success);

      prntr({
        frameId: "uniquePdfId",
        printable: URL.createObjectURL(e.data),
        type: "pdf",
      });
    };

    worker.onerror = (e) => {
      setStatus(print_status.error);
      console.error(e);
    };

    worker.postMessage({ type, docData });
  };

  return { print, status };
};

export default usePrint;
