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

  constructor(
    private renderer: Renderer2,
    private auxiliaryService: AuxiliaryService
  ) {

  }

  ngOnInit(): void {
    // Remove active-option class when user is restarting the story
    this.restartSubscription = this.auxiliaryService.restart.subscribe((restarting: boolean) => {
      if (restarting === true) {
        this.renderer.removeClass(this.desktopImageA.nativeElement, 'active-option');
        this.renderer.removeClass(this.mobileImageA.nativeElement, 'active-option');
        this.renderer.removeClass(this.desktopImageB.nativeElement, 'active-option');
        this.renderer.removeClass(this.mobileImageB.nativeElement, 'active-option');
        this.renderer.removeClass(this.optionTextA.nativeElement, 'active-option');
        this.renderer.removeClass(this.optionTextB.nativeElement, 'active-option');
      }
    })

    this.removeChooseOptionsStylesSubscription = this.auxiliaryService.removeChooseOptionStyles.subscribe((chooseOption: string) => {
      // Remove active styles from selected choose options
      // chooseOption is either 'primary' or 'secondary
      if (this.chooseOption === chooseOption) {
        this.renderer.removeClass(this.desktopImageA.nativeElement, 'active-option');
        this.renderer.removeClass(this.mobileImageA.nativeElement, 'active-option');
        this.renderer.removeClass(this.desktopImageB.nativeElement, 'active-option');
        this.renderer.removeClass(this.mobileImageB.nativeElement, 'active-option');
        this.renderer.removeClass(this.optionTextA.nativeElement, 'active-option');
        this.renderer.removeClass(this.optionTextB.nativeElement, 'active-option');
      }
    })
  }

  ngOnDestroy(): void {
    this.restartSubscription.unsubscribe();
    this.removeChooseOptionsStylesSubscription.unsubscribe();
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
      this.renderer.removeClass(this.desktopImageB.nativeElement, 'active-option');
      this.renderer.removeClass(this.mobileImageB.nativeElement, 'active-option');
      this.renderer.removeClass(this.optionTextB.nativeElement, 'active-option');

      // If user selects option B
    } else if (chosenOption === 'B') {
      this.optionSelected.emit({ option, chooseOption: this.chooseOption });
      this.renderer.addClass(this.desktopImageB.nativeElement, 'active-option');
      this.renderer.addClass(this.mobileImageB.nativeElement, 'active-option');
      this.renderer.addClass(this.optionTextB.nativeElement, 'active-option');
      this.renderer.removeClass(this.desktopImageA.nativeElement, 'active-option');
      this.renderer.removeClass(this.mobileImageA.nativeElement, 'active-option');
      this.renderer.removeClass(this.optionTextA.nativeElement, 'active-option');
    }
  }

}