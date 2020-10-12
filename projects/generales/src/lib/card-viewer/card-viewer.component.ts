import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Hooka } from '../comparador-hookas/interfaces/ModeloHookasBack';
import { HookasWithSiteMetadata } from '../comparador-hookas/interfaces/RelationSiteHooka';
import { PosibleActions } from '../lateral-actions/models/PosibleActions';
import { AnimationControllerService } from '../servicios/animation-controller.service';
import { AnunciosHookas } from './models/AnunciosHookas';
import { debounceTime, map } from 'rxjs/operators';
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

  public posiblesAccionesConCachimbas: Array<PosibleActions> = [
    {
      icon: 'info',
      color: 'secondary',
      tooltip: 'Más información',
      action: () => {
        console.log('whoop yo ass');
      },
    },
    {
      icon: 'launch',
      tooltip: 'Abrir pagina',
      color: 'ternary',
      action: () => {
        let tabWindowId = window.open('about:blank', '_blank');
        tabWindowId.location.href = this._item.linkProducto;
      },
    },
    {
      icon: 'favorite',
      tooltip: 'Añadir a  favoritos',
      color: 'danger',
      action: () => {
        console.log('whoop yo ass');
      },
    },
  ];

  public _index: number = -1;
  public _item: HookasWithSiteMetadata;
  public anuncioHooka: AnunciosHookas;

  public cargarAnimacionOcultacion: boolean = false;
  public animacionMostrarTerminada: boolean = true;
  public animationPromiseStart: Promise<any>;
  private subject: Subject<'in' | 'out'> = new Subject();

  constructor(private animation: AnimationControllerService) {}

  ngOnInit(): void {
    this.subject.pipe(debounceTime(100)).subscribe((data: 'in' | 'out') => {
      switch (data) {
        case 'in':
          this.haciendoHoverCard();
          break;
        case 'out':
          this.saliendoHoverCard();
          break;
      }
    });
  }

  public nextTransition(v: 'in' | 'out') {
    this.subject.next(v);
  }

  public haciendoHoverCard(): void {
    if (this.animacionMostrarTerminada) {
      this.animacionMostrarTerminada = false;
      this.animationPromiseStart = this.animation
        .ejecutarAnimacion('.hoverComp-' + this._index, {
          opacity: 1,
        })
        .then((data) => {
          this.animacionMostrarTerminada = true;
        });
    }
  }

  public async saliendoHoverCard() {
    if (!this.animacionMostrarTerminada) {
      await this.animationPromiseStart;
    }
    this.ocultarOpcionesLaterales();
  }

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

  private ocultarOpcionesLaterales(): void {
    this.animation
      .ejecutarAnimacion('.hoverComp-' + this._index, {
        opacity: 0,
      })
      .then((data) => {
        this.cargarAnimacionOcultacion = false;
      });
  }
}
