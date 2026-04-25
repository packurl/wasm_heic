const url=new URL('heic.wasm',import.meta.url);
await (await fetch(url)).arrayBuffer();
const worker=await new Promise(r=>{
  // For browsers that don't support type: module on workers (firefox < 114, safari < 15)
  // const worker=new Worker(new URL('./heif_worker_script.js',import.meta.url));
  const worker=new Worker(new URL('./heic_worker_script.mjs',import.meta.url),{type:'module'});
  worker.onmessage=msg=>{
    if(msg.data==='ready'){
      worker.onmessage=null;
      r(worker);
    }
  };
});
/**
 * @typedef {Record<string,any>} DecodedRgbaImage
 * @property {number} width
 * @property {number} height
 * @property {Uint8Array} rgba
 */
/**
 * Decodes the bytes from a heic photo to rgba.
 * @param {Uint8Array} bytes
 * @return {Promise<DecodedRgbaImage>}
 */
const heic=(bytes)=>new Promise(r=>{
  worker.onmessage=msg=>{
    worker.onmessage=null;
    r(msg.data);
  }
  worker.postMessage(bytes);
});

export {heic};
export default heic;
