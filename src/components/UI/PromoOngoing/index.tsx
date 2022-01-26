import React from 'react';
import Container, {ContainerProps} from './Components/Container';

interface Props {
	Container: React.FC<ContainerProps>;
}

const PromoOngoing: React.FC & Props = ({children}) => {
	return <Container>{children}</Container>;
};

PromoOngoing.Container = Container;

export default PromoOngoing;
