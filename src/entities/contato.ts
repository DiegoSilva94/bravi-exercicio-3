export interface Contato {
  id: number|null,
  tipo: number|string,
  informacao: string
}

export const makeContato = (id: number|null, tipo: number, informacao: string):Contato => {
  return { id, tipo, informacao }
}
