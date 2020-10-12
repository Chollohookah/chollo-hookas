import { NgModule } from '@angular/core';
import { GeneralesComponent } from './generales.component';
import { ComparadorHookasComponent } from './comparador-hookas/comparador-hookas.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { FiltrosAvanzadosComponent } from './comparador-hookas/sub-comps/filtros-avanzados/filtros-avanzados.component';
import { SelectorConBuscadorComponent } from './selector-con-buscador/selector-con-buscador.component';
import { InlineBlockPickerComponent } from './inline-block-picker/inline-block-picker.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CargandoCachimbasComponent } from './cargando-cachimbas/cargando-cachimbas.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LateralActionsComponent } from './lateral-actions/lateral-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    GeneralesComponent,
    ComparadorHookasComponent,
    FiltrosAvanzadosComponent,
    SelectorConBuscadorComponent,
    InlineBlockPickerComponent,
    CardViewerComponent,
    CargandoCachimbasComponent,
    LateralActionsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatRippleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDividerModule,
    HttpClientModule,
    ScrollingModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  exports: [GeneralesComponent, ComparadorHookasComponent],
  providers: [],
})
export class GeneralesModule {}
