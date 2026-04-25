/* tslint:disable */
/* eslint-disable */
declare module 'heic' {
  /**
   * @typedef {Record<string,any>} DecodedRgbaImage
   * @property {number} width
   * @property {number} height
   * @property {Uint8Array} rgba
   */
  export type DecodedRgbaImage = {
    width: number;
    height: number;
    rgba: Uint8Array;
  }

  /**
   * Decodes the bytes from a heic photo to rgba.
   * @param {Uint8Array} bytes
   * @return {DecodedRgbaImage}
   */
  export function heic(bytes: Uint8Array): DecodedRgbaImage;

  export default heic;
}
