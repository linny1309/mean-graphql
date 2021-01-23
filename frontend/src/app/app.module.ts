import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { QuotesComponent } from './components/quotes/quotes.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MenuComponent } from './components/menu/menu.component';
import { QuotesReadComponent } from './components/quotes-read/quotes-read.component';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    AuthorsComponent,
    TopBarComponent,
    MenuComponent,
    QuotesReadComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
