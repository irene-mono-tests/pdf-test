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

  const iframePrint = ({ type, docData }: Props) => {
    if (typeof document !== "undefined") {
      setStatus(print_status.pending);

      const worker = new Worker(new URL("./pdfWorker.tsx", import.meta.url));

      worker.onmessage = (e) => {
        setStatus(print_status.success);

        const hiddenFrame = document.createElement("iframe");

        hiddenFrame.style.position = "fixed";
        hiddenFrame.style.right = "0";
        hiddenFrame.style.bottom = "0";
        hiddenFrame.style.width = "0";
        hiddenFrame.style.height = "0";
        hiddenFrame.style.border = "0";

        hiddenFrame.src = URL.createObjectURL(e.data);

        hiddenFrame.onload = () => {
          const contentWindow = hiddenFrame.contentWindow;

          if (contentWindow) {
            contentWindow.onbeforeunload = () => {
              document.body.removeChild(hiddenFrame);
            };

            contentWindow.onafterprint = () => {
              document.body.removeChild(hiddenFrame);
            };

            contentWindow.focus();

            contentWindow.print();
          }
        };

        document.body.appendChild(hiddenFrame);
      };

      worker.onerror = (e) => {
        setStatus(print_status.error);
        console.error(e);
      };

      worker.postMessage({ type, docData });
    }
  };

  return { print, status, iframePrint };
};

export default usePrint;
