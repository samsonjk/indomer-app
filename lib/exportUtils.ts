import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportHistoryToExcel = (history: any[], sessionName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(history);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "History");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${sessionName}-history.xlsx`);
};
