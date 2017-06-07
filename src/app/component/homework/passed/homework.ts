import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../../../providers/homework.service';
// import { CustomService } from '../../../providers/custom.service';

@Component({
  selector: 'passed-homework',
  templateUrl: 'homework.html',
  styleUrls:['../homework.component.css'],
})

export class PassedHomework implements OnInit {

  public title: string = 'Homework';
  public icon: string = "book";
  public EmptyHomeworks = false;
  homeworks = [];
  currentPage = 1;
  monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  constructor(private homeworkService: HomeworkService,
              // private nl: CustomService
              ) {
  }

  ngOnInit() {
    this.getHomeworks();
  }

  public getHomeworks() {
    // this.nl.showLoader();
    this.homeworkService.getOldHomework(this.currentPage).subscribe((data) => {
      this.onSuccess(data);
    }, (err) => {
      // this.nl.hideLoader();
    });
  }

  public previousHomework() {
    delete this.homeworks;
    this.currentPage -= 1;
    this.getHomeworks();
  }

  public nextHomework() {
    delete this.homeworks;
    this.currentPage += 1;
    this.getHomeworks();
  }

  public doRefresh(refresher) {
    setTimeout(() => {
      this.homeworkService.getOldHomework(1).subscribe((res) => {
        this.onSuccess(res);
        refresher.complete();
      }, (err) => {
        refresher.complete();
        this.onError(err);
      });
    }, 500);
  }

  public onSuccess(res) {
    // this.nl.hideLoader();
    if (res.status === 204) {
      this.EmptyHomeworks = true;
    } else {
      this.EmptyHomeworks = false;
      this.homeworks = res;
      this.homeworks.forEach((data) => {
        data.dueMonth = this.monthNames[(new Date(data.dueDate)).getMonth()];
        data.dueDate = ("0" + (new Date(data.dueDate).getDate())).slice(-2);
      });
    }
  }

  public onError(err) {
    // this.nl.onError(err);
  }

  public doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.loadMoreData(infiniteScroll);
    }, 500);
  }

  public loadMoreData(infiniteScroll) {
    this.homeworkService.getOldHomework(this.currentPage).subscribe((res) => {
      infiniteScroll.complete();
      this.loadDataSuccess(res);
    }, (err) => {
      infiniteScroll.complete();
      this.loadDataError(err);
    });
  }

  public loadDataSuccess(res) {
    if (res.status === 204) {
      this.currentPage -= 1;
      return;
    }
    let newHomework = res;
    newHomework.forEach((data) => {
      data.dueMonth = this.monthNames[(new Date(data.dueDate)).getMonth()];
      data.dueDate = ("0" + (new Date(data.dueDate).getDate())).slice(-2);
    });
    this.homeworks = this.homeworks.concat(newHomework);
  }

  public loadDataError(err) {
    this.currentPage -= 1;
    // this.nl.onError(err);
  }

}
