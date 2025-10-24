import type { AxiosError } from "axios";
import { ZodError } from "igaming-shared";

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (axiosError.message) {
      return axiosError.message;
    }
  }
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join(", ");
  }
  return "An unexpected error occurred. Please try again.";
}

export function getValidationErrors<T extends Record<string, unknown>>(
  error: unknown
): Partial<Record<keyof T, string>> {
  if (error instanceof ZodError) {
    const errors: Partial<Record<keyof T, string>> = {};
    error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof T;
      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    });
    return errors;
  }
  return {};
}
