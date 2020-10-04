export type BootstrapColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'muted'
  | 'white';

export interface AnunciosHookas {
  texto: 'AGOTADO' | 'OFERTA' | 'ULTIMOS';
  color: BootstrapColors;
  textColor: BootstrapColors;
  onClick?: Function;
  customClass?: string;
  extraData?: any;
}
