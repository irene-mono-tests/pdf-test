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

      worker.terminate();
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
              hiddenFrame.src = "";
              document.body.removeChild(hiddenFrame);
            };

            contentWindow.focus();

            contentWindow.print();

            worker.terminate();
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

  const printOrDownloadBasedOnScreen = ({ type, docData }: Props) => {
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setStatus(print_status.pending);

        const worker = new Worker(new URL("./pdfWorker.tsx", import.meta.url));

        worker.onmessage = (e) => {
          const link = document.createElement("a");

          link.href = URL.createObjectURL(e.data);
          link.setAttribute("download", `FileName.pdf`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          setStatus(print_status.success);

          // Clean up and remove the link
          link.parentNode?.removeChild(link);
          worker.terminate();
        };

        worker.postMessage({ type, docData });
      } else {
        iframePrint({ type, docData });
      }
    }
  };

  return { print, status, iframePrint, printOrDownloadBasedOnScreen };
};

export default usePrint;
