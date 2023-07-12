# Vocabulary Learning Aid: Oxford 2000 Word Selector

This simple, interactive Node.js script is designed to assist with vocabulary learning. It uses the Oxford 2000 Word List (core word list for advanced learners of English including 2000 words for learners at B2-C1 level), selecting a user-specified number of words each day for focused study. 

## How It Works

When run, the script prompts the user to specify how many words they want to learn that day. It then randomly selects the specified number of words from the Oxford 2000 Word List file (`remaining_words.txt`). 

The selected words are subsequently removed from `remaining_words.txt` and added to both `learned_words.txt` and `learning_history.txt`. 

In `learned_words.txt`, the selected words are maintained in alphabetical order. If a word already exists in the list (potentially due to manual changes), it will not be duplicated.

`learning_history.txt` serves as a learning diary, preserving a chronological record of the words learned each day. Each day's learned words are distinguished by a day marker (e.g., 'Day 1', 'Day 2', etc.). The current day count is stored in `day_counter.txt` and is incremented each time the script runs.

If the user's daily word goal exceeds the number of words remaining in `remaining_words.txt`, the script will select all remaining words and display a congratulatory message.

## How to Use

1. Ensure Node.js is installed on your system.
2. Populate the `remaining_words.txt` file with the Oxford 2000 Word List. Each line should contain one word or phrase.
3. Run the script using the command `node study.js` (replace `study.js` with the name of your script file if different).
4. When prompted, enter the number of words you want to learn for the day and press `Enter`.
5. The script will select the specified number of words, remove them from `remaining_words.txt`, and add them to both `learned_words.txt` and `learning_history.txt`.
6. The selected words will also be printed to the console.
7. To run the script on subsequent days, simply repeat steps 3 and 4. The script will remember the words you've already learned and the current day number.

## Note

- This script doesn't validate the formatting or contents of the words in the `remaining_words.txt`. Please ensure that each line in the file contains a valid word or phrase for optimal results.
