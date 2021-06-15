import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom';
import {ReactNode} from 'react';

interface Props {
	pathPrincipal: string;
	pathAnidado: string;
	principal: ReactNode;
	anidado: ReactNode;
}

const RutasAnidadas = ({
	pathPrincipal,
	principal,
	pathAnidado,
	anidado,
}: Props) => {
	const {path} = useRouteMatch();
	return (
		<>
			<Switch>
				<Route path={`${path}${pathPrincipal}`}>
					{principal}
					<Route exact path={`${path}${pathAnidado}`}>
						{anidado}
					</Route>
				</Route>
			</Switch>
		</>
	);
};

export default RutasAnidadas;
