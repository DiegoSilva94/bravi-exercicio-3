import {Injectable} from "@angular/core";
import {Pessoa} from "../entities/pessoa";
import {ApiService} from "./api.service";
import {Contato} from "../entities/contato";

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  api = new ApiService

  constructor() {}

  async buscaContatosPessoa(pessoa: Pessoa): Promise<Contato[]> {
    const data = await this.api.get(`pessoa/${pessoa.id}/contato`).catch(e => {
      throw new Error(e.message)
    })
    return data?.data ?? [];
  }
  async adicionaContato(pessoa: Pessoa, contato: Contato): Promise<Contato> {
    const data = await this.api.post(`pessoa/${pessoa.id}/contato`, {
      tipo: contato.tipo,
      informacao: contato.informacao
    }).catch(e => {
      throw new Error(e.message)
    })
    return data?.data ?? null;
  }
  async atualizaContato(pessoa: Pessoa, contato: Contato): Promise<Contato|null> {
    const data = await this.api.put(`pessoa/${pessoa.id}/contato/${contato.id}`, {
      informacao: contato.informacao
    }).catch(e => {
      throw new Error(e.message)
    })
    return data?.data ?? null
  }

  async removeContato(pessoa: Pessoa, contato: Contato): Promise<string> {
    const data = await this.api.delete(`pessoa/${pessoa.id}/contato/${contato.id}`).catch(e => {
      throw new Error(e.message)
    })
    return data.message
  }
}
export const contatoService = new ContatoService()
