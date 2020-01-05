import React, {Component, ReactNode} from 'react';
import {Interval} from './Interval';
import logger from '../../main/logger';
import {container} from './ioc';
import {Client} from './client';
import {User} from './user';

interface State {

	users: User[];

}

export class App extends Component<any, State> {

	private client: Client;

	public constructor(props: Readonly<any>) {
		super(props);
		this.client = container.get(Client);
		this.state = {
			users: []
		};
	}

	public componentDidMount(): void {
		this.client.users()
			.subscribe(users => this.setState({users}));
		this.client.load()
			.then(() => logger.info('loaded'))
			.catch(err => logger.error(err));
	}

	public render(): ReactNode {
		return (
			<div className='App'>
				<h1 className='hello'>Hello, World!</h1>
				<Interval timeout={1000}/>
			</div>
		);
	}

}
