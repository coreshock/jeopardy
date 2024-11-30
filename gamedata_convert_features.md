# Product Design Document: gamedata_convert

## 1. Overview 

This document outlines the design for the `gamedata_convert.js` script,This document details the changes in the gamedata_convert.js script.

Input:

index.html: Contains the base game data (questions).
newqs.txt: Contains new questions to be added to the game data.
Processing:

The script will read the base game data from index.html.
It will create a new JavaScript object with a similar structure to the existing game data.
The script will read the new questions from newqs.txt.
The new questions will be parsed and inserted into the new game data object.
The extended game data will be written to gamedata_out.txt.
Output:

gamedata_out.txt: The extended game data, including the original questions and the new questions from newqs.txt.
Error Handling:

newqs.txt: The script should include error handling to manage invalid input in the newqs.txt file. For example, check for correct formatting of questions, missing data etc. Detailed error messages should be logged or displayed.

Previous Input/Output files (index.html, newqs.txt) should not be removed! Old gamedata_out.txt could be rewritten.