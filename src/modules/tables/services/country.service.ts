import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { COUNTRIES } from '@modules/tables/data/countries';
import { SortDirection } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';





interface SearchResult {
    countries: Country[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1: number | string, v2: number | string) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(countries: Country[], column: string, direction: string): Country[] {
    if (direction === '') {
        return countries;
    } else {
        return [...countries].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(country: Country, term: string, pipe: PipeTransform) {
    return (
        country.name.toLowerCase().includes(term.toLowerCase()) ||
        pipe.transform(country.area).includes(term) ||
        pipe.transform(country.population).includes(term)
    );
}

@Injectable({ providedIn: 'root' })
export class CountryService {

    FormUpdate : any

    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _countries$ = new BehaviorSubject<Country[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    constructor(private pipe: DecimalPipe, private _httpClient: HttpClient , public fb: FormBuilder ) {

        this.FormUpdate = this.fb.group({
            id :[''],
            UserName: ['', Validators.required],
            Email: ['', Validators.email],
            lastName: [''],
            FirstName: [''],
            PhoneNumber: ['']});

        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(120),
                switchMap(() => this._search()),
                delay(120),
                tap(() => this._loading$.next(false))
            )
            .subscribe(result => {
                this._countries$.next(result.countries);
                this._total$.next(result.total);
            });

        this._search$.next();
    }





    get countries$() {
        return this._countries$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    set page(page: number) {
        this._set({ page });
    }
    get pageSize() {
        return this._state.pageSize;
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    get searchTerm() {
        return this._state.searchTerm;
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let countries = sort(COUNTRIES, sortColumn, sortDirection);

        // 2. filter
        countries = countries.filter(country => matches(country, searchTerm, this.pipe));
        const total = countries.length;

        // 3. paginate
        countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ countries, total });
    }
















    url = 'http://localhost:54277/api/ApplicationUser/GetAdmins';
    token= localStorage.getItem('token')
    getUser(){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            })
          };
       return this._httpClient.get<any>(this.url, httpOptions).pipe()
    }

    getUserById(id){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            })
          };
       return this._httpClient.get<any>(`http://localhost:54277/api/ApplicationUser/getAdminById/${id}`, httpOptions).pipe()
    }



    deleteUser(username:string)
    {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            })
          };
        return this._httpClient.delete('http://localhost:54277/api/ApplicationUser/delete/'+ username, httpOptions).pipe()
    }


        EditUser()
        {
            debugger
            const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.token}`
                })
              };
            return this._httpClient.put("http://localhost:54277/api/ApplicationUser/Edit/"+this.FormUpdate.value.id,this.FormUpdate.value,httpOptions);
        }

}
