export function decodeBase64(base64: string) {
  const buffer = Buffer.from(base64, "base64");

  return buffer;
}
