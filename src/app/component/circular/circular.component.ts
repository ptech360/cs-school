import {Component, OnInit} from '@angular/core';
import { CircularService } from '../../providers/circular.service';
@Component({
  selector:'circular',
  templateUrl:'./circular.component.html',
  styleUrls:['./circular.component.css']
})
export class CircularComponent implements OnInit {

  title: string = 'Circular';
  public icon = "ios-paper-outline";
  public allCirculars;
  private currentPage = 1;
  public circulars;
  private EmptyCirculars: boolean = false;
  public loader:boolean = false;

  constructor(private circularService: CircularService) {
    
  }

  ngOnInit() {
    this.getCirculars();
  }

  private getCirculars() {
    this.loader = true;
    this.circularService.GetCirculars(this.currentPage).subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
    });
  }
  public noMore:boolean;
  private onSuccess(data) {
    this.loader = false;
    if (data.status === 204) {      
      this.EmptyCirculars = true;
    } else {
      this.circulars = data;
      if(this.circulars.length < 10) this.noMore = true;
      else this.noMore = false;
      this.EmptyCirculars = false;
    }
  }

  private onError(err) {

  }

  previousCircular(){
    delete this.circulars;
    this.currentPage -= 1;
    this.getCirculars();
  }

  nextCircular(){
    delete this.circulars;
    this.currentPage += 1;
    this.getCirculars();
  }

  // public onCircularSelected(circular) {
  //   this.circularService.GetparticularCircular(circular.id).subscribe((res) => {
      
  //   }, (err) => {

  //   })
  // }

  // public doRefresh(refresher) {
  //   setTimeout(() => {
  //     this.circularService.GetCirculars(1).subscribe((res) => {
  //       this.onSuccess(res);
  //       refresher.complete();
  //     }, (err) => {
  //       refresher.complete();
  //       this.onError(err);
  //     });
  //   }, 500);
  // }

  // public doInfinite(infiniteScroll) {
  //   this.currentPage += 1;
  //   setTimeout(() => {
  //     this.circularService.GetCirculars(this.currentPage).subscribe(response => {
  //       infiniteScroll.complete();
  //       if (response.status === 204) {
  //         this.currentPage -= 1;
  //         return;
  //       }
  //       this.circulars = this.circulars.concat(response);
  //     }, (err) => {
  //       this.currentPage -= 1;
  //       infiniteScroll.complete();
  //     });
  //   }, 1000);
  // }
}