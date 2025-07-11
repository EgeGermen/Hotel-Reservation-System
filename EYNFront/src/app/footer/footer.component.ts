import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  showAbout: boolean = false;
  showPrivacy: boolean = false;

  toggleAbout() {
    this.showAbout = !this.showAbout;
  }

  togglePrivacy() {
    this.showPrivacy = !this.showPrivacy;
  }
}
