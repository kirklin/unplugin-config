export function sanitizeString(str: string): string {
  // Replace invalid characters with an empty string
  const sanitized = str.replace(/[^\w.-]/g, "");
  // Trim any remaining whitespace
  return sanitized.trim().replace(/-/g, "__");
}
