const exampleCSV1 = [
  [1, 2, 3, 4, 5],
  ["The", "song", "remains", "the", "same."],
];

const exampleCSV2 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  [100, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  [1000, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  [10000, 2000, 30, 40, 50, 60, 70, 80, 90, 100],
];

const exampleCSV3 = [
  ["The", "song", "remains", "the", "same."],
  ["The", "song", "remains", "the", "same."],
];

// const record = {
//   "datasource1.csv": exampleCSV1,
//   "datasource2.csv": exampleCSV2,
// };

export const mockedDataSourceMap = new Map<string, string[][]>();
// mockedDataSourceMap.set("datasource1.csv", exampleCSV1);
// mockedDataSourceMap.set("datasource2.csv", exampleCSV2);

export function populateDataSourceMap() {
  // mockedDataSourceMap.set("datasource1.csv", exampleCSV1);
  // mockedDataSourceMap.set("datasource2.csv", exampleCSV2);
  // console.log("Populating map");
  mockedDataSourceMap.set("strings.csv", exampleCSV3);
}

export let datamocked: {
  [key: string]: string[][];
} = {};

datamocked["strings.csv"] = [
  ["The", "song", "remains", "the", "same."],
  ["The", "song", "remains", "the", "same."],
];

datamocked["more_strings.csv"] = [
  ["More", "strings", "for"],
  ["the", "string", "god"],
];
