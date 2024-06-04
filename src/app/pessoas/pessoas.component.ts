import {Component, computed, input} from '@angular/core';
import {pessoaService} from "../../service/pessoa.service";
import {Pessoa} from "../../entities/pessoa";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent {
  pessoas: Pessoa[] = []

  constructor() {
    pessoaService.buscaTodasPessoas().then((pessoas) => {
      this.pessoas = pessoas
    })
  }

}
