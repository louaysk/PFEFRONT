import { Component, OnInit, Input, QueryList, ViewChildren,ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { Router } from '@angular/router';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-organisations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
    @Input() pageSize = 4;
    pageNumber : number = 1
    organisations:any[] = []
    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor( public countryService: CountryService,private route :Router,private changeDetectorRef: ChangeDetectorRef) {
this.onGetOraganisations()
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
    this.onGetOraganisations(this.pageNumber,event[0])
}

onPageChange(event){
    this.onGetOraganisations(event,this.pageSize)
}

  onGetOraganisations(pageNumber = this.pageNumber,pageSize = this.pageSize){
    this.countryService.getorganisations(pageNumber,pageSize).subscribe(
        (res : any)=>{
            this.organisations= res.Items
            this.countryService.page--
            this.countryService.page++
            console.log('data is ',this.organisations)
        }
    )
}




}
