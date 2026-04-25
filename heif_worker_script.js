importScripts('./heic_for_importScripts.js');
(async()=>{
  const fn=await heic;
  onmessage=async({data})=>{
    const res=fn(data);
    postMessage(res,[res.rgba.buffer]);
  }
  postMessage('ready');
})();