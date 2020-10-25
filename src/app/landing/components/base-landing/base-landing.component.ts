import { Component, OnInit } from '@angular/core';
import { ComparadorHookasComponent } from 'projects/generales/src/lib/comparador-hookas/comparador-hookas.component';
import { ComparadorHookasInputModel } from 'projects/generales/src/lib/comparador-hookas/interfaces/ComparadorHooksInputModel';
import { AnimationControllerService } from '../../../../../projects/generales/src/lib/servicios/animation-controller.service';
import { HookaSearcherInputComponent } from '../../../../../projects/generales/src/lib/comparador-hookas/sub-comps/hooka-searcher-input/hooka-searcher-input.component';

@Component({
  selector: 'app-base-landing',
  templateUrl: './base-landing.component.html',
  styleUrls: ['./base-landing.component.scss'],
})
export class BaseLandingComponent implements OnInit {
  public modeloInputComparador: ComparadorHookasInputModel = {
    textoInputAntesDeClickear: 'Introduce algo',
    placeholderAlComenzarAEscribir: 'Cachimbas de todo tipo...',
    estadoAnimacion: 'terminada',
    estadoExpansion: 'cerrada',
    iconoFiltro: {
      nombre: 'filter_list',
      condition: (context) => {
        return true;
      },
      alHacerClick: (context: HookaSearcherInputComponent) => {
        context.cerrarFiltrosAvanzados.subscribe((data) => {
          if (this.modeloInputComparador.estadoExpansion == 'abierta') this.triggerVisibilityStatefilters();
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

  constructor(private animationController: AnimationControllerService) {}

  ngOnInit(): void {}

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
                height: '100%',
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
          this.modeloInputComparador.estadoAnimacion = 'terminada';
        });
    }
  }
}
