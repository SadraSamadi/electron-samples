import React, {Component, ReactNode} from 'react';
import {Empty} from 'antd';
import axios from 'axios';
import './app.scss';

interface Props {

}

interface State {

  todos: any[];

}

export default class App extends Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  public componentDidMount(): void {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => res.data)
      .then(todos => this.setState({todos}));
  }

  public render(): ReactNode {
    let size = this.state.todos.length;
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        {size ? <span>{size}</span> : <Empty/>}
      </div>
    );
  }

}
