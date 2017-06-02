import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeworkService } from '../../../providers/homework.service';
// import { CustomService } from '../../../providers/custom.service';
import { CommonService } from '../../../providers/common.service';

@Component({
  selector: 'homework-add',
  templateUrl: 'add.html',
})

export class HomeworkAddComponent implements OnInit {

  public title: string = "New Homework";
  public homework: FormGroup;
  standards = [];
  subjects = [];


  constructor(private homeworkService: HomeworkService,
              private commonService: CommonService) { }

  ngOnInit() {
    this.initForm();
    this.getStandards();
  }

  ionViewWillEnter() {
    
  }

  public initForm() {
    this.homework = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      standardId: new FormControl('', [Validators.required]),
      subjectId: new FormControl('', [Validators.required]),
      dueDate: new FormControl(this.commonService.getTomorrow(), [Validators.required])
    });
  }

  getSubjects(a) {
    // this.nl.showLoader();
    this.homeworkService.getSubjects(a).subscribe((data) => {
      // this.nl.hideLoader();
      this.subjects = data;
    }, (err) => {
      // this.nl.onError(err);
      // this.viewCtrl.dismiss();
    });
  }

  public getStandards() {
    this.standards = this.commonService.getData("standards");
    if (typeof(this.standards) === 'undefined') {
      this._getStandards();
    }
  }

  public _getStandards() {
    // this.nl.showLoader();
    this.homeworkService.getStandards().subscribe((res) => {
      // this.nl.hideLoader();
      this.standards = res;
      this.commonService.storeData("standards", res);
    }, (err) => {
      // this.viewCtrl.dismiss();
      // this.nl.onError(err);
    });
  }

  submitHomework(){
    console.log(this.homework.value);
    let formData = new FormData();
    formData.append('description',this.homework.value['description']);
    formData.append('standardId',this.homework.value['standardId']);
    formData.append('subjectId',this.homework.value['subjectId']);
    formData.append('dueDate',this.homework.value['dueDate']);
    this.saveHomework(formData);    
  }

  // public presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Are you sure you want to submit?',
  //     buttons: [{
  //       text: 'YES',
  //       role: 'submit',
  //       handler: () => {
  //         this.saveHomework();
  //       }
  //     }, {
  //       text: 'CANCEL',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   actionSheet.present();
  // }

  public saveHomework(formData) {
    // this.nl.showLoader();
    this.homeworkService.PostHomework(formData).subscribe((data) => {
      console.log(data);
      // this.nl.hideLoader();
      // this.viewCtrl.dismiss(data);
      // this.nl.showToast("Homework created successfully");
    },(err) => {
      // this.nl.onError(err);
      // this.viewCtrl.dismiss();
    });
  }

}
