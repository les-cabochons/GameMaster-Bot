const searchString = "#784623309732052992";

export function getScores(messages) {
  const filteredMessages = messages.filter((message) =>
    message.content.includes(searchString)
  );

  if (!filteredMessages.length) return;

  const scores = [];

  for (const message of filteredMessages) {
    const user = message.author;
    const score = calculateScore(message.content);
    scores.push({ user, score });
  }

  return scores;
}

function calculateScore(message) {
  const goodGuesses = (message.match(/🟩/g) || []).length;
  const franchiseGuesses = (message.match(/🟨/g) || []).length;
  const emptyGuesses = (message.match(/⬜/g) || []).length;

  return (goodGuesses + emptyGuesses) * 3 + franchiseGuesses;
}

export function getHighestScore(scores) {
    const sortedScores = scores.sort((a, b) => b.score - a.score);
    const winner = sortedScores[0];
    
    return winner;
}
