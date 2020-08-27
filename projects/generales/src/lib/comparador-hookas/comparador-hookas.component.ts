import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ComparadorHookasInputModel } from './interfaces/ComparadorHooksInputModel';

@Component({
  selector: 'lib-comparador-hookas',
  templateUrl: './comparador-hookas.component.html',
  styleUrls: ['./comparador-hookas.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ComparadorHookasComponent implements OnInit {
  @Input() set comparadorHookas(model: ComparadorHookasInputModel) {
    if (model) {
      this._model = model;
    }
  }

  public _model: ComparadorHookasInputModel;

  constructor() {}

  ngOnInit(): void {}
}
