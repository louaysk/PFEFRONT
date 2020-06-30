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
    @Input() pageSize = 5;
    pageNumber : number = 1
    pageSizeRange = [5,15,30]
    billings:any[] = []
    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    paginationArray: number = 10;
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
    if (event) {
        this.Ongetbillingstatements(this.pageNumber,event)
        console.log("paginationArray : ",this.paginationArray)
    }

}

onPageChange(event){
    this.Ongetbillingstatements(event,this.pageSize)
    console.log("paginationArray : ",this.paginationArray)

}

  Ongetbillingstatements(IdOrganisation,pageNumber = this.pageNumber,pageSize = this.pageSize){
    this.countryService.getbillingstatements(IdOrganisation).subscribe(
        (res : any)=>{
            console.log("res",res)
            this.billings= res.Items
            this.countryService.page++
            this.countryService.page--
            console.clear
            console.log('data is ',this.billings)
            this.paginationArray = res.TotalHits
            console.log(this.paginationArray)

        }
    )
}

print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
