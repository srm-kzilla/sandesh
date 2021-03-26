import { template } from 'dot';

export const generateTemplateFromString = (body: string, data: unknown): string => {
  const interpolateData = template(body);
  return interpolateData(data);
};
