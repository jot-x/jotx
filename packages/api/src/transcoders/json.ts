import { Doc } from '@jotx/core';
import { asString } from '@jotx/fs';
import { Transcoder } from '../models/transcoder';

export const encoder: <T extends Doc>(doc: T) => Uint8Array = (doc) => {
  const json = JSON.stringify(doc);
  return new TextEncoder().encode(json);
};

// Custom reviver function to convert date strings to Date objects
const customReviver = (key: string, value: any) => {
  if (typeof value === 'string') {
    const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/;

    if (dateRegex.test(value)) {
      return new Date(value);
    }
  }
  return value;
};

export const decoder: <T extends Doc>(buffer: Uint8Array) => T = (buffer) => {
  const json = asString(buffer);
  return JSON.parse(json, customReviver);
};

const trans: Transcoder = {
  encoder,
  decoder
};

export default trans;
