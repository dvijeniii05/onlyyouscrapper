function shuffle(array) {
  console.log("Here", array.slice(0, 5));
  for (let i = array - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = shuffle;
