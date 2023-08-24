export const COMPONENT_SEARCH = [
    {
        'tag': 'search',
        'value': 'Generating search component',
        'html':
`<div class="dropdown">
<div class="row" style="margin: 0px">
  <div class="col-6" id="searchId">
    <input type="text" class="form-control"
           id="searchValue" aria-describedby="writeColorCode"
           placeholder="Filter by..." (change)="this.setSearchValue($event)">
  </div>
  <div class="col-2" id="dropdownId">
    <div class="form-group">
      <select class="form-control" (change)="this.setSelectedCategory($event)">
        <option selected style="background-color: cornflowerblue; color: white">Categories</option>
        <option *ngFor="let category of this.categories">{{category}}</option>
      </select>
    </div>
  </div>
  <div class="col-4" id="filterButton">
    <button type="submit" class="btn btn-primary text-center" (click)="filterData()">Filter</button>
  </div>
</div>
</div>
`,
        'ts':
`import {Component, Input} from '@angular/core';
import {Filter} from "../../../models/filter.model";

@Component({
  selector: 'SearchComponent',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input('parent')
  public parent: any;

  public filter: Filter = new Filter();
  public categories: string[];
  public selectedCategory: string = '';
  public searchValue: string = '';

  constructor() {
    this.categories = ['Image', 'File'];
  }

  public setSelectedCategory(event: any) {
    this.selectedCategory = event.target.value;
  }

  public setSearchValue(event: any) {
    this.searchValue = event.target.value;
  }

  public filterData() {
    this.filter.searchCategory = this.selectedCategory;
    this.filter.searchValue = this.searchValue;
    this.parent.getItemsOnSale(this.filter);
  }
}
`,
        'css':
`#searchId {
    padding-right: 0;
  }
  
  #dropdownId {
    padding-left: 0;
    padding-right: 0;
  }
  
  #filterButton {
    padding-left: 0;
  }
  
  select {
    appearance: menulist-button;
  }  
`
    }
];