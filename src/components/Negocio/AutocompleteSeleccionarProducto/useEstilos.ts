import {makeStyles} from '@material-ui/styles';

const useEstilos = makeStyles(() => ({
	cajaAutocomplete: {
		//background: '#FFFFFF',
		boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.15)',
		borderRadius: '20px',
		border: '100px',
	},
	textSeleccionar: {
		fontFamily: "Open Sans",
		ontStyle: "normal",
		fontWeight: "normal",
		fontSize: "12px",
		lineHeight: "16px",
		display: "flex",
		alignItems: "center",
		position: "static",
		color: "#B2B2B2",
		bottom: "6px"
	}
}));

export default useEstilos;
