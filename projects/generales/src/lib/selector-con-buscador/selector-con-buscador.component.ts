import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { cloneDeep } from 'lodash-es';
import { InitialConfigInputMaterial, ClaveValorModel, ClaveValorBandera } from '../comparador-hookas/interfaces/FiltrosAvanzadosModel';
import { KeyValue } from '@angular/common';
import { HookaService } from '../comparador-hookas/services/hooka-service.service';

@Component({
  selector: 'lib-selector-con-buscador',
  templateUrl: './selector-con-buscador.component.html',
  styleUrls: ['./selector-con-buscador.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectorConBuscadorComponent implements OnInit {
  @Input('initialConfig') set initialConfig(inicialConfig: InitialConfigInputMaterial) {
    if (inicialConfig) {
      this.initialConfigObj = inicialConfig;
      if (this.initialConfigObj.disabled) {
        this.formularioBusqueda.get('itemSeleccionado').disable();
      } else {
        this.formularioBusqueda.get('itemSeleccionado').enable();
      }
    }
  }

  @Input('entradaSelector') set entradaSelector(arrayDatos: Array<ClaveValorBandera>) {
    if (arrayDatos && arrayDatos instanceof Array && arrayDatos.length > 0) {
      this.arrayDatos = cloneDeep(arrayDatos);
      this.arrayDatosClone = cloneDeep(this.arrayDatos);
      this.yesData();
    } else {
      this.noData();
    }
  }

  public initialConfigObj: InitialConfigInputMaterial;
  public arrayDatos: Array<ClaveValorModel> = [];
  private arrayDatosClone: Array<ClaveValorModel> = [];
  @Output('selectedValueChanged') selectedValueChanged = new EventEmitter<any>();

  public formularioBusqueda: FormGroup;

  constructor(private fb: FormBuilder, private hookaService: HookaService) {
    this.hookaService.filterValuesChanged.subscribe((data) => {
      this.formularioBusqueda.patchValue({ itemSeleccionado: data[this.initialConfigObj.idKey] });
    });
    this.formularioBusqueda = this.fb.group({
      busqueda: ['', []],
      itemSeleccionado: [null, []],
    });
    this.noData();
    this.listenFormKeysWithCallbacksOnTrigger('busqueda', (valor: string) => {
      this.arrayDatos = cloneDeep(this.arrayDatosClone.filter((entry) => entry.clave.toLowerCase().includes(valor.toLowerCase())));
    });
    this.listenFormKeysWithCallbacksOnTrigger('itemSeleccionado', (valor: string) => {
      if (valor != null) {
        this.selectedValueChanged.emit({
          clave: this.initialConfigObj.idKey,
          valor,
        } as ClaveValorModel);
      }
    });
  }

  ngOnInit(): void {}

  private listenFormKeysWithCallbacksOnTrigger(keyName: string, callback: Function) {
    this.formularioBusqueda.get(keyName).valueChanges.subscribe((data) => {
      callback(data);
    });
  }

  private yesData(): void {
    this.formularioBusqueda.get('itemSeleccionado').enable();
    this.formularioBusqueda.get('busqueda').enable();
  }

  private noData(): void {
    this.formularioBusqueda.get('itemSeleccionado').reset();
    this.formularioBusqueda.get('itemSeleccionado').disable();
    this.formularioBusqueda.get('busqueda').disable();
  }
}
