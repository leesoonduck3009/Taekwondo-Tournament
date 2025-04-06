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
      const response = XLSX.utils.sheet_to_json<T>(worksheet);
      // Convert to Json
      return response;
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

export class ExcelExportationService<T> {
  public exportDataToExcel(
    data: T[],
    fileName: string,
    sheetName: string
  ): Express.Multer.File {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    return {
      fieldname: "file",
      originalname: fileName,
      encoding: "utf8",
      mimetype:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      buffer,
      size: buffer.length,
    } as Express.Multer.File;
  }
  public exportDataToExcelWithMultipleSheets<T>(
    data: Map<string, T[]>,
    fileName: string
  ): { buffer: Buffer; fileName: string; mimeType: string } {
    const workbook = XLSX.utils.book_new();

    data.forEach((value, key) => {
      const worksheet = XLSX.utils.json_to_sheet(value);
      const sheetName = key.length > 31 ? key.slice(0, 31) : key;
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    return {
      buffer,
      fileName,
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
  }
}
