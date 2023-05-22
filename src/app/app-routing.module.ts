import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelegramMessageComponent } from './telegram-message/telegram-message.component';

const routes: Routes = [
  {path:"messages",component:TelegramMessageComponent},
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 