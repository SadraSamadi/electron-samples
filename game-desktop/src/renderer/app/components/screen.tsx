import React, {Component, ReactNode} from 'react';
import {RouteComponentProps} from 'react-router';
import ioc from '../services/ioc';
import Game from '../game';

export default class Screen extends Component<RouteComponentProps> {

  private container: HTMLDivElement;

  private game: Game;

  public constructor(props: RouteComponentProps) {
    super(props);
    this.game = ioc.get(Game);
  }

  public componentDidMount(): void {
    this.game.start(this.container);
  }

  public componentWillUnmount(): void {
    this.game.stop();
  }

  public render(): ReactNode {
    return (
      <div className="w-full h-full" ref={ref => this.container = ref}/>
    );
  }

}
