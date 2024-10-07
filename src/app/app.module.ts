import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { VoiceComponent } from './voice/voice.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    VoiceComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
