export class Book {
  id!: number;
  anio!: number;
  descripcion!: string;
  publicado!: boolean;
  titulo!: string;
  autor!: Autor;
}

export class Autor {
  id!: number;
  nombre!: string;
  genero!: string;
}
