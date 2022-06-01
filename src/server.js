import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './configs/viewEngine';
import webRoutes from './routes/web';
import chatRouter from './routes/chat';
import connectDB from './configs/connectDB';
var cors = require('cors');
const cookieParser = require('cookie-parser');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//config view Engine
viewEngine(app);
app.use(cookieParser());
//config web routes
webRoutes(app);
chatRouter(app);

///database
connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Chạy thành công http://localhost:' + port);
});
