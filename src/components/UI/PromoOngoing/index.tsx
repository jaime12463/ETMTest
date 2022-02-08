import React from 'react';
import {Container, ContainerProps} from './Components/Container';
import {CardsContainer} from './Components/CardsContainer';
import {Card, CardProps} from './Components/Card';

interface Props {
	Container: React.FC<ContainerProps>;
	CardsContainer: React.FC;
	Card: React.FC<CardProps>;
}

const PromoOngoing: React.FC & Props = ({children}) => {
	return <Container>{children}</Container>;
};

PromoOngoing.Container = Container;
PromoOngoing.CardsContainer = CardsContainer;
PromoOngoing.Card = Card;

export default PromoOngoing;
