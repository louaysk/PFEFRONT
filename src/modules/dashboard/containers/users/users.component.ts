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
    @Input() pageSize = 4;
    pageNumber : number = 1
    userscrayon:any[] = []
    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
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
    this.onGetUsersCrayon(this.pageNumber,event[0])
}

onPageChange(event){
    this.onGetUsersCrayon(event,this.pageSize)
}

  onGetUsersCrayon(pageNumber = this.pageNumber,pageSize = this.pageSize){
    this.countryService.getuserscrayon(pageNumber,pageSize).subscribe(
        (res : any)=>{
            this.userscrayon= res.Items
            this.countryService.page--
            this.countryService.page++
            console.log('data is ',this.userscrayon)
        }
    )
}


}
