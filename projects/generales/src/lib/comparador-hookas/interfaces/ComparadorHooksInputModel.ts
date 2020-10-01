export interface ComparadorHookasIconoConfig {
  nombre: string;
  alHacerClick: Function;
  customClass:string;
}

export interface ComparadorHookasInputModel {
  textoInputAntesDeClickear: string;
  placeholderAlComenzarAEscribir: string;
  sufijoIcono: ComparadorHookasIconoConfig;
  
  estadoAnimacion:'empezada'|'terminada';
  estadoExpansion:'abierta'|'cerrada';
}
