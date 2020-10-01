import { Component, OnInit } from '@angular/core';
import { AnimationControllerService } from '../servicios/animation-controller.service';

@Component({
  selector: 'lib-cargando-cachimbas',
  templateUrl: './cargando-cachimbas.component.html',
  styleUrls: ['./cargando-cachimbas.component.scss'],
})
export class CargandoCachimbasComponent implements OnInit {
  constructor(private animationController: AnimationControllerService) {}

  ngOnInit(): void {
    this.animationController.ejecutarAnimacion('.cargandoCachimbas', {
      loop: true,
      easing: 'easeInOutSine',
      keyframes: [{ opacity: 0.5 }, { opacity: 1 }],
    });
  }
}
