import {Request, Response} from 'express';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

//puerto
const PORT = process.env.PORT || 4000;

//app
const app = express();

//Extended: 
const swaggerOptions = {
	definition: {
		info: {
			title: 'ETM - Servidor API',
			description: "API de datos para la toma de pedidos",
			version: '1.0.9',
			contact: {
				name: "Hasar Sistemas"
			},
			servers: [`http://localhost:${PORT}`]

		}
	},
	apis: ["./src/server.ts", "./src/routes/Etm/*.ts"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//url front
console.log('Front URL ', process.env.FRONT_URL);

//Parseo de header y body
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
	res.send('Bienvenidos a ETM - Servidor API!');
});

//listen port
app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
