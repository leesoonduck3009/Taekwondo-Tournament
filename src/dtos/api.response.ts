export type Pagination<T> = {
  items: T[];
  index: number;
  limit: number;
};
export class ApiResponse<T> {
  isSuccess?: boolean;
  data?: T;
  error?: string;
  public static success<T>(data: T): ApiResponse<T> {
    return { isSuccess: true, data };
  }
  public static error<T>(error: string): ApiResponse<T> {
    return { isSuccess: false, error };
  }
}
