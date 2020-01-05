import React, {Component, ReactNode} from 'react';
import {boundMethod} from 'autobind-decorator';

interface Props {

	timeout?: number;

}

interface State {

	counter: number;

}

export class Interval extends Component<Props, State> {

	private interval: any;

	public constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
			counter: 0
		};
	}

	public componentDidMount(): void {
		this.interval = setInterval(this.increment, this.props.timeout || 500);
	}

	public componentWillUnmount(): void {
		clearInterval(this.interval);
	}

	public render(): ReactNode {
		return (
			<div className='Interval'>
				<p>{this.state.counter}</p>
			</div>
		);
	}

	@boundMethod
	private increment() {
		this.setState(prevState => ({
			counter: prevState.counter + 1
		}));
	}

}
