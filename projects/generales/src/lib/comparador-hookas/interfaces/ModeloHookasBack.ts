export interface Site {
  id: string;
  lastUpdate: Date;
  name: string;
  logo: string;
  data: Array<Hooka>;
}

export interface Hooka {
  precioRebajado: string;
  categorias: Array<string>;
  imagen: string;
  cantidad: string;
  precioOriginal: string;
  marca: string;
  modelo: string;
  titulo: string;
  divisa: string;
  etiquetas: Array<string>;
  agotado: boolean;
  linkProducto: string;
}
