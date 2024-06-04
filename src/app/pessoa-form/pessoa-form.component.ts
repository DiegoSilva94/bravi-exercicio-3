import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {makePessoa, Pessoa} from "../../entities/pessoa";
import {pessoaService} from "../../service/pessoa.service";
import {FormsModule} from "@angular/forms";
import {Contato} from "../../entities/contato";
import {contatoService} from "../../service/contato.service";

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  templateUrl: './pessoa-form.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrl: './pessoa-form.component.scss'
})
export class PessoaFormComponent {
  pessoa: Pessoa = { id: null, nome: ''}
  model: Pessoa = { id: null, nome: ''}
  editarContatos: Contato[] = []
  removeContatos: Contato[] = []
  adicionaContatos: Contato[] = [{id: null, tipo: '', informacao: ''}]
  constructor(public route:ActivatedRoute, public router: Router) {
  }
  ngOnInit() {
    const pessoaId = Number(this.route.snapshot.paramMap.get('id'));
    if (pessoaId) {
      pessoaService.buscaPessoa(pessoaId).then(pessoa => {
        this.pessoa = makePessoa(pessoa.id, pessoa.nome)
        this.model = makePessoa(pessoa.id, pessoa.nome)
        contatoService.buscaContatosPessoa(this.pessoa).then(contatos => {
          this.editarContatos = contatos
        })
      }).catch(e => {
        this.router.navigate(['pessoa']);
      })
    }
  }

  async onSubmit() {
    let pessoa: Pessoa|null = null
    if (this.model.id) {
       pessoa = await pessoaService.atualizaPessoa(this.model.id, this.model.nome)
    } else {
      pessoa = await pessoaService.adicionaPessoa(this.model.nome)
    }
    if (!pessoa) {
      // TODO aplica validação do formulario para usuario
      return;
    }
    for (let contato of this.editarContatos) {
      if (!contato.informacao) continue
      await contatoService.atualizaContato(pessoa, contato)
      // TODO validar atualização do cadastro
    }
    for (let contato of this.removeContatos) {
      await contatoService.removeContato(pessoa, contato)
      // TODO validar remoção do cadastro
    }
    for (let contato of this.adicionaContatos) {
      if (!contato.tipo || !contato.informacao) continue
      await contatoService.adicionaContato(pessoa, contato)
      // TODO validar adição do cadastro
    }
    this.router.navigate(['/pessoa', { id: pessoa.id }]);
  }
  excluirContato(idx: number) {
    this.removeContatos.push(...this.editarContatos.splice(idx, 1))
  }
  removeContato(idx: number) {
    this.adicionaContatos.splice(idx, 1)
  }
  adicionaContato() {
    this.adicionaContatos.push({id: null, tipo: '', informacao: ''})
  }

  protected readonly JSON = JSON;
}
