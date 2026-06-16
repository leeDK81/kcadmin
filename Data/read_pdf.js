const fs = require('fs');
const pdfParse = require('./node_modules/pdf-parse');

const files = ['maydata_date.pdf', 'promage_data.pdf'];

async function run() {
  for (const file of files) {
    console.log('\n========== ' + file + ' ==========');
    try {
      const buf = fs.readFileSync(file);
      const data = await pdfParse(buf);
      console.log('Pages:', data.numpages);
      console.log('Text:\n' + data.text);
    } catch(e) {
      console.log('ERROR:', e.message);
    }
  }
}

run();
