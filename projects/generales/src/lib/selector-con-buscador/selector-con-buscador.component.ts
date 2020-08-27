import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { cloneDeep } from 'lodash-es';
export interface SelectorConBuscadorValores {
  clave: string;
  valor: any;
}
@Component({
  selector: 'lib-selector-con-buscador',
  templateUrl: './selector-con-buscador.component.html',
  styleUrls: ['./selector-con-buscador.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectorConBuscadorComponent implements OnInit {
  @Input('entradaSelector') set entradaSelector(
    arrayDatos: Array<SelectorConBuscadorValores>
  ) {
    if (arrayDatos) {
      this.arrayDatos = cloneDeep(arrayDatos);
      this.arrayDatosClone = cloneDeep(this.arrayDatos);
      this.formularioBusqueda.get('busqueda').enable();
    } else {
      this.noData();
    }
  }

  public arrayDatos: Array<SelectorConBuscadorValores> = [];
  private arrayDatosClone: Array<SelectorConBuscadorValores> = [];

  public formularioBusqueda: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioBusqueda = this.fb.group({
      busqueda: ['', []],
      itemSeleccionado: [null, []],
    });
    this.noData();
  }

  ngOnInit(): void {}

  private noData(): void {
    this.arrayDatos = [{ clave: 'No tenemos datos', valor: 'nodata' }];
    this.arrayDatosClone = cloneDeep(this.arrayDatos);
    this.formularioBusqueda.get('busqueda').disable();
  }
}
