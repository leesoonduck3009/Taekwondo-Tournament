import * as XLSX from "xlsx";
export type ExcelSheetWithNames<T> = {
  sheetName: string;
  data: T[];
};
export class ExcelExtractionService<T> {
  public extractDataFromExcel(file: Express.Multer.File): T[] {
    if (!file) {
      throw new Error("File is required");
    }

    try {
      // Readfile from buffer
      const workbook = XLSX.read(file.buffer, { type: "buffer" });

      // Get first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert to Json
      return XLSX.utils.sheet_to_json<T>(worksheet);
    } catch (error) {
      console.error("Error processing file:", error);
      throw new Error("Failed to extract data from Excel");
    }
  }
  public extractDataWithSheetNameFromExcel(
    file: Express.Multer.File
  ): ExcelSheetWithNames<T>[] {
    if (!file) {
      throw new Error("File is required");
    }

    try {
      // Readfile from buffer
      const workbook = XLSX.read(file.buffer, { type: "buffer" });
      const response: ExcelSheetWithNames<T>[] = [];
      // Get first sheet
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json<T>(worksheet);
        response.push({ sheetName, data });
      }

      // Convert to Json
      return response;
    } catch (error) {
      console.error("Error processing file:", error);
      throw new Error("Failed to extract data from Excel");
    }
  }
}
