export interface Pessoa {
  id: number|null
  nome: string
}

export const makePessoa = (id: number|null, nome:string): Pessoa => {
  return {
    id,
    nome
  }
}
