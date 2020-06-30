import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    @Input() pageSize = 4;

    users:any[]

    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public countryService: CountryService,
        private changeDetectorRef: ChangeDetectorRef,
        private route : Router
    ) {}

    ngOnInit() {
        this.countryService.pageSize = this.pageSize;
        this.countries$ = this.countryService.countries$;
        this.total$ = this.countryService.total$;
        this.onGetUser();


    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.countryService.sortColumn = column;
        this.countryService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }
    onGetUser(){
        this.countryService.getUser().subscribe(
            (res)=>{
                this.users= res
                this.countryService.page--
                this.countryService.page++
                console.log('data is ',res)
            }
        )
    }

    goToEditUserPage(user){

        this.countryService.FormUpdate.patchValue({
        id :user.userId,
        UserName: user.username,
        Email: user.email,
        lastName: user.lastName,
        FirstName: user.firstName,
        PhoneNumber: user.phoneNumber,
        Role : user.role
        });
        console.log("FormUpdate : ",this.countryService.FormUpdate.value)
        this.route.navigate(["/admin-panel/edit-user/"]);
    }

    deleteItem(UserName:string) {
       this.countryService.deleteUser(UserName).subscribe(data=>{
           console.log(data);
           this.onGetUser();
       });
    }



}



