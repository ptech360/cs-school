import { Component, Directive, Input, ElementRef, EventEmitter, Output } from '@angular/core';

declare var google:any;
declare var googleLoaded:any;
declare let $;

@Directive({
  selector: '[GoogleChart]'
})

export class GoogleChart {

  public _element:any;
  public selectedData:any;

  @Input('chartType') public chartType;
  @Input('chartOptions') public chartOptions: Object;
  // @Input('chartData') public chartData: Object;

  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }

  ngOnInit() {
    google.charts.load('current', {'packages':['corechart', 'table']});
  }

  @Input() set chartData(data) {
      this.drawGraph(this.chartOptions, this.chartType, data,  this._element);
  }
  
  @Output() onSelected : EventEmitter<boolean> = new EventEmitter<boolean>();

  drawGraph (chartOptions,chartType,chartData,ele) {
    google.charts.setOnLoadCallback(drawChart);
    var that = this;
    function drawChart() {
      var wrapper;
      wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable:chartData ,
        options: chartOptions || {},
        containerId: ele.id
      });
      google.visualization.events.addListener(wrapper, 'ready', onReady);      
      wrapper.draw();
      function onReady() {
        google.visualization.events.addListener(wrapper.getChart(), 'click', selectHandler);
        google.visualization.events.addListener(wrapper.getChart(), 'onmouseover', onmouseover);
        google.visualization.events.addListener(wrapper.getChart(), 'onmouseout', onmouseout);
      }
      
      function selectHandler(e) {
        that.selectedData={};
        that.selectedData = {
          wrapper:wrapper,
          chartId:ele,
          e:e
        }
        that.onSelected.emit(that.selectedData);
      }
      function onmouseover(){
        $('#'+ele.id).css('cursor','pointer');
      }
      function onmouseout(){
        $('#'+ele.id).css('cursor','default');
      }
    }
  }
  reDrawGraph(){
    this.drawGraph(this.chartOptions, this.chartType, this.chartData,  this._element);
  }
}
