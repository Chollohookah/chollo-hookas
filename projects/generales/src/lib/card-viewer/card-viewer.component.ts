import { Component, Input, OnInit } from '@angular/core';
import { Hooka } from '../comparador-hookas/interfaces/ModeloHookasBack';
import { HookasWithSiteMetadata } from '../comparador-hookas/interfaces/RelationSiteHooka';
import { AnunciosHookas } from './models/AnunciosHookas';
@Component({
  selector: 'lib-card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.scss'],
})
export class CardViewerComponent implements OnInit {
  @Input() set index(index: number) {
    this._index = index;
  }

  @Input() set item(item: HookasWithSiteMetadata) {
    this._item = item;
    this.detectarAnuncio(this._item);
  }

  public _index: number = -1;
  public _item: HookasWithSiteMetadata;
  public anuncioHooka: AnunciosHookas;

  constructor() {}

  ngOnInit(): void {}

  public hayAnuncio() {
    return this.anuncioHooka != null;
  }

  public detectarAnuncio(hooker: HookasWithSiteMetadata) {
    if (hooker.agotado) {
      this.anuncioHooka = {
        texto: 'AGOTADO',
        color: 'dark',
        textColor: 'light',
      };
    } else if (hooker.precioRebajado != null) {
      this.anuncioHooka = {
        texto: 'OFERTA',
        color: 'info',
        textColor: 'light',
      };
    } else if (hooker.cantidad != null) {
      this.anuncioHooka = {
        texto: 'ULTIMOS',
        color: 'warning',
        extraData: Number(hooker.cantidad),
        textColor: 'light',
      };
    }
  }
}
