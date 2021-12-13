// import FileSaver from 'file-saver'
// import axios from 'axios'

// export function downloadPDF() {
//     const PDFFile = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
//     const PDFFileName = '测试pdf'
//     FileSaver.saveAs(PDFFile, PDFFileName)
// }
// export function downloadImg() {
//     const ImgFile = 'http://bpic.588ku.com/element_origin_min_pic/18/08/24/05dbcc82c8d3bd356e57436be0922357.jpg'
//     const ImgFileName = '测试jpg'
//     FileSaver.saveAs(ImgFile, ImgFileName)
// }
// export async function downloadBlob(url:string) {
//     // 注：如要下载后台的blob文件流，必须在axios请求配中添加responseType: 'blob'，否则解析失败！！！
//     const res = await axios.get(url, {
//         responseType: 'blob'
//     })
//     const blobName = '二进制文件'
//     FileSaver.saveAs(res, blobName)
// }
