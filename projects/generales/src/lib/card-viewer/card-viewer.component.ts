import { Component, Input, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { Hooka } from '../comparador-hookas/interfaces/ModeloHookasBack';
import { HookasWithSiteMetadata } from '../comparador-hookas/interfaces/RelationSiteHooka';
import { PosibleActions } from '../lateral-actions/models/PosibleActions';
import { AnimationControllerService } from '../servicios/animation-controller.service';
import { AnunciosHookas } from './models/AnunciosHookas';
import { debounceTime, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ImgAccordionComponent } from '../img-accordion/img-accordion.component';
import { DescriptionComponent } from '../description/description.component';
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
        this.dialog.open(DescriptionComponent, { data: this._item, autoFocus: false });
      },
    },
    {
      icon: 'launch',
      tooltip: 'Abrir pagina',
      color: 'primary',
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
        let cookiesKeys = Object.keys(this.cookieService.getAll());
        let resBusqueda = cookiesKeys.find((entry) => {
          if (entry.includes('savedHooka')) {
            if (this.cookieService.getAll()[entry] === this._item.linkProducto) {
              return entry;
            }
          }
        });
        if (resBusqueda) {
          this.toastr.warning(this._item.titulo + ' ya esta agregado en favoritos!', 'No duplicamos cachimbas!');
        } else {
          this.toastr.success(this._item.titulo + ' añadido a favoritos!', 'Añadida');
          this.cookieService.set('savedHooka' + uuidv4(), this._item.linkProducto);
        }
      },
    },
  ];

  public _index: number = -1;
  public _item: HookasWithSiteMetadata;
  public anuncioHooka: AnunciosHookas;

  public mostrandoOpciones: boolean = false;

  constructor(
    private animation: AnimationControllerService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  public copiadoAlPortapeles(color: string): void {
    this.toastr.info(`El color ${color} fue copiado al portapapeles`);
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

  public abrirModalImagenes(): void {
    let imgAccordion = this.dialog.open(ImgAccordionComponent, { data: this._item.fotos });
  }
}
