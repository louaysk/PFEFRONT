import { Component, OnInit, Input, QueryList, ViewChildren,ChangeDetectionStrategy ,ChangeDetectorRef} from '@angular/core';
import { CountryService } from '@modules/tables/services';
import { Router } from '@angular/router';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { Observable } from 'rxjs';




@Component({
  selector: 'sb-clients',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
    @Input() pageSize = 4;
    pageNumber : number = 1
    clients:any[] = []
    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;


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
    // console.log("event",event.split(": "[1]))
    this.onGetClients(this.pageNumber,event[0])
}

onPageChange(event){
    this.onGetClients(event,this.pageSize)
}

  onGetClients(pageNumber = this.pageNumber,pageSize = this.pageSize){
    this.countryService.getclients(pageNumber,pageSize).subscribe(
        (res : any)=>{
            this.clients= res.Items
            this.countryService.page--
            this.countryService.page++
            console.log('data is ',this.clients)
        }
    )
}



}
