import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

modalRef!: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public larguraImagem: number = 150;
  public margemImagem: number = 2;
  public mostrarImagem: boolean = true;
  private filtroListado: string = '';

  public get filtroLista(): string { return this.filtroListado; }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados=(this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos);
  }

  public filtrarEventos(filtrarPor: string): Evento[] {

    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento : Evento )=> evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

    constructor(private eventoService: EventoService,
      private modalService: BsModalService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService,
      private router: Router
    ) { }


  public ngOnInit(): void {
    this.getEventos();

    this.spinner.show();
    setTimeout(() => {
    }, 5000);
  }

  public alterarImagem() : void {
    this.mostrarImagem = !this.mostrarImagem;
  }
  public getEventos() :void{

    this.eventoService.getEventos().subscribe({
      next: (eventosResp:Evento[]) => {
        this.eventos = eventosResp;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error(error);
        this.toastr.error('Erro ao carregar os Eventos...', 'Erro!');
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  public confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Evento deletado com sucesso!', 'Deletado!');
  }
  public decline(): void {
    this.modalRef.hide();
    // Implement decline logic here
  }

  public detalheEvento(id: number): void {
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }
}
