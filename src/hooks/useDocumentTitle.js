import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `Trekkart Store | ${title}`;
  }, [title]);
};