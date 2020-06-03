import { Component, OnInit, Input, QueryList, ViewChildren,ChangeDetectionStrategy ,ChangeDetectorRef} from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { Router } from '@angular/router';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { Observable, BehaviorSubject } from 'rxjs';




@Component({
  selector: 'sb-clients',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
    @Input() pageSize = 5;
    pageNumber : number = 1
    pageSizeRange = [5,15,30]
    clients:any[] = []
    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    paginationArray: number = 10;


  constructor( public countryService: CountryService,private route :Router,private changeDetectorRef: ChangeDetectorRef) {
    this.onGetClients()
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
    debugger
    // console.log("event",event.split(": "[1]))
    this.onGetClients(this.pageNumber,event)
    console.log("paginationArray : ",this.paginationArray)
}

onPageChange(event){

    debugger
    this.onGetClients(event,this.pageSize)
    console.log("paginationArray : ",this.paginationArray)
}

  onGetClients(pageNumber = this.pageNumber,pageSize = this.pageSize){
    this.countryService.getclients(pageNumber,pageSize).subscribe(
        (res : any)=>{
            console.log(res)
            this.clients= res.Items
            this.countryService.page++
            this.countryService.page--
            console.clear
            console.log('data is ',this.clients)
            // this.paginationArray = Array(clientsLength /pageSize);
            this.paginationArray = res.TotalHits
            console.log(this.paginationArray)
        }
    )
}



}
