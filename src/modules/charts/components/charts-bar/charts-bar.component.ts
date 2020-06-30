import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { CountryService } from '@modules/tables/services';
import { DecimalPipe } from '@angular/common';
import { environment } from 'environments/environment';

@Component({
    selector: 'sb-charts-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-bar.component.html',
    styleUrls: ['charts-bar.component.scss'],
})
export class ChartsBarComponent implements OnInit, AfterViewInit {
    @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;

    constructor(private globalService : CountryService) {}
    ngOnInit() {
        let organizationId = localStorage.getItem('organizationId')
        if (organizationId) {

        }
        this.globalService.getbillingstatements(organizationId)
        .subscribe((res : any)=>{
            console.log(res.items)
            debugger
            let labels = res.Items.map(x=>new Date(x.StartDate).toISOString().split("T")[0])
            let datas = res.Items.map(x=>x.TotalSalesPrice.Value)



        this.chart = new Chart(this.myBarChart.nativeElement, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Value',
                        backgroundColor: 'rgba(2,117,216,1)',
                        borderColor: 'rgba(2,117,216,1)',
                        data: datas,
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'month',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 6,
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
                                display: true,
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
    ngAfterViewInit() {

}
}
