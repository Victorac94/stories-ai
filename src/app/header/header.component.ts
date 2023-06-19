import { Attribute } from '@angular/compiler';
import { Component, ElementRef, ViewChild, Renderer2, OnDestroy, HostListener, ViewChildren, QueryList } from '@angular/core';
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
  @ViewChildren('desktopSearchItem') desktopSearchItems: QueryList<ElementRef> = new QueryList<ElementRef>()

  @ViewChild('genres') menuGenres: ElementRef = new ElementRef('');
  @ViewChildren('genreName') menuGenreNames: QueryList<ElementRef> = new QueryList<ElementRef>();

  searchResults: IStorySearchIndex[] = [] as IStorySearchIndex[];
  searchResultsFocusIndex: number = -1;
  noSearchResults: boolean = false;
  previousResultsLength: number = 0;

  menuGenresFocusIndex: number = -1;

  routerEventsSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.hideMobileMenu();

        // Remove focus from genres dropdown elements when user has selected to navigate to one of those genres
        const activeGenreElementHref: string | null | undefined = document.activeElement?.getAttribute('href');
        const activeGenreName: ElementRef = this.menuGenreNames.toArray().filter(el => el.nativeElement.getAttribute('href') === activeGenreElementHref)[0];

        if (activeGenreName !== undefined) {
          activeGenreName.nativeElement.blur();
          this.menuGenresFocusIndex = -1;
        }
      }
    })
  }

  @HostListener('document:keydown', ['$event']) onHandleKeyDown($event: KeyboardEvent) {

    // #########################################
    // ############## MENU SEARCH ##############
    // #########################################

    // If focus is on search input or on search results dropdown list
    if (this.desktopSearchInput.nativeElement.contains(document.activeElement)
      || this.desktopSearchResultsBox.nativeElement.contains(document.activeElement)) {

      if ($event.code === 'ArrowDown' || $event.code === 'ArrowUp') {
        $event.preventDefault();

        // Move focus to the NEXT element
        if ($event.code === 'ArrowDown') {

          // To search input
          if (this.searchResultsFocusIndex >= this.desktopSearchItems.length - 1) {
            this.desktopSearchInput.nativeElement.focus();
            this.searchResultsFocusIndex = -1;
            return;

            // To first or next search result
          } else {
            this.searchResultsFocusIndex += 1;
          }

          // Move focus to the PREVIOUS element
        } else if ($event.code === 'ArrowUp') {

          // To search input
          if (this.searchResultsFocusIndex === 0) {
            this.desktopSearchInput.nativeElement.focus();
            this.searchResultsFocusIndex = -1;
            return;

            // To last search result
          } else if ($event.target === this.desktopSearchInput.nativeElement) {
            this.searchResultsFocusIndex = this.desktopSearchItems.length - 1;

            // To previous search result
          } else {
            this.searchResultsFocusIndex -= 1;
          }
        }

        // Set focus to corresponding element
        this.desktopSearchItems.toArray()[this.searchResultsFocusIndex].nativeElement.focus();
        return;
      }

      // If user Tabs out of search input, clear search input and hide search results
      if ($event.code === 'Tab' && this.desktopSearchInput.nativeElement.contains(document.activeElement)) {
        this.clearSearchInput();
        this.hideSearchResultsBox();
        this.searchResultsFocusIndex = -1;

        // If user Tabs on last search item or Shift+Tabs on first search item, move focus to search input
      } else if (
        ($event.code === 'Tab' && $event.shiftKey && $event.target === this.desktopSearchItems.toArray()[0].nativeElement)
        ||
        ($event.code === 'Tab' && !$event.shiftKey && $event.target === this.desktopSearchItems.toArray()[this.desktopSearchItems.length - 1].nativeElement)
      ) {
        this.desktopSearchInput.nativeElement.focus();
        this.searchResultsFocusIndex = -1;
        $event.preventDefault();
      }
    }

    // #########################################
    // ############## MENU GENRES ##############
    // #########################################

    if (this.menuGenres.nativeElement.contains(document.activeElement)) {

      // Handle Tab key presses
      // When Tabbing on last or first genre, move focus to next or previous focusable page element (away from menu genre names)
      if (($event.code === 'Tab' && !$event.shiftKey && this.menuGenresFocusIndex === this.menuGenreNames.length - 1)
        || ($event.code === 'Tab' && $event.shiftKey && this.menuGenresFocusIndex === 0)) {
        this.menuGenresFocusIndex = -1;
        return;
        // Move focus to next genre name
      } else if ($event.code === 'Tab' && !$event.shiftKey) {
        this.menuGenresFocusIndex += 1;
        return;
        // Move focus to previous genre name or reset genres focus index
      } else if ($event.code === 'Tab' && $event.shiftKey) {
        this.menuGenresFocusIndex -= this.menuGenresFocusIndex === -1 ? 0 : -1;
        return;
      }

      // Handle ArrowDown and ArrowUp on menu genres
      if ($event.code === 'ArrowDown' || $event.code === 'ArrowUp') {
        $event.preventDefault();

        // Move focus to the NEXT element
        if ($event.code === 'ArrowDown') {
          // To genres dropdown element
          if (this.menuGenresFocusIndex >= this.menuGenreNames.length - 1) {
            this.menuGenres.nativeElement.focus();
            this.menuGenresFocusIndex = -1;
            return;

            // To next genre name
          } else {
            this.menuGenresFocusIndex += 1;
          }

          // Move focus to the PREVIOUS element
        } else if ($event.code === 'ArrowUp') {
          // To genres dropdown element
          if (this.menuGenresFocusIndex === 0) {
            this.menuGenres.nativeElement.focus();
            this.menuGenresFocusIndex = -1;
            return;

            // To last genre name
          } else if (this.menuGenres.nativeElement === $event.target) {
            this.menuGenresFocusIndex = this.menuGenreNames.length - 1;
            // To previous genre name
          } else {
            this.menuGenresFocusIndex -= 1;
          }
        }

        // Set focus to corresponding genre name
        this.menuGenreNames.toArray()[this.menuGenresFocusIndex].nativeElement.focus();
      }
    }
  }

  /**
   * Load selected story from search items
   * 
   * @param $event When keyboard event is 'Enter', load selected story
   * @param searchItem Story to load
   */
  onSearchItemKeydown($event: KeyboardEvent, searchItem: IStorySearchIndex) {
    if ($event.code === 'Enter') {
      this.hideSearchResultsBox();
      this.onLoadSearchedStory(searchItem);
      this.noSearchResults = false;
      this.searchResults = [];
    }

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

    // Maximum 3 and a half rows to show. Allowing to scroll
    if (resultsLength > 3) {
      rowsShown = 4;
    } else if (resultsLength === 3) {
      rowsShown = 3;
    }

    // Remove previous show-1 show-2 show-3 or show-4 classes
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
    this.searchResultsFocusIndex = -1;
  }

  /**
   * Searches stories by title and spanish genre given a string
   * 
   * @param searchText text to search stories by
   */
  searchStory(searchText: string, $event?: Event): void {
    searchText = searchText.trim().toLowerCase();

    // If there is nothing written on input, hide results box
    if (searchText === '') {
      this.noSearchResults = false;
      this.searchResults = [];
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
    this.clearSearchInput();
    this.hideSearchResultsBox();

    // Navigate to selected story
    this.router.navigate(['genres', story.genre, story.story_id]);
  }

  /**
   * Set focus on search input or search for the found story (if there's only 1 search result)
   */
  onSearchEvent(device: string = 'mobile', functionality?: string): void {

    if (device === 'mobile') {
      // If mobile search input already has a search string and is showing 1 story search result, load that story.
      if (this.mobileSearchInput.nativeElement.value.trim() !== '') {
        this.searchFoundStory();

      } else {
        this.mobileSearchInput.nativeElement.focus();
      }
    } else if (device === 'desktop') {
      // If desktop search input already has a search string and is showing 1 story search result, load that story.
      if (this.desktopSearchInput.nativeElement.value.trim() !== '' && functionality === 'Enter') {
        this.searchFoundStory();

      } else {
        this.desktopSearchInput.nativeElement.focus();
      }
    }
  }

  /**
   * If search results has only 1 coincidence, load that story
   */
  searchFoundStory(): void {
    if (this.searchResults.length === 1 && this.noSearchResults === false) {
      this.hideSearchResultsBox();
      this.onLoadSearchedStory(this.searchResults[0]);
      this.searchResults = [];
      this.mobileSearchInput.nativeElement.blur();
      this.desktopSearchInput.nativeElement.blur();
    }
  }

  /**
   * Clear search input value on both mobile and desktop input
   */
  clearSearchInput(): void {
    this.renderer.setProperty(this.mobileSearchInput.nativeElement, 'value', '');
    this.renderer.setProperty(this.desktopSearchInput.nativeElement, 'value', '');
  }

}
