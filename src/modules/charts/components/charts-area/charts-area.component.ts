import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { environment } from 'environments/environment';
import { CountryService } from '@modules/tables/services';
import { subscribeOn } from 'rxjs/operators';



@Component({
    selector: 'sb-charts-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit {
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;
    baseUrl = environment.apiUrl;


    constructor(private pipe: DecimalPipe,private globalService : CountryService, private _httpClient: HttpClient) {}
    ngOnInit() {
        let token = localStorage.getItem('token')
        let organizationId = localStorage.getItem('organizationId')
        if (organizationId) {

        }
        this.globalService.getbillingstatements(organizationId)
        .subscribe((res : any)=>{
            console.log(res.items)
            debugger
            let labels = res.Items.map(x=>new Date(x.StartDate).toISOString().split("T")[0])
            let datas = res.Items.map(x=>x.TotalSalesPrice.Value)
            this.chart = new Chart(this.myAreaChart.nativeElement, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Value',
                            lineTension: 0.3,
                            backgroundColor: 'rgba(2,117,216,0.2)',
                            borderColor: 'rgba(2,117,216,1)',
                            pointRadius: 5,
                            pointBackgroundColor: 'rgba(2,117,216,1)',
                            pointBorderColor: 'rgba(255,255,255,0.8)',
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                            pointHitRadius: 50,
                            pointBorderWidth: 2,
                            data: datas
                        },
                    ],
                },
                options: {
                    scales: {
                        xAxes: [
                            {
                                time: {
                                    unit: 'day',
                                },
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    maxTicksLimit: 7,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    min: 0,
                                    max: 40000,
                                    maxTicksLimit: 5,
                                },
                                gridLines: {
                                    color: 'rgba(0, 0, 0, .125)',
                                },
                            },
                        ],
                    },
                    legend: {
                        display: false,
                    },
                },
            });
        })
    }


    /**
     * Call for the API to retrieve Data
     */

     /***
      * Traitement for extracting only data + money
      */
    ngAfterViewInit() {

    }
}
