import { Component, OnInit, Input, QueryList, ViewChildren,ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { Router } from '@angular/router';




@Component({
  selector: 'sb-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    @Input() pageSize = 5;
    pageNumber : number = 1
    pageSizeRange = [5,15,30]
    userscrayon:any[] = []
    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    paginationArray: number = 10;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor( public countryService: CountryService,private route :Router,private changeDetectorRef: ChangeDetectorRef) {
    this.onGetUsersCrayon()

   }

  ngOnInit(): void {
    this.countryService.pageSize = this.pageSize;
    this.countries$ = this.countryService.countries$;
    this.total$ = this.countryService.total$;

  }


  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;
    this.countryService.sortColumn = column;
    this.countryService.sortDirection = direction;
    this.changeDetectorRef.detectChanges();
}


onPageSizeChange(event){
    // console.log("event",event.split(": "[1]))
    this.onGetUsersCrayon(this.pageNumber,event)
    console.log("paginationArray : ",this.paginationArray)
}

onPageChange(event){
    this.onGetUsersCrayon(event,this.pageSize)
    console.log("paginationArray : ",this.paginationArray)
}

  onGetUsersCrayon(pageNumber = this.pageNumber,pageSize = this.pageSize){
    this.countryService.getuserscrayon(pageNumber,pageSize).subscribe(
        (res : any)=>{
            this.userscrayon= res.Items
            this.countryService.page++
            this.countryService.page--
            console.clear
            this.paginationArray = res.TotalHits
            console.log('data is ',this.userscrayon)
            console.log(this.paginationArray)

        }
    )
}


}
