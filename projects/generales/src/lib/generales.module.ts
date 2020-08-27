import { NgModule } from '@angular/core';
import { GeneralesComponent } from './generales.component';
import { ComparadorHookasComponent } from './comparador-hookas/comparador-hookas.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FiltrosAvanzadosComponent } from './comparador-hookas/sub-comps/filtros-avanzados/filtros-avanzados.component';
import { SelectorConBuscadorComponent } from './selector-con-buscador/selector-con-buscador.component';

@NgModule({
  declarations: [
    GeneralesComponent,
    ComparadorHookasComponent,
    FiltrosAvanzadosComponent,
    SelectorConBuscadorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [GeneralesComponent, ComparadorHookasComponent],
})
export class GeneralesModule {}
