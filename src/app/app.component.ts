import { Component, OnInit, Inject } from '@angular/core';
import { ChartService } from './services/chart.service';
import { Chart, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-chart';
  chart: any = [];
  result: any;
  coinPrice: any;
  coinName: any;

  constructor(@Inject(ChartService) private service: ChartService) {}

  ngOnInit() {
    this.service.cryptoData().subscribe((res) => {
      this.result = res;
      this.coinPrice = this.result.data.coins.map((coins: any) => coins.price);
      this.coinName = this.result.data.coins.map((coins: any) => coins.name);

      console.log(this.result);

      this.chart = new Chart('canvas', {
        type: 'bar',
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        },
        data: {
          labels: this.coinName,
          datasets: [
            {
              data: this.coinPrice,
              borderColor: 'yellow',
              label: 'Coin Price',
              backgroundColor: 'orange',
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }
}
