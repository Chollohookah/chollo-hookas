import { Component, OnInit } from '@angular/core';
import { ComparadorHookasInputModel } from 'projects/generales/src/lib/comparador-hookas/interfaces/ComparadorHooksInputModel';

@Component({
  selector: 'app-base-landing',
  templateUrl: './base-landing.component.html',
  styleUrls: ['./base-landing.component.scss'],
})
export class BaseLandingComponent implements OnInit {
  public modeloInputComparador: ComparadorHookasInputModel = {
    textoInputAntesDeClickear: 'Introduce algo',
    placeholderAlComenzarAEscribir: 'Cachimbas de todo tipo...',
    sufijoIcono: {
      nombre: 'filter_list',
      alHacerClick: () => {
        console.log('hola',this instanceof BaseLandingComponent);
      },
      customClass: 'c-pointer',
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
