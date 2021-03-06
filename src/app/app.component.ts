import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorizationService} from './services/authorization.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sideNav') sideNav: MatSidenav;
  isLoggedIn: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private authorizationService: AuthorizationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      location.reload();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.isLoggedIn = AuthorizationService.isLoggedIn();
    this.authorizationService.loggedInUpdated.subscribe((loggedIn: boolean) => this.isLoggedIn = loggedIn);
  }

  onContentChanged() {
    if (this.mobileQuery.matches) {
      this.sideNav.close();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
