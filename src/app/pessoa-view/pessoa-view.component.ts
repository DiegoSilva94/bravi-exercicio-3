import { Component } from '@angular/core';
import {pessoaService} from "../../service/pessoa.service";
import {makePessoa, Pessoa} from "../../entities/pessoa";
import {contatoService} from "../../service/contato.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Contato} from "../../entities/contato";

@Component({
  selector: 'app-pessoa-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pessoa-view.component.html',
  styleUrl: './pessoa-view.component.scss'
})
export class PessoaViewComponent {
  pessoa: Pessoa = { id: null, nome: ''}
  contatos: Contato[] = []
  constructor(public route:ActivatedRoute, public router: Router) {
  }
  ngOnInit() {
    const pessoaId = Number(this.route.snapshot.paramMap.get('id'));
    if (pessoaId) {
      pessoaService.buscaPessoa(pessoaId).then(pessoa => {
        this.pessoa = pessoa
        contatoService.buscaContatosPessoa(this.pessoa).then(contatos => {
          this.contatos = contatos
        })
      }).catch(e => {
        this.router.navigate(['pessoa']);
      })
    }
  }
}
