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

  // Declare importedNewQs outside the try block
  let importedNewQs = {};

  // Read the content of newqs.txt
  const newQsContent = fs.readFileSync('newqs.txt', 'utf-8');
  //console.log("newQsContent: ", JSON.stringify(newQsContent));

  // Assuming newqs.txt contains a JSON object with a similar structure
  try {
    importedNewQs = JSON.parse(newQsContent); // Assign to the existing variable
    console.log("importedNewQs:", importedNewQs); // Log the entire importedNewQs object
    // Merge questions from importedNewQs into importedGameData
    for (const category in importedNewQs) {
      console.log("Checking category:", category);
      if (importedNewQs.hasOwnProperty(category)) {
        console.log("Category is owned:", category);
        console.log(`Merging questions for category: ${category}`);
        importedGameData.questions[category] = importedGameData.questions[category] || {}; 
      // If importedGameData.questions[category] is undefined, the right side of || is assigned,
      // effectively creating the category.
      for (const difficulty in importedNewQs[category]) {
        if (importedNewQs[category].hasOwnProperty(difficulty)) {
          // Initialize difficulty level if it doesn't exist
          importedGameData.questions[category][difficulty] = importedGameData.questions[category][difficulty] || [];

          // Concatenate questions for this difficulty level
          importedGameData.questions[category][difficulty] = importedGameData.questions[category][difficulty].concat(importedNewQs[category][difficulty]);
        }
      }
      //  };
        console.log(`Questions for category '${category}' after merge:`, importedGameData.questions[category]);        
      } 
    }
  } catch (error) {
    console.error('Error parsing newqs.txt:', error);
  }

  // Debug print the list of questions
  for (const category in importedGameData.questions) {
    if (importedGameData.questions.hasOwnProperty(category)) {
      for (const difficulty in importedGameData.questions[category]) {
        if (importedGameData.questions[category].hasOwnProperty(difficulty)) {
          importedGameData.questions[category][difficulty].forEach((question) => {
            console.log(`importedGameData Category: ${category}, Difficulty: ${difficulty}, Question: ${question.q}, Answer: ${question.a}`);
          });
        }
      }
    }
  }

  // Debug print the list of questions from CreateImportedNewQs
  for (const category in importedNewQs.questions) {
    if (importedNewQs.questions.hasOwnProperty(category)) {
      for (const difficulty in importedNewQs.questions[category]) {
        if (importedNewQs.questions[category].hasOwnProperty(difficulty)) {
          importedNewQs.questions[category][difficulty].forEach((question) => {
            console.log(`importedNewQs Imported Category: ${category}, Difficulty: ${difficulty}, Question: ${question.q}, Answer: ${question.a}`);
          });
        }
      }
    }
  }
  //console.log("importedGameData after merge:", importedGameData);

  // Update index.html with the new gameData
  try {
    // Convert importedGameData back to a string
    const updatedGameDataString = JSON.stringify(importedGameData, null, 2); // 2 spaces for indentation

    // Replace the old gameData object in htmlContent with the updated one
    const updatedHtmlContent = htmlContent.replace(gameDataRegex, (match, captureGroup) => {
      return `let gameData = ${updatedGameDataString};`;
    });

    // Write the updated htmlContent back to index.html
    // *** This line is commented out because in a real application, 
    // *** index.html would already be open in the browser. ***
    fs.writeFileSync('index.html', updatedHtmlContent, 'utf-8');

    console.log('Game data in index.html updated successfully.');
  } catch (error) {
    console.error('Error updating game data in index.html:', error);
  }

} else {
  //console.error('Game data (gameData object) not found in index.html.');
}

// This is a simplified example and does not include advanced topics like
// live reloading, hot module replacement, or other techniques typically
// used for real-time updates in web applications.
