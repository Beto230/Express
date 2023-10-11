const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


function calculateMean(numbers) {
  return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
}

function calculateMedian(numbers) {
  const sortedNumbers = numbers.sort((a, b) => a - b);
  const middle = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
  } else {
    return sortedNumbers[middle];
  }
}

function calculateMode(numbers) {
  const counts = {};
  numbers.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });

  let mode = null;
  let maxCount = 0;
  for (const num in counts) {
    if (counts[num] > maxCount) {
      mode = Number(num);
      maxCount = counts[num];
    }
  }

  return mode;
}

app.get('/mean', (req, res) => {
  const { nums } = req.query;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number in nums' });
  }

  const mean = calculateMean(numbers);
  res.json({ operation: 'mean', value: mean });
});

app.get('/median', (req, res) => {
  const { nums } = req.query;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number in nums' });
  }

  const median = calculateMedian(numbers);
  res.json({ operation: 'median', value: median });
});

app.get('/mode', (req, res) => {
  const { nums } = req.query;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid number in nums' });
  }

  const mode = calculateMode(numbers);
  res.json({ operation: 'mode', value: mode });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
