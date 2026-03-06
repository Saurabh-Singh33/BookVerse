const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

app.get('/', (req, res) => {
  res.send('Hello World!,, This is the backend of BookVerse');
});

app.listen(PORT, () => {  console.log(`Example app listening at http://localhost:${PORT}`);
});