import { Component, OnInit } from '@angular/core';
import { ComparadorHookasInputModel } from 'projects/generales/src/lib/comparador-hookas/interfaces/ComparadorHooksInputModel';
import { AnimationControllerService } from '../../../../../projects/generales/src/lib/servicios/animation-controller.service';
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
    sufijoIcono: {
      nombre: 'filter_list',

      alHacerClick: () => {
        if (this.modeloInputComparador.estadoAnimacion == 'terminada') {
          let estadoAnimacion = this.modeloInputComparador.estadoExpansion;
          this.modeloInputComparador.estadoAnimacion = 'empezada';
          this.animationController
            .ejecutarAnimacion(
              '.filtrosAvanzados',
              estadoAnimacion == 'abierta'
                ? { height: '0px', opacity: 0, duration: 100 }
                : { height: '100%', opacity: 1, duration: 100 }
            )
            .then((data) => {
              this.modeloInputComparador.estadoExpansion =
                estadoAnimacion == 'abierta' ? 'cerrada' : 'abierta';
              this.modeloInputComparador.estadoAnimacion = 'terminada';
            });
        }
      },
      customClass: 'c-pointer',
    },
  };

  constructor(private animationController: AnimationControllerService) {}

  ngOnInit(): void {}
}
