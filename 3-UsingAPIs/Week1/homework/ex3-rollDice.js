'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/3-UsingAPIs/Week1#exercise-3-roll-a-dice

- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDice()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDice()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

function rollDice() {
  return new Promise((resolve, reject) => {
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log(`Dice scheduled for ${randomRollsToDo} rolls...`);
    const rollOnce = (roll) => {
      // Compute a random dice value for the current roll
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Dice value is now: ${value}`);
      // Use callback to notify that the dice rolled off the table after 6 rolls
      if (roll > 6) {
        reject(Error('Oops... Dice rolled off the table.'));
      }
      // Use callback to communicate the final dice value once finished rolling
      else if (roll === randomRollsToDo) {
        resolve(value);
      }
      // Schedule the next roll todo until no more rolls to do
      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
      }
    };
    rollOnce(1);
  });
  // Compute a random number of rolls (3-10) that the dice MUST complete
}
rollDice()
  .then((value) => {
    console.log(`Success! Dice settled on ${value}.`);
  })
  .catch((error) => {
    console.log(error);
  });
/*
Mine is actually still acting the same. 
However, I assume it has something to do with setTimeout function. 
Because in the previous version, I put setTimeout in one of the resolved promises. 
Then the dice stops at where the error was and stopped rolling. 
**/
function wasteTime() {
  let count = 0;
  const timer = setInterval(() => {
    count += 1;
    console.log('count =', count);
    if (count > 1000) {
      clearInterval(timer);
    }
  }, 0);
}
wasteTime();

// ! Do not change or remove the code below
module.exports = rollDice;
