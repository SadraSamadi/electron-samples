import React, {Component, ReactNode} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import QRCode from 'qrcode.react';
import ioc from '../services/ioc';
import Controller from '../services/controller';

interface Stats {

  url: string;

}

export default class Home extends Component<RouteComponentProps, Stats> {

  private controller: Controller;

  public constructor(props: any) {
    super(props);
    this.controller = ioc.get(Controller);
    this.state = {url: null};
  }

  public componentDidMount(): void {
    this.controller.start()
      .then(url => this.setState({url}));
  }

  public render(): ReactNode {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col">
          {this.state.url ? (
            <div className="p-2 bg-white rounded">
              <QRCode size={256} value={this.state.url}/>
            </div>
          ) : (
            <p>Starting server...</p>
          )}
        </div>
      </div>
    );
  }

}
