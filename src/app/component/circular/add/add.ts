import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CircularService } from '../../../providers/circular.service';
import { CommonService } from '../../../providers/common.service';

declare let $;

@Component({
  selector:'add-circular',
  templateUrl:'./add.html'
})
export class AddCircular implements OnInit, AfterViewInit{

  public circular: FormGroup;
  public title: string = 'Add Circular';
  public newCircular;
  public standards = [];
  public circularType = [];
  public submitProgress:boolean = false;
  constructor(private circserv: CircularService,
              private commonService: CommonService) { }

  ngOnInit() {
    this.circular = this.initForm();
  }

  onDueDate(e){
    if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      alert("Invalid Date");
      this.circular.controls['date'].patchValue(this.commonService.getTomorrow());
    }
  }

  ngAfterViewInit() {
    this.getCircularInfo();
    this.getStandards();
  }

  public initForm() {
  return new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(this.commonService.getTomorrow(), [Validators.required]),
      circularTypeId: new FormControl('', []),
      standardIds: new FormControl([], [Validators.required])
    });
  }

  public getStandards() {
    this.standards = this.commonService.getData("standards");
    if (typeof(this.standards) === 'undefined') {
      this._getStandards();
    }
  }

  public _getStandards() {
    this.circserv.getStandards().subscribe((res) => {
      this.standards = res;
      this.commonService.storeData("standards", res);
    }, (err) => {

    });
  }

  public getCircularInfo() {
    let circularInfo = this.commonService.getData("circularInfo");
    if (typeof(circularInfo) == "undefined") {
      this._getCircularInfo();
    } else {
      this.buildCircularData(circularInfo);
    }
  }

  public _getCircularInfo() {
    this.commonService.getCircularInfo().subscribe((res) => {
      this.buildCircularData(res);
      this.commonService.storeData("circularInfo", res);
    }, (err) => {
    });
  }

  public buildCircularData(circular) {
    console.log("SASAS", circular);
    this.circularType = circular;
  }

  public onCircularType(event: any) {
    if (event == "1") {
      this.circular.removeControl("standardIds");
    } else if (event == "2") {
      this.circular.addControl("standardIds", new FormControl('', [Validators.required]));
    }
    // this.circular.controls['standardIds'].reset();
  }

  public circularSubmit(){
    console.log(this.circular.value);
    this.submitProgress = true;
    this.onSubmit();
  }

  public onSubmit() {
    this.circserv.PostCircular(this.circular.value).subscribe((res) => {
      this.submitProgress = false;
      this.circular = this.initForm();
      $('#circularModal').modal('show');
      console.log("Circular created successfully");
    }, (err) => {

    });
  }

}
