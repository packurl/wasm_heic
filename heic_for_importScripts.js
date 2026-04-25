const heic=(async()=>{
  let wasm;
  const imports={};
  const {instance}=await WebAssembly.instantiateStreaming(await fetch('./heic.wasm',{cache:'force-cache'}),imports);
  wasm=instance.exports;
  const malloc=wasm.__wbindgen_malloc;
  const free=wasm.__wbindgen_free;
  return bytes=>{
    const n1=bytes.length;
    const p1=malloc(n1,1);
    new Uint8Array(wasm.memory.buffer).set(bytes,p1);
    const r=wasm.decode_rgba(p1,n1);
    const ptr_len_w_h=new DataView(wasm.memory.buffer,r,12);
    const p2=ptr_len_w_h.getUint32(0,true);
    const n2=ptr_len_w_h.getUint32(4,true);
    const width=ptr_len_w_h.getUint16(8,true);
    const height=ptr_len_w_h.getUint16(10,true);
    const rgba=new Uint8Array(wasm.memory.buffer).subarray(p2,p2+n2).slice();
    free(p1,n1);
    free(p2,n2);
    return {width,height,rgba};
  };
})();
