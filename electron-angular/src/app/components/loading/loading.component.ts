import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  public constructor(private ref: MatDialogRef<LoadingComponent>,
                     @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  public ngOnInit(): void {
  }

}
