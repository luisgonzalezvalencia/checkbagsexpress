
export interface Valija {
  maleta_id: string,
  peso: number
}

export interface Pasaje {
  _id: string;
  nombre: string;
  vuelo: string;
  maletas: Valija[]
}


export interface Maletas {
  _id: string,
  pasajeroId: string,
  maletaId: string,
  peso: string,
  vuelo: string,
  despachada: boolean
}

export interface ResponseMaleta {
  message: string,
  maleta: Maletas
}
