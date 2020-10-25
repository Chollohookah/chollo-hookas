import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
export interface InlineBlockPicker {
  texto: string;
  customClickEvent?: Function;
}
@Component({
  selector: 'lib-inline-block-picker',
  templateUrl: './inline-block-picker.component.html',
  styleUrls: ['./inline-block-picker.component.scss'],
})
export class InlineBlockPickerComponent implements OnInit {
  @Input() maxItems: number = 10;
  @Input('chipsInput') set chipsInput(data: Array<InlineBlockPicker>) {
    if (data) {
      this._chipsInput = data;
    }
  }

  @Output() chipSelection = new EventEmitter<InlineBlockPicker>();

  public _chipsInput: Array<InlineBlockPicker> = [];

  constructor() {}

  ngOnInit(): void {}

  public emitirClick(objetoSeleccionado: InlineBlockPicker) {
    this.chipSelection.emit(objetoSeleccionado);
  }
}
