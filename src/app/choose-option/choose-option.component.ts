import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IStoryOption } from 'src/interfaces/storyOption';
import { AuxiliaryService } from '../auxiliary.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choose-option',
  templateUrl: './choose-option.component.html',
  styleUrls: ['./choose-option.component.scss']
})
export class ChooseOptionComponent implements OnInit, OnDestroy {

  @Input() optionA: IStoryOption | undefined = {} as IStoryOption;
  @Input() optionB: IStoryOption | undefined = {} as IStoryOption;
  @Input() chooseOption: string = 'primary';

  @Output() optionSelected = new EventEmitter<any>();

  @ViewChild('desktopImageA') desktopImageA: ElementRef = new ElementRef('');
  @ViewChild('desktopImageB') desktopImageB: ElementRef = new ElementRef('');
  @ViewChild('mobileImageA') mobileImageA: ElementRef = new ElementRef('');
  @ViewChild('mobileImageB') mobileImageB: ElementRef = new ElementRef('');
  @ViewChild('optionTextA') optionTextA: ElementRef = new ElementRef('');
  @ViewChild('optionTextB') optionTextB: ElementRef = new ElementRef('');

  removeChooseOptionsStylesSubscription: Subscription = new Subscription();
  restartSubscription: Subscription = new Subscription();

  isDesktopOptionAImageLoaded: boolean = false;
  isDesktopOptionBImageLoaded: boolean = false;
  isMobileOptionAImageLoaded: boolean = false;
  isMobileOptionBImageLoaded: boolean = false;

  constructor(
    private renderer: Renderer2,
    private auxiliaryService: AuxiliaryService
  ) {

  }

  // TODO: ocultar las imágenes de choose option de la historia anterior cuando cargamos una historia nueva desde la propia story page

  ngOnInit(): void {
    // Remove active-option class when user is restarting the story
    this.restartSubscription = this.auxiliaryService.restart.subscribe((restarting: boolean) => {
      if (restarting === true) {
        this.removeChooseOptionStyles();

        this.isDesktopOptionAImageLoaded = false;
        this.isMobileOptionAImageLoaded = false;
        this.isDesktopOptionBImageLoaded = false;
        this.isMobileOptionBImageLoaded = false;
      }
    })

    this.removeChooseOptionsStylesSubscription = this.auxiliaryService.removeChooseOptionStyles.subscribe((chooseOption: string) => {
      // Remove active styles from selected choose options
      // chooseOption is either 'primary' or 'secondary
      if (this.chooseOption === chooseOption) {
        this.removeChooseOptionStyles();
      }
    })
  }

  ngOnDestroy(): void {
    this.restartSubscription.unsubscribe();
    this.removeChooseOptionsStylesSubscription.unsubscribe();
  }

  /**
   * Remove active styles (border and scale up) from options A and B
   */
  removeChooseOptionStyles(): void {
    this.renderer.removeClass(this.desktopImageA.nativeElement, 'active-option');
    this.renderer.removeClass(this.mobileImageA.nativeElement, 'active-option');
    this.renderer.removeClass(this.desktopImageB.nativeElement, 'active-option');
    this.renderer.removeClass(this.mobileImageB.nativeElement, 'active-option');
    this.renderer.removeClass(this.optionTextA.nativeElement, 'active-option');
    this.renderer.removeClass(this.optionTextB.nativeElement, 'active-option');

    this.renderer.removeClass(this.desktopImageA.nativeElement, 'show-border');
    this.renderer.removeClass(this.mobileImageA.nativeElement, 'show-border');
    this.renderer.removeClass(this.desktopImageB.nativeElement, 'show-border');
    this.renderer.removeClass(this.mobileImageB.nativeElement, 'show-border');
  }

  /**
   * When mousing over an option, add corresponding styles to show user interacting with the option
   * 
   * @param $event the fired event object
   * @param option option 'A' or 'B' mouse is hovering
   */
  onMouseEnterOption($event: Event, option: string): void {
    if (option === 'A') {
      this.renderer.addClass(this.desktopImageA.nativeElement, 'show-border');
      this.renderer.addClass(this.mobileImageA.nativeElement, 'show-border');
      this.renderer.addClass(this.optionTextA.nativeElement, 'active-option');

    } else if (option === 'B') {
      this.renderer.addClass(this.desktopImageB.nativeElement, 'show-border');
      this.renderer.addClass(this.mobileImageB.nativeElement, 'show-border');
      this.renderer.addClass(this.optionTextB.nativeElement, 'active-option');
    }
  }

