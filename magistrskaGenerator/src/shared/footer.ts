export const SHARED_FOOTER = [
    {
        'tag': 'sharedFooter',
        'value': 'Generate shared footer',
        'html':
`<footer class="flex items-center justify-center border">NFT Marketplace [2023]</footer>
`,
        'ts':
`import {Component} from '@angular/core';
import {MenuService} from "../../services/menu.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    providers: [MenuService]
})
export class FooterComponent {
}
`
    }
];