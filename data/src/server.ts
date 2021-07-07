import {Request, Response} from 'express';
import express from 'express';
import cors from 'cors';
import routes from './routes';

//puerto
const PORT = process.env.PORT || 4000;

//url front
console.log('Front URL ', process.env.FRONT_URL);

//app
const app = express();

//Parseo de hearder y body
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

//cors
var corsOptions = {
	//origin: process.env.FRONT_URL, hay que investigar mas de este tema
	credentials: true,
};
app.use(cors(corsOptions));

//routes
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to API!');
});

//listen port
app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