  /**
   * When mousing out over an option, remove corresponding styles to show user interacting out of an option
   * 
   * @param $event the fired event object
   * @param option option 'A' or 'B' mouse is leaving
   */
  onMouseLeaveOption($event: Event, option: string): void {
    if (option === 'A') {
      if (!this.desktopImageA.nativeElement.classList.contains('active-option')) {
        this.renderer.removeClass(this.desktopImageA.nativeElement, 'show-border');
        this.renderer.removeClass(this.mobileImageA.nativeElement, 'show-border');
        this.renderer.removeClass(this.optionTextA.nativeElement, 'active-option');
      }

    } else if (option === 'B') {
      if (!this.desktopImageB.nativeElement.classList.contains('active-option')) {
        this.renderer.removeClass(this.desktopImageB.nativeElement, 'show-border');
        this.renderer.removeClass(this.mobileImageB.nativeElement, 'show-border');
        this.renderer.removeClass(this.optionTextB.nativeElement, 'active-option');
      }
    }
  }

  /**
   * When user selects an option in the story, emit an event with the selected option and whether this is the first 'select option' in the story or not, and stylize the selected option.
   * 
   * @param option option selected by the user
   * @param chosenOption whether this is the first 'select option' in the story or the second one
   * @returns void
   */
  selectOption(option: IStoryOption | undefined, chosenOption: string): void {

    // If user selects option A
    if (chosenOption === 'A') {
      this.optionSelected.emit({ option, chooseOption: this.chooseOption });
      this.renderer.addClass(this.desktopImageA.nativeElement, 'active-option');
      this.renderer.addClass(this.mobileImageA.nativeElement, 'active-option');
      this.renderer.addClass(this.optionTextA.nativeElement, 'active-option');
      this.renderer.addClass(this.desktopImageA.nativeElement, 'show-border');
      this.renderer.addClass(this.mobileImageA.nativeElement, 'show-border');

      this.renderer.removeClass(this.desktopImageB.nativeElement, 'active-option');
      this.renderer.removeClass(this.mobileImageB.nativeElement, 'active-option');
      this.renderer.removeClass(this.optionTextB.nativeElement, 'active-option');
      this.renderer.removeClass(this.desktopImageB.nativeElement, 'show-border');
      this.renderer.removeClass(this.mobileImageB.nativeElement, 'show-border');

      // If user selects option B
    } else if (chosenOption === 'B') {
      this.optionSelected.emit({ option, chooseOption: this.chooseOption });
      this.renderer.addClass(this.desktopImageB.nativeElement, 'active-option');
      this.renderer.addClass(this.mobileImageB.nativeElement, 'active-option');
      this.renderer.addClass(this.optionTextB.nativeElement, 'active-option');
      this.renderer.addClass(this.desktopImageB.nativeElement, 'show-border');
      this.renderer.addClass(this.mobileImageB.nativeElement, 'show-border');

      this.renderer.removeClass(this.desktopImageA.nativeElement, 'active-option');
      this.renderer.removeClass(this.mobileImageA.nativeElement, 'active-option');
      this.renderer.removeClass(this.optionTextA.nativeElement, 'active-option');
      this.renderer.removeClass(this.desktopImageA.nativeElement, 'show-border');
      this.renderer.removeClass(this.mobileImageA.nativeElement, 'show-border');
    }
  }

  onChooseOptionImageLoad(option: string, viewport: string): void {
    if (option === 'A' && viewport === 'desktop') {
      this.isDesktopOptionAImageLoaded = true;
    } else if (option === 'A' && viewport === 'mobile') {
      this.isMobileOptionAImageLoaded = true;

    } else if (option === 'B' && viewport === 'desktop') {
      this.isDesktopOptionBImageLoaded = true;
    } else if (option === 'B' && viewport === 'mobile') {
      this.isMobileOptionBImageLoaded = true;
    }
  }

}