import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IStory } from 'src/interfaces/story';
import { IStoryOption } from 'src/interfaces/storyOption';

import { AuxiliaryService } from '../auxiliary.service';

import { diverseStories } from 'src/assets/stories/diverse_stories';
import { spaceStories } from 'src/assets/stories/space_stories';
import { horrorStories } from 'src/assets/stories/horror_stories';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss']
})
export class StoryPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('container') container: ElementRef = new ElementRef('');

  story: IStory | undefined = undefined;
  storyId: number = 1;
  selectedPrimaryChooseOption: IStoryOption = {} as IStoryOption;
  selectedSecondaryChooseOption: IStoryOption = {} as IStoryOption;
  isPrimaryChooseOptionSelected: boolean = false;
  isSecondaryChooseOptionSelected: boolean = false;

  isMainImageLoaded: boolean = false;

  routerEventsSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private auxiliaryService: AuxiliaryService,
    private renderer: Renderer2
  ) { }

  @HostListener('window:resize') onScreenResize() {
    this.setPageBackgroundImage();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadStory();

    // Used when user selects a story from search results
    this.routerEventsSubscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.restartStory(true, 'instant' as ScrollBehavior);
        this.setPageBackgroundImage();
      }
    })
  }

  ngAfterViewInit() {
    this.setPageBackgroundImage();
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }

  onMainImageLoad(): void {
    this.isMainImageLoaded = true;
  }

  /**
   * Load story given 'genre' and 'storyId' from URL /genres/:genre/:storyId
   */
  loadStory(): void {
    let genre = this.router.url.split('/')[2] // Get the genre from URL /genres/:genre/:storyId
    let storyId = parseInt(this.router.url.split('/')[3]) // Get the genre from URL /genres/:genre/:storyId
    this.storyId = storyId;

    switch (genre) {
      case 'space':
        this.story = this.loadStoryData(spaceStories, storyId, genre);
        break;
      case 'desert':
        this.story = this.loadStoryData(diverseStories, storyId, genre);
        break;
      case 'horror':
        this.story = this.loadStoryData(horrorStories, storyId, genre);
        break;
      case 'diverse':
        this.story = this.loadStoryData(diverseStories, storyId, genre);
        break;
    }
  }

  /**
   * Return the desired story from an array of stories
   * 
   * @param stories Array of stories to look in
   * @param storyId ID of the story
   * @param genre genre page to redirect to if no story is found
   * @returns If found, the story. Otherwise return undefined and redirect to the specified genre page
   */
  loadStoryData(stories: IStory[], storyId: number, genre: string): IStory | undefined {
    // Find specified story by it's ID
    let foundStory = stories.find(story => story.id === storyId);

    // Return story
    if (foundStory !== undefined) {
      return foundStory;
    }

    // If no story is found with provided ID, go back to genres page
    this.router.navigate(['genres', genre]);
    return undefined;
  }

  /**
   * Shows selected option content. If selecting 'primary' chooseOption, hides 'secondary' chooseOption story content
   * 
   * @param $event Object containing 'A' or 'B' option object and wheter it's 'primary' or 'secondary' chooseOption
   */
  onSelectOption($event: any): void {
    if ($event.chooseOption === 'primary') {
      this.selectedPrimaryChooseOption = $event.option;
      this.isPrimaryChooseOptionSelected = true;
      this.isSecondaryChooseOptionSelected = false;
      this.auxiliaryService.doRemoveChooseOptionStyles('secondary');

    } else if ($event.chooseOption === 'secondary') {
      this.selectedSecondaryChooseOption = $event.option;
      this.isSecondaryChooseOptionSelected = true;
    }
  }

  /**
   * Reset story option choices and scroll to top
   * 
   * @param isLoadingNewStory Wether we are loading a new story or the same one. Defaults to `false`
   * @param scrollBehavior Whether to scroll top with 'smooth' or 'instant' behavior. Defaults to `smooth`
   */
  restartStory(isLoadingNewStory: boolean = false, scrollBehavior: ScrollBehavior = 'smooth'): void {
    this.selectedPrimaryChooseOption = {} as IStoryOption;
    this.selectedSecondaryChooseOption = {} as IStoryOption;
    this.isPrimaryChooseOptionSelected = false;
    this.isSecondaryChooseOptionSelected = false;

    // If user is loading a new story from search results
    if (isLoadingNewStory) {
      this.story = undefined;
      this.isMainImageLoaded = false;
    }

    this.auxiliaryService.restartStory(isLoadingNewStory);
    this.loadStory();

    window.scrollTo({
      top: 0,
      behavior: scrollBehavior
    })
  }

  /**
   * Sets the background image of the current page depending on the current story. It selects the main story's image.
   * Only viewed on desktop devices
   */
  setPageBackgroundImage(): void {
    if (window.innerWidth > 992) {
      // Set the background image of the page.
      this.renderer.setStyle(this.container.nativeElement, 'background-image', `url('${this.story?.rootStory.image_desktop}')`);
    }
  }
}