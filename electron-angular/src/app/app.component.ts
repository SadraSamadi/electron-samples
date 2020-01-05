import {Component, OnInit} from '@angular/core';
import {LoggerFactory} from './classes/logger-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private logger = LoggerFactory.getLogger(AppComponent);

  public constructor() {
  }

  public ngOnInit(): void {
    this.logger.info('application started');
  }

}
