export const SHARED_NAVBAR = [
    {
        'tag': 'sharedNavbar',
        'value': 'Generate shared navbar',
        'html':
`<div class="p-3 flex items-center menu-bar">
<p-menubar [model]="dashboardLinks" class="w-full" style="margin-right: 12px">
  <div class="flex items-center">

      <ng-container *ngIf="this.walletAddress !== null && this.walletAddress !== undefined">
        <button #avatar (click)="this.router.navigateByUrl('profile')" pButton [label]=this.walletService.getShrinkWalletAddress() class="cursor-pointer"> </button>
      </ng-container>

      <ng-container *ngIf="this.walletAddress === null || this.walletAddress === undefined">
        <button (click)="this.walletService.connectWallet()" pButton label="Connect wallet" style="margin-left: 12px"></button>
      </ng-container>

      <ng-container *ngIf="this.walletAddress !== null && this.walletAddress !== undefined" #disconnect>
        <button (click)="this.walletService.disconnectWallet()" pButton label="Disconnect wallet" style="margin-left: 12px"></button>
      </ng-container>
  </div>
</p-menubar>
</div>
`,
        'ts':
`import {Component, NgZone, OnInit, Self} from '@angular/core';
import {WalletService} from "../../services/wallet.service";
import {MenuItem} from "primeng/api";
import {MenuService} from "../../services/menu.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [MenuService]
})
export class NavbarComponent implements OnInit {
  public isLightMode!: boolean;
  public dashboardLinks!: MenuItem[];
  walletAddress:any;

  constructor(
    @Self() private menuService: MenuService,
    public walletService: WalletService,
    private _ngZone: NgZone,
    public router: Router,
  ) { }

  async ngOnInit() {

    // Initializes the wallet
    this.walletService.getWalletSubject().subscribe(async (walletAddress: any) => {
      this._ngZone.run(() => {
        // Sets the local wallet address
        this.walletAddress = walletAddress
        // Sets all the navbar links
        this.dashboardLinks = this.menuService.setDashboardLinks(this.walletAddress);
      });
    });
  }

}

`,
    }
];