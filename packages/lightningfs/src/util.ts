export function contentAsString(content: string | Uint8Array): string {
  if (Array.isArray(content)) {
    return new TextDecoder().decode(content as Uint8Array);
  }

  return content as string;
}
