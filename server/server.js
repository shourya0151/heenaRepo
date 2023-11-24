const cors = require('cors');
const express = require('express');

const authRoutes = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const morgan = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose');
import path from 'path';

const __dirname = path.resolve();

const app = express();

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(process.env.MONGO, options)
	.then(() => {
		console.log('Connected to MongoDB');
		// Start your application or perform additional operations
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/task', taskRouter);

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

// localhost:4000/auth/register

const port = 4000;

app.listen(port, () => {
	console.log(`server is running on port`, port);
});