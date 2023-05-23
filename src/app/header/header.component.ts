import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { storiesSearchIndex } from 'src/assets/stories/storiesSearchIndex';
import { IStorySearchIndex } from 'src/interfaces/storySearchIndex';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('mobileHeader') mobileHeader: ElementRef = new ElementRef('');
  @ViewChild('mobileHeaderBackdrop') mobileHeaderBackdrop: ElementRef = new ElementRef('');

  @ViewChild('mobileSearchInput') mobileSearchInput: ElementRef = new ElementRef('');
  @ViewChild('mobileSearchResultsBox') mobileSearchResultsBox: ElementRef = new ElementRef('');

  mobileSearchResults: IStorySearchIndex[] = [] as IStorySearchIndex[];
  noSearchResults: boolean = false;
  previousResultsLength: number = 0;

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.hideMobileMenu();
      }
    })
  }

  showMobileMenu(): void {
    this.mobileHeader.nativeElement.classList.add('open');
    this.mobileHeaderBackdrop.nativeElement.classList.add('show');
  }

  hideMobileMenu(): void {
    this.mobileHeader.nativeElement.classList.remove('open');
    this.mobileHeaderBackdrop.nativeElement.classList.remove('show');
    this.hideSearchResultsBox();
  }

  // Show/hide mobile menu
  toggleMobileMenu(): void {
    this.mobileHeader.nativeElement.classList.contains('open') ? this.hideMobileMenu() : this.showMobileMenu();
  }


  /**
   * Show search results box. Shows 3 results at maximum.
   * 
   * @param resultsLength Number of results to show
   */
  showSearchResultsBox(resultsLength: number): void {
    let rowsShown = resultsLength;

    // Maximum 3 rows to show
    if (resultsLength > 3) rowsShown = 3;

    // Remove previous show-1 show-2 or show-3 classes
    this.renderer.removeClass(this.mobileSearchResultsBox.nativeElement, 'show-' + this.previousResultsLength);

    this.renderer.addClass(this.mobileSearchResultsBox.nativeElement, 'show');
    this.renderer.addClass(this.mobileSearchResultsBox.nativeElement, 'show-' + rowsShown);

    this.previousResultsLength = rowsShown;
  }

  /**
   * Hides the search results box
   */
  hideSearchResultsBox(): void {
    this.renderer.removeClass(this.mobileSearchResultsBox.nativeElement, 'show');
  }

  /**
   * Searches stories by title and spanish genre given a string
   * 
   * @param searchText text to search stories by
   */
  searchStory(searchText: string): void {
    console.log('inputEvent ', searchText);
    searchText = searchText.trim().toLowerCase();

    // If there is nothing written on input, hide results box
    if (searchText === '') {
      this.noSearchResults = false;
      this.mobileSearchResults = [];
      this.hideSearchResultsBox();
      return;
    }

    // Search stories by title and spanish genre (genre_es)
    this.mobileSearchResults = storiesSearchIndex.filter(story => {
      if (story.title.toLowerCase().includes(searchText)
        || story.genre_es.toLowerCase().includes(searchText)) {
        return true;
      }

      return false;
    })

    // Case: No story is found
    if (this.mobileSearchResults.length === 0) {
      this.noSearchResults = true;
      this.showSearchResultsBox(1); // For showing 'no results found' text

      // Case: Found one or more stories
    } else {
      this.noSearchResults = false;
      this.showSearchResultsBox(this.mobileSearchResults.length); // For showing search results
    }

  }

}
