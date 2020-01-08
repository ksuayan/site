import util from 'util';
import fs from 'fs';
import readline from 'readline';
import lineParser from './line-parser';
import analyze from './analyze';


const debug = (obj) => {
  return util.inspect(obj, {showHidden: false, depth: null});
};


class FileReader {

  constructor(filename, skipCount) {
    this.filename = filename;
    this.skipCount = skipCount;
  }

  parseLine(line, index) {
    const obj = lineParser.parseAviva(line);
    // console.log(`>> ${index}: ${debug(obj)}`);
    return obj;
  }

  readFile() {
    let i = 0, results = [];
    let lineReader = readline.createInterface({
      input: fs.createReadStream(this.filename)
    });
    
    console.log(`source: ${this.filename} skip: ${this.skipCount}`);

    lineReader.on('line', (line) => {
      i++;
      if (i <= this.skipCount) {
        console.log(`skipped ${i}: ${line}`);
      } else {
        const obj = this.parseLine(line, i);
        if (obj && obj.timestamp&& obj.value) {
          results.push(obj);
        } else {
          console.log(`wut? ${debug(obj)}`);
        }
      }
    });

    lineReader.on('close', () => {
      console.log("------ end of file -------");
      const stat1 = analyze.analyzeDaysAgo(results, 7);
      console.log(stat1);
    });

  }
}

let reader = new FileReader('diary.csv', 3);
reader.readFile();