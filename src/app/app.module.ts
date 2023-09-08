import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { GenrePageComponent } from './genre-page/genre-page.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { GenreThumbnailComponent } from './genre-thumbnail/genre-thumbnail.component';
import { StoryThumbnailComponent } from './story-thumbnail/story-thumbnail.component';
import { ChooseOptionComponent } from './choose-option/choose-option.component';

import { WaveBorderDirective } from './directives/wave-border.directive';
import { ImagePlaceholderDirective } from './directives/image-placeholder.directive';
import { RevealTextDirective } from './directives/reveal-text.directive';
import { ImageRepositionDirective } from './directives/image-reposition.directive';

import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    GenrePageComponent,
    StoryPageComponent,
    GenreThumbnailComponent,
    StoryThumbnailComponent,
    ChooseOptionComponent,
    WaveBorderDirective,
    ImagePlaceholderDirective,
    CapitalizePipe,
    RevealTextDirective,
    ImageRepositionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
