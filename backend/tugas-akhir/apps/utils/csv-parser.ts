// import * as fs from "node:fs";

// export function parseCSV(filename: string) {
//   const csvFile = fs.readFileSync(filename);

//   const datas = csvFile.toString().split("\n");
//   const headers = datas[0].split(",");
//   const transformedData = [];

//   for (let i = 0; i < headers.length; i++) {
//     const objectData = new Object();
//     objectData[headers[i]] = "alif";
//     transformedData.push(objectData);
//   }
// }

import csv from "csv-parser";
import fs from "fs";

export async function parseCSV(
  filenam: string,
  fn: (results: Array<any>) => void
) {
  const results: any[] = [];

  fs.createReadStream(filenam)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      fn(results);
    });
}
