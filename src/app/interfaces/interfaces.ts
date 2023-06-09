
export interface Valija {
  maleta_id: string,
  peso: {
    $numberDecimal: string;
  }
}

export interface Pasaje {
  _id: string;
  nombre: string;
  vuelo: string;
  valijas: Valija[]
}
