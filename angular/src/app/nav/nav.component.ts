import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  votingStarted: boolean = false;
  locale: boolean = true; // true for default

  constructor(private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('tr');
  }

  ngOnInit(): void {
    // generate a if that checks its not the home page enable votingStarted
    if (this.router.url === '/' || this.router.url.startsWith('/?')) {
      this.votingStarted = true;
    } else {
      this.votingStarted = false;
    }
  }

  switchLanguage() {
    this.locale = !this.locale; // Switch the locale
    this.locale !== true ? this.translate.use('en') : this.translate.use('tr');
  }
}
