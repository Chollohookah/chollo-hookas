import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  ComparadorHookasInputModel,
  HookaSearcherInputComponent,
  ButtonActionFunction,
  AnimationControllerService,
  ComparadorHookasApi,
  HookaService,
} from '@chollohookah/generales-wrapper-lib';
import { ToastrService } from 'ngx-toastr';
import { SimpleAlert } from '@chollohookah/generales-wrapper-lib/lib/models';
import { HeaderItems } from '@chollohookah/generales-wrapper-lib/lib/components/header/header.component';
@Component({
  selector: 'app-base-landing',
  templateUrl: './base-landing.component.html',
  styleUrls: ['./base-landing.component.scss'],
})
export class BaseLandingComponent implements OnInit {
  public itemsToDisplay: Array<HeaderItems> = [
    {
      text: 'Cachimbas',
      assetName: 'cachimba.png',
      linkPath: 'cachimba',
    },
    {
      text: 'Accesorios',
      assetName: 'accesorios.png',
      linkPath: 'accesorio',
    },
    {
      text: 'Carbón',
      assetName: 'carbon.png',
      linkPath: 'carbon',
    },
    {
      text: 'Cazoleta',
      assetName: 'cazoletas.svg',
      linkPath: 'cazoleta',
    },
    {
      text: 'Esencias',
      assetName: 'esencias.png',
      linkPath: 'esencias',
    },
    {
      text: 'Manguera',
      assetName: 'manguera.png',
      linkPath: 'manguera',
    },
    {
      text: 'Melazas',
      assetName: 'melazas.png',
      linkPath: 'melaza',
    },
    {
      text: 'Sabores',
      assetName: 'sabores.png',
      linkPath: 'sabor',
    },
  ];
  public modeloInputComparador: ComparadorHookasInputModel = {
    textoInputAntesDeClickear: 'Busca por marca,modelo,nombres...',
    placeholderAlComenzarAEscribir: 'Cachimbas,cazoletas,mangueras,accesorios,carbones...',
    estadoAnimacion: 'terminada',
    estadoExpansion: 'cerrada',
    /* iconoSort: {
      nombre: 'sort_by_alpha',
      condition: (context) => {
        return true;
      },
      alHacerClick: (context: HookaSearcherInputComponent) => {
        console.log('me clickaste');
        context.showOrderBox.emit();
      },
      customClass: 'c-pointer botonSort',
    },*/
    iconoFiltro: {
      nombre: 'filter_list',
      condition: (context) => {
        return true;
      },
      alHacerClick: (context: HookaSearcherInputComponent) => {
        context.cerrarFiltrosAvanzados.subscribe((data) => {
          if (this.modeloInputComparador.estadoExpansion == 'abierta') {
            this.triggerVisibilityStatefilters();
          }
        });
        this.triggerVisibilityStatefilters();
      },
      customClass: 'c-pointer',
    },
    iconoClear: {
      nombre: 'delete',
      alHacerClick: (context: HookaSearcherInputComponent) => {
        context.inputBusqueda.first.nativeElement.value = '';
        context.inputBusqueda.first.nativeElement.dispatchEvent(new Event('input'));
      },
      condition: (context: HookaSearcherInputComponent) => {
        if (context.valorBusqueda.length > 0) return true;
        return false;
      },
      customClass: 'c-pointer botonLimpiezaInput text-danger',
    },
  };

  public fnBtnClick: ButtonActionFunction = {
    type: 'async',
    succesMessage: 'Ya tenemos tu correo :)!',
    function: (email: string) => {
      return this.http
        .post(environment.protocol + '://' + environment.host + ':' + environment.port + '/emails', { email: email })
        .toPromise();
    },
  };

  public APIComunicator: ComparadorHookasApi = {
    protocol: environment.protocol,
    host: environment.host,
    port: environment.port,
  };

  constructor(
    private animationController: AnimationControllerService,
    private http: HttpClient,
    private toast: ToastrService,
    private hooka: HookaService
  ) {}

  ngOnInit(): void {}

  public printToast(ev: SimpleAlert) {
    this.toast[ev.type](ev.title, ev.desc, {});
  }

  public changeType(blockCliked: HeaderItems) {
    this.hooka.changedTypeItemToLoad.next(blockCliked.linkPath as any);
  }

  private triggerVisibilityStatefilters() {
    if (this.modeloInputComparador.estadoAnimacion == 'terminada') {
      let estadoAnimacion = this.modeloInputComparador.estadoExpansion;
      this.modeloInputComparador.estadoAnimacion = 'empezada';
      this.animationController
        .ejecutarAnimacion(
          '.filtrosAvanzados',
          estadoAnimacion == 'abierta'
            ? { opacity: 0, duration: 500 }
            : {
                opacity: 1,
                duration: 100,
              },
          estadoAnimacion == 'abierta'
            ? (anim) => {
                let item = anim.animatables[0].target as HTMLElement;
                item = item.querySelector('.contenedorFiltrosAvanzados');
                item.classList.toggle('d-none');
                item.classList.remove('d-block');
              }
            : (anim) => {
                let item = anim.animatables[0].target as HTMLElement;
                item = item.querySelector('.contenedorFiltrosAvanzados');
                item.classList.toggle('d-block');
                item.classList.remove('d-none');
              }
        )
        .then((data) => {
          this.modeloInputComparador.estadoExpansion = estadoAnimacion == 'abierta' ? 'cerrada' : 'abierta';
          this.modeloInputComparador.iconoFiltro.nombre =
            this.modeloInputComparador.estadoExpansion == 'abierta' ? 'keyboard_arrow_up' : 'filter_list';
          this.modeloInputComparador.estadoAnimacion = 'terminada';
          this.modeloInputComparador = cloneDeep(this.modeloInputComparador);
        });
    }
  }
}
