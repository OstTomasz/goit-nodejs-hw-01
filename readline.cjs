const readline = require("readline");
const fs = require("fs").promises;
const { program } = require("commander");
require("colors");
program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Wprowadź liczbę!".red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log("Liczba powinna znajdować się w przedziale od 1 do 10".red);
    return false;
  }
  return true;
};

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Udało się zapisać rezultat w pliku ${logFile}`.green);
  } catch (err) {
    console.log(`Nie udało się zapisać pliku ${logFile}`.red);
  }
};

const game = () => {
  rl.question(
    "Wprowadź liczbę od 1 do 10, aby zgadywać: ".yellow,
    async (value) => {
      value = Number.parseInt(value, 10);
      if (!isValid(value)) {
        game();
        return;
      }
      count += 1;
      if (value === mind) {
        console.log("Gratulacje. Odgadłeś liczbę za %d razem".green, count);
        await log(
          `${new Date().toLocaleDateString()}: Gratulacje. Odgadłeś liczbę za ${count} razem`
        );
        rl.close();
        return;
      }
      console.log("Nie zgadłeś. Kolejna próba.".red);
      game();
    }
  );
};

game();
