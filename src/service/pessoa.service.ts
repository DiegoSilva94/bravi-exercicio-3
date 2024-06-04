import {Injectable} from "@angular/core";
import {Pessoa} from "../entities/pessoa";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  api = new ApiService

  constructor() {}

  async buscaTodasPessoas(): Promise<Pessoa[]> {
    const data = await this.api.get('pessoa').catch(e => {
      throw new Error(e.message)
    })
    return data?.data ?? [];
  }
  async buscaPessoa(id: number):Promise<Pessoa> {
    const data = await this.api.get(`pessoa/${id}`).catch(e => {
      throw new Error(e.message)
    })
    return data?.data ?? null;
  }
  async adicionaPessoa(nome: string): Promise<Pessoa> {
    const data = await this.api.post('pessoa', { nome }).catch(e => {
      throw new Error(e.message)
    })
    return data?.data ?? null;
  }
  async atualizaPessoa(id: number, nome:string): Promise<Pessoa|null> {
    const data = await this.api.put(`pessoa/${id}`, { nome }).catch(e => {
      throw new Error(e.message)
    })
    return data?.data ?? null
  }

  async removePessoa(id:number): Promise<string> {
    const data = await this.api.delete(`pessoa/${id}`).catch(e => {
      throw new Error(e.message)
    })
    return data.message
  }
}
export const pessoaService = new PessoaService()
