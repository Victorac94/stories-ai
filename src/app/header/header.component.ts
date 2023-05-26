import { Component, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { storiesSearchIndex } from 'src/assets/utils/stories_search_index';
import { IStorySearchIndex } from 'src/interfaces/storySearchIndex';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  @ViewChild('mobileHeader') mobileHeader: ElementRef = new ElementRef('');
  @ViewChild('mobileHeaderBackdrop') mobileHeaderBackdrop: ElementRef = new ElementRef('');

  @ViewChild('mobileSearchInput') mobileSearchInput: ElementRef = new ElementRef('');
  @ViewChild('mobileSearchResultsBox') mobileSearchResultsBox: ElementRef = new ElementRef('');
  @ViewChild('desktopSearchInput') desktopSearchInput: ElementRef = new ElementRef('');
  @ViewChild('desktopSearchResultsBox') desktopSearchResultsBox: ElementRef = new ElementRef('');

  searchResults: IStorySearchIndex[] = [] as IStorySearchIndex[];
  desktopSearchResults: IStorySearchIndex[] = [] as IStorySearchIndex[];
  noSearchResults: boolean = false;
  previousResultsLength: number = 0;

  routerEventsSubscription: Subscription = new Subscription();

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

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
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
    this.renderer.removeClass(this.desktopSearchResultsBox.nativeElement, 'show-' + this.previousResultsLength);

    this.renderer.addClass(this.mobileSearchResultsBox.nativeElement, 'show');
    this.renderer.addClass(this.mobileSearchResultsBox.nativeElement, 'show-' + rowsShown);
    this.renderer.addClass(this.desktopSearchResultsBox.nativeElement, 'show');
    this.renderer.addClass(this.desktopSearchResultsBox.nativeElement, 'show-' + rowsShown);

    this.previousResultsLength = rowsShown;
  }

  /**
   * Hides the search results box
   */
  hideSearchResultsBox(): void {
    this.renderer.removeClass(this.mobileSearchResultsBox.nativeElement, 'show');
    this.renderer.removeClass(this.desktopSearchResultsBox.nativeElement, 'show');
  }

  /**
   * Searches stories by title and spanish genre given a string
   * 
   * @param searchText text to search stories by
   */
  searchStory(searchText: string): void {
    searchText = searchText.trim().toLowerCase();

    // If there is nothing written on input, hide results box
    if (searchText === '') {
      this.noSearchResults = false;
      this.searchResults = [];
      this.desktopSearchResults = [];
      this.hideSearchResultsBox();
      return;
    }

    // Search stories by title, english genre and spanish genre
    this.searchResults = storiesSearchIndex.filter(story => {
      if (story.title.toLowerCase().includes(searchText)
        || story.genre.toLowerCase().includes(searchText)
        || story.genre_es.toLowerCase().includes(searchText)) {
        return true;
      }

      return false;
    })

    // Case: No story is found
    if (this.searchResults.length === 0) {
      this.noSearchResults = true;
      this.showSearchResultsBox(1); // For showing 'no results found' text

      // Case: Found one or more stories
    } else {
      this.noSearchResults = false;
      this.showSearchResultsBox(this.searchResults.length); // For showing search results
    }

  }

  /**
   * Load selected story from search results
   * 
   * @param story story to load
   */
  onLoadSearchedStory(story: IStorySearchIndex): void {
    // Clear search input
    this.renderer.setProperty(this.mobileSearchInput.nativeElement, 'value', '');
    this.renderer.setProperty(this.desktopSearchInput.nativeElement, 'value', '');

    // Navigate to selected story
    this.router.navigate(['genres', story.genre, story.story_id]);

    // TODO: Arreglar que no haga nada cuando hacemos click en la misma historia en la que ya estamos
  }

  /**
   * Set focus on search input
   */
  setSearchInputFocus(device: string = 'mobile'): void {

    if (device === 'mobile') {
      this.mobileSearchInput.nativeElement.focus();
    } else if (device === 'desktop') {
      this.desktopSearchInput.nativeElement.focus();
    }
  }

}
