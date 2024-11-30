const fs = require('fs');

// Read the content of index.html
const htmlContent = fs.readFileSync('index.html', 'utf-8');

// Extract gameData object from htmlContent
const gameDataRegex = /(?:let|const)\s+gameData\s*=\s*(\{[\s\S]*?\});/m;
const match = htmlContent.match(gameDataRegex);

if (match) {
  const gameDataString = match[1];

  // Parse gameDataString into a JavaScript object
  const gameData = eval('(' + gameDataString + ')'); 

  // Create a similar structure and import gameData contents
  const importedGameData = {
    questions: { ...gameData.questions }, // Shallow copy of questions
  };

  // Debug print the list of questions
  for (const category in importedGameData.questions) {
    if (importedGameData.questions.hasOwnProperty(category)) {
      for (const difficulty in importedGameData.questions[category]) {
        if (importedGameData.questions[category].hasOwnProperty(difficulty)) {
          importedGameData.questions[category][difficulty].forEach((question) => {
            console.log(`Category: ${category}, Difficulty: ${difficulty}, Question: ${question.q}, Answer: ${question.a}`);
          });
        }
      }
    }
  }

} else {
  console.error('Game data (gameData object) not found in index.html.');
}
