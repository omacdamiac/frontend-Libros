import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts';
import { Book } from 'src/app/core/models/book.model';
import { BooksService } from 'src/app/core/services';
import { DataPresenterService } from '../../services/data-presenter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Output() sendTitle: EventEmitter<string> = new EventEmitter<string>();
  title: string;

  constructor(
    private bookServices: BooksService,
    private dataPresenterService: DataPresenterService
  ) {
    this.title = 'Módulo gráficos';
  }

  ngOnInit(): void {
    this.books();
    this.chartRegister();    
  }
  private books() {
    this.bookServices.getListBooks().subscribe({
      next: (res: Book[]) => {
        let total = res.length;
        let publicados = [];
        let noPublicados = total - publicados.length;
        res.filter((book) => {
          //// Obtener publicados
          if (book.publicado === true) {
            publicados.push(book);
          }
        });
        let autores = res.map((autor) => {
          /// Obtener Autores
          return autor.autor;
        });
        this.dataPie(publicados.length, total, noPublicados);
        this.countBooks(res);
        this.countAutores(autores);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Data de libros'),
    });
  }
  private dataPie(publicados: number, total: number, NPub: number) {
    let noPublicados = total - publicados;
    let bookPublicPorc = Math.round((publicados / total) * 100);
    let bookPNotublicPorc = Math.round((noPublicados / total) * 100);
    let nBookPublic = publicados;
    let nBookNotPublic = noPublicados;
    this.chartPublicado(
      bookPublicPorc,
      bookPNotublicPorc,
      nBookPublic,
      nBookNotPublic
    );
  }
  private countBooks(book) {
    let years = [];
    let repetidos = {};
    let arrayChart = [];
    let anios = [];
    for (let e of book) {
      years.push(e.anio);
    }
    const tempArray = [...years].sort();
    tempArray.forEach((year) => {
      repetidos[year] = (repetidos[year] || 0) + 1;
    });    
    for (let an in repetidos) {
      arrayChart.push(repetidos[an]);
    }
    for (let an in repetidos) {
      anios.push(an);
    }
    this.chartAnios(arrayChart, anios);
  }
  private countAutores(autor) {
    let autores = [];
    let repetidos = {};
    let arrayChart = [];

    let autorChart = [];
    for (let e of autor) {
      autores.push(e.genero);
    }
    const tempArray = [...autores].sort();
    tempArray.forEach((genero, index) => {
      repetidos[genero] = (repetidos[genero] || 0) + 1;
    });
    for (let an in repetidos) {
      autorChart.push({ value: repetidos[an], name: an });
    }
    this.chartAutores(autorChart);
  }
  private chartAnios(repetidos, anios) {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('chartAnios')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: anios,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: repetidos,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }
  private chartPublicado(porcPubli, porNotPublic, yesPublic, notPublic) {
    var chartDom = document.getElementById('chartPublicado')!;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        show: true,
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Libros',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: yesPublic, name: `Publicados ${porcPubli}%` },
            { value: notPublic, name: `No publicados ${porNotPublic}%` },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  }
  private chartAutores(generos) {
    var chartDom = document.getElementById('chartAutores')!;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        show: true,
        top: '0%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: generos,
        },
      ],
    };

    option && myChart.setOption(option);
  }
  private chartRegister() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('chartRegister')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    interface DataItem {
      name: string;
      value: [string, number];
    }

    let data: DataItem[] = [];
    let now = new Date(2022, 3, 30);
    let oneDay = 24 * 3600 * 1000; ///milisegundos x día
    let value = Math.random() * 1000;

    for (var i = 0; i < 20000; i++) {
      data.push(randomData());
    }

    function randomData(): DataItem {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0'),
          ].join('/'),
          Math.round(value),
        ],
      };
    }

    option = {
      title: {
        text: 'Data Aomunt',
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          params = params[0];
          var date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: true,
        },
        boundaryGap: ['10%', '10%'],
        nameGap: 20,
        axisLabel: {
          formatter: '{yyyy}-{MM}-{dd}\n{HH}:{mm}:{ss}',
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          showSymbol: false,
          data: data,
        },
      ],
    };

    setInterval(() => {
      for (var i = 0; i < 200; i++) {
        data.unshift();
        data.push(randomData());
      }
      myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            data: data,
          },
        ],
      });
    }, 1000);

    option && myChart.setOption(option);
  }
}
