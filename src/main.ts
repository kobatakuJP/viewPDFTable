import pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  './vendors~pdfjsWorker.js';

makeCanvas();

const loadingTask = pdfjsLib.getDocument("./grand_kids.pdf");
loadingTask.promise.then(async doc => {
  // const num = doc.numPages;
  const num = 1;
  const cvs = getCanvas();
  const ctx = getContext();
  for (let i = 1; i <= num; i++) {
    const page = await doc.getPage(i)
    const width = page.view[2] - page.view[0];
    const wratio = cvs.width / width;
    const height = page.view[3] - page.view[1];
    const hratio = cvs.height / height;
    const text = await page.getTextContent();
    for (let i2 = 0, l2 = text.items.length; i2 < l2; i2++) {
      const item = text.items[i2];
      const x = item.transform[4] * wratio;
      const y = (page.view[3] - item.transform[5]) * hratio;
      ctx.font = `${item.transform[0]}px 'ＭＳ ゴシック'`;
      ctx.fillText(item.str, x, y);
    }
  }
})


function makeCanvas() {
  const can = document.createElement("canvas");
  can.id = "can";
  can.style.width = "1000px";
  can.style.height = "1000px";
  document.body.appendChild(can);
}

function getCanvas() {
  return <HTMLCanvasElement>document.getElementById("can");
}

function getContext() {
  return getCanvas().getContext("2d");
}

/** https://github.com/mozilla/pdf.js/issues/5643#issuecomment-239993212 */
function convertToCanvasCoords(x: number, y: number, width: number, height: number, cvs: HTMLCanvasElement) {
  return [x, cvs.height - ((y + height)), width, height];
}