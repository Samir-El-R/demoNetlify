import { Message } from '../message';
import { TelegramService } from './../telegram.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-telegram-message',
  templateUrl: './telegram-message.component.html',
  styleUrls: ['./telegram-message.component.scss']
})
export class TelegramMessageComponent implements OnInit {
  messages!: any[];
  constructor(
    private teleService: TelegramService,
  ) { }
  ngOnInit() {
    this.getMessages();

  }
  numMesseges: number = 10;
  getMessages(): void {
    console.log(this.teleService.getMessages());

    this.teleService.getMessages()
      .subscribe(
        messages => {
          this.messages = messages
          console.log(messages);
        }, err => {
          console.log(err);

        }
      );
  }
  getMessagesByMessageId(num: number) {

    this.teleService.getNumMessage(num).subscribe(
      messages => {
        this.messages = messages
        console.log(messages);
      }
    );
  }
  extraerCabecera(mensaje: string): string {
    const match = mensaje.match(/(AHORRA.+)\n/);
    return match ? match[1] : '';
  }

  extraerTitulo(mensaje: string): string {
    const match = mensaje.match(/🔹(.+)\n/);
    return match ? match[1] : '';
  }

  extraerEnlace(mensaje: string): string {
    const match = mensaje.match(/(https:.+)\n/);
    return match ? match[1] : '';
  }

  extraerCompartidoPor(mensaje: string): string {
    const match = mensaje.match(/Compartido por (.+)/);
    return match ? match[1] : '';
  }

  extraerLupa(mensaje: string): string {
    const match = mensaje.match(/🔎 (.+)/);
    return match ? match[1] : '';
  }
  extraerMasChollos(mensaje: string): string {
    const match = mensaje.match(/🔥 Más chollos: (.+)/);
    return match ? match[1] : '';
  }
  crearURLPerfil(username: string): string {
    return `https://www.chollometro.com/profile/${username}/overview`;
  }
  isLoading = false; // Bandera para controlar si se está cargando más contenido

  getMoreMessages() {
    if (!this.isLoading) { // Evitar realizar múltiples solicitudes al mismo tiempo
      this.isLoading = true; // Establecer la bandera a true para indicar que se está cargando contenido

      this.numMesseges += 10;
      this.teleService.getNumMessage(this.numMesseges).subscribe(
        messages => {
          this.messages = messages;
          console.log(messages);
          this.isLoading = false; // Establecer la bandera a false una vez que se haya completado la solicitud
        },
        error => {
          console.error(error);
          this.isLoading = false; // Asegurarse de restablecer la bandera en caso de error
        }
      );
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const scrollPosition = scrollTop + windowHeight;
    const triggerOffset = 200; // Umbral adicional para activar la carga de más mensajes

    if (scrollPosition >= scrollHeight - triggerOffset) {
      this.getMoreMessages();
    }
  }

}



