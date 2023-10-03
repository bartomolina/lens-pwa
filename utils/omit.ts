// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import omitDeep from "omit-deep";

export const omit = (object: any, name: string) => {
  return omitDeep(object, name);
};
