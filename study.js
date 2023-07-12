const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getNumWords() {
  rl.question('How many words would you like to learn today? ', (numWords) => {
    if (isNaN(numWords)) {
      console.log('Please answer with a number.');
      getNumWords();
    } else {
      // once we have the user input, we can call our main function
      processLineByLine(parseInt(numWords));
      rl.close();
    }
  });
}

getNumWords();

async function processLineByLine(numWords) {
  let data = [];
  const readInterface = readline.createInterface({
      input: fs.createReadStream('remaining_words.txt'),
      output: new stream.Writable(),
      console: false
  });

  for await (const line of readInterface) {
      data.push(line);
  }

  // If the user requests more words than are left, select all remaining words
  if (numWords > data.length) {
    console.log('Congratulations! You are going to learn all the remaining words today.');
    numWords = data.length;
  }

  // Shuffle the array
  for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
  }

  // Take the specified number of elements (random lines)
  let selectedLines = data.splice(0, numWords);

  // Sort the lines by the line number (the first part of the string)
  selectedLines.sort((a, b) => {
      let aNum = parseInt(a.split('.')[0].trim());
      let bNum = parseInt(b.split('.')[0].trim());
      return aNum - bNum;
  });

  // Rewrite the remaining_words.txt without the selected lines and in order
  data.sort((a, b) => {
      let aNum = parseInt(a.split('.')[0].trim());
      let bNum = parseInt(b.split('.')[0].trim());
      return aNum - bNum;
  });
  fs.writeFileSync('remaining_words.txt', data.join('\n'));

  // Append the selected lines to learned_words.txt
  fs.appendFileSync('learned_words.txt', selectedLines.join('\n') + '\n');

  // Print selected lines to the console
  console.log('Selected lines:');
  console.log(selectedLines.join('\n'));

  // Sort lines in learned_words.txt and remove duplicates
  let file2Data = fs.readFileSync('learned_words.txt', 'utf-8').split('\n').filter(Boolean);
  file2Data = [...new Set(file2Data)];
  file2Data.sort((a, b) => {
      let aNum = parseInt(a.split('.')[0].trim());
      let bNum = parseInt(b.split('.')[0].trim());
      return aNum - bNum;
  });
  fs.writeFileSync('learned_words.txt', file2Data.join('\n') + '\n');

  // Append selected lines to learning_history.txt with day marker
  let day = 1;
  if (fs.existsSync('day_counter.txt')) {
      day = parseInt(fs.readFileSync('day_counter.txt', 'utf-8')) + 1;
  }
  fs.writeFileSync('day_counter.txt', day.toString());
  fs.appendFileSync('learning_history.txt', 'Day ' + day + '\n' + selectedLines.join('\n') + '\n\n');
}
