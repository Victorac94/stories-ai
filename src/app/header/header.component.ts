import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('mobileHeader') mobileHeader: ElementRef = new ElementRef('')
  @ViewChild('mobileHeaderBackdrop') mobileHeaderBackdrop: ElementRef = new ElementRef('')

  constructor(
    private router: Router
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
  }

  // Show/hide mobile menu
  toggleMobileMenu(): void {
    this.mobileHeader.nativeElement.classList.contains('open') ? this.hideMobileMenu() : this.showMobileMenu();
  }
}
