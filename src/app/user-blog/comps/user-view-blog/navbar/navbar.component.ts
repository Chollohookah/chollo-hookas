import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface NavbarItems {
  hrefPath: string;
  label: string;
  fnOnClick?: Function;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navbarItems: Array<NavbarItems> = [
    {
      hrefPath: '/blog',
      label: 'Blog',
    },
    {
      hrefPath: '/',
      label: 'Compara',
    },
    {
      hrefPath: '',
      label: 'Contacta',
      fnOnClick: (event) => {
        event.preventDefault();
        this.scrollIntoFooter()
      },
    },
  ];
  constructor(private router: Router) {
  }

  ngOnInit(): void {}

  public scrollIntoFooter(): void {
    let top = document.getElementById('rootSubscribeButtonInOne');
    if (top) top.scrollIntoView({ behavior: 'smooth' });
  }

  public isActive(hrefPath: string): boolean {
    return this.router.url.toLowerCase() === hrefPath.toLowerCase();
  }
}
