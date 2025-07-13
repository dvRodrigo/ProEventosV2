import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
form: FormGroup  = this.carregarFormGroup();

public get f() {
    return this.form.controls;
  }
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

  }

    public validation(): void {
      this.form = this.fb.group({
        tema: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
        local: ['',Validators.required],
        dataEvento: ['',Validators.required],
        qtdPessoas: ['',[Validators.required,Validators.min(1),Validators.max(120000)]],
        imagemURL: ['',Validators.required],
        telefone: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]]
      });
    }

    public carregarFormGroup(): FormGroup {
      this.validation();
      return this.form;
    }
    public resetForm(): void {
      this.form.reset();
      this.validation();
    }
}
