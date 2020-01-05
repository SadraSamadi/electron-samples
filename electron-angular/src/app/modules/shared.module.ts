import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from './directives.module';
import {MatComponentsModule} from './mat-components.module';
import {PipesModule} from './pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    MatComponentsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    MatComponentsModule
  ]
})
export class SharedModule {
}
