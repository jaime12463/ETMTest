import Box from '@mui/material/Box';
import {StepConnector, Stepper as StepperMUI, Typography} from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {styled} from '@mui/material/styles';
import {stepConnectorClasses} from '@mui/material/StepConnector';
import {StepIconProps} from '@mui/material/StepIcon';

interface Props {
	pasoActivo: number;
	pasos: string[];
}

export const Stepper: React.VFC<Props> = ({pasoActivo, pasos}) => {
	return (
		<Box width='100%'>
			<StepperMUI
				alternativeLabel
				activeStep={pasoActivo}
				connector={<QontoConnector />}
				sx={{marginBottom: '44px'}}
			>
				{pasos.map((label) => (
					<Step key={label}>
						<StepLabel
							StepIconComponent={QontoStepIcon}
							sx={{
								'& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
									marginTop: '10px',
								},
							}}
						>
							<Typography variant='caption' sx={{fontFamily: 'Poppins'}}>
								{label}
							</Typography>
						</StepLabel>
					</Step>
				))}
			</StepperMUI>
		</Box>
	);
};

const QontoConnector = styled(StepConnector)(({theme}) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 8,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
		height: 30,
		width: '100%',
		marginLeft: '-9px',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#00CF91',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#00CF91',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: '#C4C4C4',
		borderTopWidth: 5,
		borderBottomWidth: 5,
		borderRadius: 1,
	},
}));

const QontoStepIconRoot = styled('div')<{ownerState: {active?: boolean}}>(
	({theme, ownerState}) => ({
		color: '#C4C4C4',
		display: 'flex',
		height: 22,
		alignItems: 'center',
		...(ownerState.active && {
			color: '#00CF91',
		}),
		'& .QontoStepIcon-completedIcon': {
			color: '#00CF91',
			zIndex: 1,
			fontSize: 18,
		},
		'& .QontoStepIcon-circle': {
			width: 14,
			height: 14,
			borderRadius: '50%',
			backgroundColor: 'currentColor',
		},
		'& .QontoStepIcon-circle-active': {
			width: 14,
			height: 14,
			borderRadius: '50%',
			backgroundColor: 'currentColor',
			color: '#00CF91',
		},
	})
);

function QontoStepIcon(props: StepIconProps) {
	const {active, completed, className} = props;

	return (
		<QontoStepIconRoot ownerState={{active}} className={className}>
			{completed ? (
				<div className='QontoStepIcon-circle-active' />
			) : (
				<div className='QontoStepIcon-circle' />
			)}
		</QontoStepIconRoot>
	);
}
