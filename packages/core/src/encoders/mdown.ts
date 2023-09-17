import { Doc } from '../models/doc';
import yaml from 'js-yaml';

export function encode<T extends Doc & { header: unknown }>(doc: T): Buffer {
  yaml.load();
}
