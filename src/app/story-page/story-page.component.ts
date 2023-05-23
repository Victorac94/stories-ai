import { Component, OnInit, } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { IStory } from 'src/interfaces/story';
import { IStoryOption } from 'src/interfaces/storyOption';

import { AuxiliaryService } from '../auxiliary.service';

import { diverseStories } from 'src/assets/stories/diverse_stories';
import { spaceStories } from 'src/assets/stories/space_stories';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss']
})
export class StoryPageComponent implements OnInit {

  story: IStory | undefined = undefined;
  storyId: number = 1;
  selectedPrimaryChooseOption: IStoryOption = {} as IStoryOption;
  selectedSecondaryChooseOption: IStoryOption = {} as IStoryOption;
  isPrimaryChooseOptionSelected: boolean = false;
  isSecondaryChooseOptionSelected: boolean = false;

  constructor(
    private router: Router,
    private auxiliaryService: AuxiliaryService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadStory();

    // Used when user selects a story from search results
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.restartStory(true, 'instant' as ScrollBehavior);
      }
    })
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
      case 'terror':
        this.story = this.loadStoryData(diverseStories, storyId, genre);
        break;
      case 'diverse':
        this.story = this.loadStoryData(diverseStories, storyId, genre);
        break;
    }
    console.log(this.story);
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
    console.log('onSelectOption() chooseOption chooseOptionStory', $event.chooseOption, $event);

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
    }

    this.auxiliaryService.restartStory();
    this.loadStory();

    window.scrollTo({
      top: 0,
      behavior: scrollBehavior
    })
  }

  /**
   * Capitalizes the first letter of the string
   * 
   * @param text string to capitalize
   */
  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}