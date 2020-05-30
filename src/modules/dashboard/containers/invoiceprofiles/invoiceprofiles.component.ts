import { Component, OnInit, Input, QueryList, ViewChildren,ChangeDetectionStrategy ,ChangeDetectorRef } from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { Router } from '@angular/router';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-invoiceprofiles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoiceprofiles.component.html',
  styleUrls: ['./invoiceprofiles.component.scss']
})
export class InvoiceprofilesComponent implements OnInit {
    @Input() pageSize = 4;
    pageNumber : number = 1
    invoices:any[] = []
    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;


  constructor(public countryService: CountryService,private toastr:ToastrService,private route :Router,private changeDetectorRef: ChangeDetectorRef) {
    let IdOrganisation = localStorage.getItem("organizationId")
    if (IdOrganisation) {
    this.Ongetinvoiceprofils(IdOrganisation);
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
    this.Ongetinvoiceprofils(this.pageNumber,event[0])
}

onPageChange(event){
    this.Ongetinvoiceprofils(event,this.pageSize)
}

  Ongetinvoiceprofils(IdOrganisation,pageNumber = this.pageNumber,pageSize = this.pageSize){
    this.countryService.getinvoiceprofils(IdOrganisation).subscribe(
        (res : any)=>{
            this.invoices= res.Items
            this.countryService.page--
            this.countryService.page++
            console.log('data is ',this.invoices)
        }
    )
}



}
