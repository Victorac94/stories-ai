import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IStoryOption } from 'src/interfaces/storyOption';
import { AuxiliaryService } from '../auxiliary.service';

@Component({
  selector: 'app-choose-option',
  templateUrl: './choose-option.component.html',
  styleUrls: ['./choose-option.component.scss']
})
export class ChooseOptionComponent implements OnInit {

  @Input() optionA: IStoryOption | undefined = {} as IStoryOption;
  @Input() optionB: IStoryOption | undefined = {} as IStoryOption;
  @Input() chooseOption: string = 'primary';

  @Output() optionSelected = new EventEmitter<any>();

  @ViewChild('desktopImageA') desktopImageA: ElementRef = new ElementRef('');
  @ViewChild('desktopImageB') desktopImageB: ElementRef = new ElementRef('');
  @ViewChild('mobileImageA') mobileImageA: ElementRef = new ElementRef('');
  @ViewChild('mobileImageB') mobileImageB: ElementRef = new ElementRef('');

  constructor(
    private renderer: Renderer2,
    private auxiliaryService: AuxiliaryService
  ) {

  }

  ngOnInit(): void {
    // Remove active-option class when user is restarting the story
    this.auxiliaryService.restart.subscribe((restarting: boolean) => {
      if (restarting === true) {
        this.renderer.removeClass(this.desktopImageA.nativeElement, 'active-option');
        this.renderer.removeClass(this.mobileImageA.nativeElement, 'active-option');
        this.renderer.removeClass(this.desktopImageB.nativeElement, 'active-option');
        this.renderer.removeClass(this.mobileImageB.nativeElement, 'active-option');
      }
    })

    this.auxiliaryService.removeChooseOptionStyles.subscribe((chooseOption: string) => {
      // Remove active styles from selected choose options
      // chooseOption is either 'primary' or 'secondary
      if (this.chooseOption === chooseOption) {
        this.renderer.removeClass(this.desktopImageA.nativeElement, 'active-option');
        this.renderer.removeClass(this.mobileImageA.nativeElement, 'active-option');
        this.renderer.removeClass(this.desktopImageB.nativeElement, 'active-option');
        this.renderer.removeClass(this.mobileImageB.nativeElement, 'active-option');
      }
    })
  }

  /**
   * When user selects an option in the story, emit an event with the selected option and whether this is the first 'select option' in the story or not, and stylize the selected option.
   * 
   * @param option option selected by the user
   * @param chosenOption whether this is the first 'select option' in the story or the second one
   * @returns void
   */
  selectOption(option: IStoryOption | undefined, chosenOption: string): void {
    // If user has already selected A or B option, do not do anything
    // if (this.isOptionChosen) return;

    // If user selects option A
    if (chosenOption === 'A') {
      this.optionSelected.emit({ option, chooseOption: this.chooseOption });
      this.renderer.addClass(this.desktopImageA.nativeElement, 'active-option');
      this.renderer.addClass(this.mobileImageA.nativeElement, 'active-option');
      this.renderer.removeClass(this.desktopImageB.nativeElement, 'active-option');
      this.renderer.removeClass(this.mobileImageB.nativeElement, 'active-option');

      // If user selects option B
    } else if (chosenOption === 'B') {
      this.optionSelected.emit({ option, chooseOption: this.chooseOption });
      this.renderer.addClass(this.desktopImageB.nativeElement, 'active-option');
      this.renderer.addClass(this.mobileImageB.nativeElement, 'active-option');
      this.renderer.removeClass(this.desktopImageA.nativeElement, 'active-option');
      this.renderer.removeClass(this.mobileImageA.nativeElement, 'active-option');
    }
  }

}
