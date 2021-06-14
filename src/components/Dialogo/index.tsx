import {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

export type Props = {
	mensaje: string;
	botones?: string[];
	handle: Function;
};

const Dialogo = ({mensaje, botones, handle}: Props) => {
	const [mostrar, setMostrar] = useState(true);

	const handleonClick = (result: boolean) => {
		handle(result);
		setMostrar(false);
	};

	const action = (
		<>
			{botones && botones.length <= 2 ? (
				botones.map((el, i) => (
					<Button
						key={el}
						color='inherit'
						size='small'
						onClick={() =>
							i === 0 ? handleonClick(true) : handleonClick(false)
						}
					>
						{el}
					</Button>
				))
			) : (
				<Button
					color='inherit'
					size='small'
					onClick={() => handleonClick(true)}
				>
					Aceptar
				</Button>
			)}
		</>
	);

	return <Snackbar open={mostrar} message={mensaje} action={action} />;
};

export default Dialogo;
