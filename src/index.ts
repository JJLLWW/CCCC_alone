// typescript only handles ES6 imports not CommonJS require by default.
import express from 'express';

const PORT = 8000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  // backticks => format string.
  console.log(`server listening on port ${PORT}`);
});
