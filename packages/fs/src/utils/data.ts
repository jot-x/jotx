export function asString(content: string | Uint8Array): string {
  if (ArrayBuffer.isView(content)) {
    return new TextDecoder().decode(content as Uint8Array);
  }

  return content as string;
}
