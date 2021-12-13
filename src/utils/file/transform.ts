export function dataURLtoBlob(dataurl: string) {
  let arr = dataurl.split(","),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  let x = arr[0].match(/:(.*?);/)
  let mime =x?x[1]:''
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
