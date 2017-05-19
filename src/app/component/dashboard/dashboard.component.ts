import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ChartService } from '../../providers/chart.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public complaintByStatus;
  public suggestionByStatus;
  public complaintByCategoryAndStatus;
  public categoryAndStatusChartOptions;
  public complaintByStatusChartOptions;
  public suggestionByStatusChartOptions;

  public responseByStatus;
  public responseByCategoryAndStatus;
  public responseSuggestionByStatus;
  constructor(public cs: ChartService, private router: Router, private zone: NgZone) {
    cs.getComplaintByCategoryAndStatus().subscribe((response) => {
      this.responseByCategoryAndStatus = response
      this.chartByCategoryAndStatus();
    });
    cs.getComplaintByStatus().subscribe((response) => {
      this.responseByStatus = response
      this.chartByStatus();
    });
    cs.getSuggestionByStatus().subscribe((res) => {
      this.responseSuggestionByStatus = res;
      this.chartBySuggestionStatus();
    }, (err) => {
      console.log(err);
    });
  }

  onSelected(data) {
    var dataTable = data.wrapper.getDataTable();
    var parts = data.e.targetID.split('#');
    switch (data.chartId.id) {
      case "complaint_chart_by_status":
        if (parts[0] == "slice") {
          this.zone.run(() => this.router.navigate(['/complaint/status/' + dataTable.getValue(parseInt(parts[1]), 2)]));
        }
        else if (parts[0] == "legendentry")
          console.log("legendentry : " + parts[1]);
        break;
      case "EWNS_suggestion":
        if (parts[0] == "slice") {
          this.zone.run(() => this.router.navigate(['/suggestion/status/' + dataTable.getValue(parseInt(parts[1]), 2)]));
        }
        else if (parts[0] == "legendentry")
          console.log("legendentry : " + parts[1]);
        break;
      case "chart_by_category_status":
        if (parts[0] == "vAxis") {
          var categoryId = dataTable.getValue(parseInt(parts[parts.indexOf('label') + 1]), 1);
          this.zone.run(() => this.router.navigate(['/complaint/category-status/category/' + categoryId]));
          console.log("categoryId :" + categoryId);
        }
        else if (parts[0] == "bar") {
          console.log(parts);
          var categoryId = dataTable.getValue(parseInt(parts[2]), 1);
          var statusId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          this.zone.run(() => this.router.navigate(['complaint/category-status/' + categoryId + '/' + statusId]));
          console.log("categoryId :" + categoryId + ",statusId :" + statusId);
        }
        else if (parts[0] == "legendentry") {
          for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
            for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
              dataTable.setCell(i, parseInt(this.responseByCategoryAndStatus[i].statusResults[j].statusId) * 2, this.responseByCategoryAndStatus[i].statusResults[j].count);
            }
          }
          if (parseInt(parts[1]) != 6)
            for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
              for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
                if (j != parseInt(parts[1]))
                  dataTable.setCell(i, parseInt(this.responseByCategoryAndStatus[i].statusResults[j].statusId) * 2, 0);
              }
            }
          data.wrapper.draw();
          console.log("legendentry : " + parts[1]);
        }
        break;
    }
  }

  onResize(event) {
    this.chartByStatus();
    this.chartByCategoryAndStatus();
  }

  chartByStatus() {
    var data = [];
    data.push(['Status', 'complaint', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseByStatus.length; i++) {
      data.push([this.responseByStatus[i].statusName, this.responseByStatus[i].count, this.responseByStatus[i].statusId]);
    }
    this.complaintByStatus = data;
    this.complaintByStatusChartOptions = {
      // title: "Complaints Report - Statuswise",
      legend: { position: 'bottom', textStyle: { fontName: 'sans-serif', fontSize: 12 }, maxLines: 4 },
      backgroundColor: 'transparent',
      titleTextStyle: {
        fontName: '-apple-system, "Helvetica Neue", "Roboto", sans-serif',
        fontSize: 14
      },
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#003300'],
      chartArea: { left: '10%', height: "40%", width: "40%", bottom: '10%', right: '10%', top: '0%' },
      is3D: true
    }
  }


  chartByCategoryAndStatus() {
    var data = [[]];
    data[0].push('categoryName');
    data[0].push({ type: 'number', role: 'scope' });
    for (let i = 0; i < this.responseByCategoryAndStatus[0].statusResults.length; i++) {
      data[0].push(this.responseByCategoryAndStatus[0].statusResults[i].statusName);
      data[0].push({ type: 'number', role: 'scope' });
    }
    data[0].push('All Status');

    for (let i = 0; i < this.responseByCategoryAndStatus.length; i++) {
      data[i + 1] = [];
      data[i + 1].push(this.responseByCategoryAndStatus[i].categoryName);
      data[i + 1].push(this.responseByCategoryAndStatus[i].categoryId);
      for (let j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
        data[i + 1].push(this.responseByCategoryAndStatus[i].statusResults[j].count);
        data[i + 1].push(this.responseByCategoryAndStatus[i].statusResults[j].statusId);
      }
      data[i + 1].push(0);
    }
    this.complaintByCategoryAndStatus = data;
    this.categoryAndStatusChartOptions = {
      // title: "Complaint Report - Categorywise",
      titleTextStyle: {
        fontName: 'sans-serif',
        fontSize: 14,
        bold: true,
      },
      isStacked: 'true', chartArea: {},
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#FF8C00']
    };
  }

  chartBySuggestionStatus() {
    var data = [];
    data.push(['Status', 'suggestion', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseSuggestionByStatus.length; i++) {
      data.push([this.responseSuggestionByStatus[i].statusName, this.responseSuggestionByStatus[i].count, this.responseSuggestionByStatus[i].statusId]);
    }
    this.suggestionByStatus = data;
    this.suggestionByStatusChartOptions = {
      // title: "Suggestions",
      legend: { position: 'bottom', textStyle: { fontName: 'sans-serif', fontSize: 12 }, maxLines: 4 },
      backgroundColor: 'transparent',
      titleTextStyle: {
        fontName: '-apple-system, "Helvetica Neue", "Roboto", sans-serif',
        fontSize: 14
      },
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#003300'],
      chartArea: { left: '10%', height: "40%", width: "40%", bottom: '10%', right: '10%', top: '5%' },
      pieHole: 0.4
    }
  }

}