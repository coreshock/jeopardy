Here's a markdown-formatted task description for an AI coding assistant:

# Jeopardy Game Field Generator Refactoring

## Objective
Rewrite the existing Jeopardy game implementation to support dynamic game field generation with the following key requirements:

## Technical Requirements
- [ ] Replace hardcoded `gameData` object with a flexible, extensible data structure
- [ ] Implement a game board generation mechanism that:
  - Randomly selects 6 categories from a larger pool
  - Randomly selects questions for each category
  - Maintains the original point structure (100-500 points)
  - Preserves the existing game logic and UI

## Specific Implementation Tasks
- [ ] Create a `QuestionPool` class or object with methods for:
  - Randomly selecting categories
  - Generating a game board
  - Ensuring no duplicate questions
- [ ] Modify existing HTML/JS to work with the new dynamic data structure
- [ ] Maintain the current game's look and feel
- [ ] Add error handling for question selection

## Example Data Structure Goal
```javascript
const gameDataGenerator = {
  categoryPool: [ /* Expanded list of categories */ ],
  questionPool: { /* Organized questions by category and difficulty */ },
  generateGameBoard() { /* Returns a randomized 6-category game board */ }
};
```

## Acceptance Criteria
- Game board is randomly generated each time
- All 6 categories are unique
- Each category has 5 questions at different point levels
- Original game mechanics remain unchanged
- Performance remains responsive

## Bonus Challenges
- Implement a seed-based random generation for potential reproducibility
- Add metadata to questions (tags, sources, difficulty)
- Create a mechanism to prevent recent question repetition

## Deliverables
- Updated JavaScript file
- Any necessary HTML modifications
- Brief documentation explaining the new data structure

**Note:** Preserve the original Russian-language questions and game theme.