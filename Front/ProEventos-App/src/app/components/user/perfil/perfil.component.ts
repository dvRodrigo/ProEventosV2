import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
form!: FormGroup;

public get f() {
    return this.form.controls;
  }
  constructor(public fb:FormBuilder) { }

  ngOnInit() {
    this.validation();
  }

   public validation(): void {

      const formOptions: AbstractControlOptions = {
        validators: ValidatorField.MustMatch('senha', 'confirmarSenha'),
      };

      this.form = this.fb.group({
        primeiroNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        ultimoNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmarSenha: ['', [Validators.required]],
        telefone: ['', [Validators.required]],
        funcao: ['', [Validators.required]],
        titulo: ['', [Validators.required]],
        descricao: ['', [Validators.required]]
      }, formOptions);
    }

    public resetForm(event:any): void {
      event.preventDefault();
      this.form.reset();
    }
}
