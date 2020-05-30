import { Component, OnInit, Input, QueryList, ViewChildren,ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { Router } from '@angular/router';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-billigstatement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './billigstatement.component.html',
  styleUrls: ['./billigstatement.component.scss']
})
export class BilligstatementComponent implements OnInit {
    @Input() pageSize = 4;
    pageNumber : number = 1
    billings:any[] = []
    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(public countryService: CountryService,private toastr:ToastrService,private route :Router,private changeDetectorRef: ChangeDetectorRef) {
    let IdOrganisation = localStorage.getItem("organizationId")
    if (IdOrganisation) {
        this.Ongetbillingstatements(IdOrganisation)
    }
    else
    {
        this.toastr.info('Please select a default organization');
        this.route.navigateByUrl('/organisations');
    }

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
    this.Ongetbillingstatements(this.pageNumber,event[0])
}

onPageChange(event){
    this.Ongetbillingstatements(event,this.pageSize)
}

  Ongetbillingstatements(IdOrganisation,pageNumber = this.pageNumber,pageSize = this.pageSize){
    this.countryService.getbillingstatements(IdOrganisation).subscribe(
        (res : any)=>{
            this.billings= res.Items
            this.countryService.page--
            this.countryService.page++
            console.log('data is ',this.billings)
        }
    )
}

}
