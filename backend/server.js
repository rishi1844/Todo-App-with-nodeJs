const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/api', taskRoutes); 

const __dirname1 = path.resolve(__dirname, '..');
app.use(express.static(path.join(__dirname1, 'frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname1, 'frontend/build', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
