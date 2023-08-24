export const SERVICE_MENU = [
    {
        'tag': 'serviceMenu',
        'value': 'Generate Menu service',
        'ts':
`import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  public setDashboardLinks(address: string): MenuItem[] {
    return [
      {
        label: 'Marketplace',
        routerLink: '/',
        icon: 'pi pi-fw pi-home',
        styleClass: 'lg:mr-2',
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }

  public setProfileLinks(address: string): MenuItem[] {
    return [
      {
        label: this.getAddressLinkLabel(address),
        disabled: true,
      },
      {
        label: 'Profile',
        routerLink: '/profile',
        icon: 'pi pi-fw pi-user',
      },
    ];
  }

  private getAddressLinkLabel(address: string): string {
    return address ? \`0x...$'{address?.slice(-6).toLowerCase()}'\` : '';
  }
}
`
    }
];