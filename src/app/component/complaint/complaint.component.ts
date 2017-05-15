import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../providers/complaint.service';

declare let $;

@Component({
  selector: 'complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent {
  public complaints;
  private comments;
  private EmptyComments;
  private complaintStatus;
  private complaintCategory;
  private complaintsCOPY;
  private EmptyComplaints: boolean = false;
  private currentPage = 1;
  private complaint = {
    title: ""
  }
  private url: string = "";
  private status: string = "";
  constructor(public cs: ComplaintService,
    private router: Router,
    private route: ActivatedRoute, ) {
    this.url = this.router.url;
    this.route.params.subscribe(param => {
      if (param['statusId']) this.complaintStatus = param['statusId'];
      if (param['categoryId']) this.complaintCategory = param['categoryId'];
    });
    switch (this.complaintStatus) {
      case '1': this.status = "New"; break;
      case '2': this.status = "Assigned"; break;
      case '3': this.status = "InProgress"; break;
      case '4': this.status = "Closed"; break;
      case '5': this.status = "Reopen"; break;
      case '6': this.status = "Satisfied"; break;
      default: this.status = "All"; break;
    }
    this.fetchComplaints();
  }

  ngAfterViewInit() {
    $('.panel.panel-chat').hide();
    $(".panel.panel-chat > .panel-heading > .chatMinimize").click(function () {
      if ($(this).parent().parent().hasClass('mini')) {
        $(this).parent().parent().removeClass('mini').addClass('normal');

        $('.panel.panel-chat > .panel-body').animate({ height: "250px" }, 500).show();

        $('.panel.panel-chat > .panel-footer').animate({ height: "75px" }, 500).show();
      }
      else {
        $(this).parent().parent().removeClass('normal').addClass('mini');

        $('.panel.panel-chat > .panel-body').animate({ height: "0" }, 500);

        $('.panel.panel-chat > .panel-footer').animate({ height: "0" }, 500);

        setTimeout(function () {
          $('.panel.panel-chat > .panel-body').hide();
          $('.panel.panel-chat > .panel-footer').hide();
        }, 500);


      }

    });
    $(".panel.panel-chat > .panel-heading > .chatClose").click(function () {
      // $(this).parent().parent().remove();
      $(this).parent().parent().hide();
    });
  }

  fetchComplaints() {
    this.cs.getComplaint("complaint", this.currentPage).subscribe((res) => {
      if (res.status !== 204) {
        console.log(res);
        this.complaints = res;
        this.complaintsCOPY = res;
        this.EmptyComplaints = false;
      } else {
        this.EmptyComplaints = true;
      }
    }, (err) => {
      this.complaints = [];
    });
  }

  previousComplaint() {
    delete this.complaints;
    this.currentPage -= 1;
    this.fetchComplaints();
  }

  nextComplaint() {
    delete this.complaints;
    this.currentPage += 1;
    this.fetchComplaints();
  }

  loadComplaints() {
    this.complaints = this.complaintsCOPY;
  }

  searchComplaints(ev: any) {
    this.loadComplaints();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.complaints = this.complaintsCOPY.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  complaintIdOfCommentModel;
  complaintTitleOfCommentModel;
  currentUser = this.cs.getUserId();
  getComplaintCommentById(complaintId){
    this.complaintIdOfCommentModel = complaintId;
    this.complaints.forEach(element => {
      if(element['id'] == complaintId)
        this.complaintTitleOfCommentModel = element.title;
    });

    this.cs.getComplaintCommentById(complaintId).subscribe((res) => {
      if (res.status === 204) {
        this.EmptyComments = true;
      } else {
        this.EmptyComments = false;
        this.comments = res;
        console.log("comments",this.comments);
      }
    }, (err) => {
      this.comments = [];
      this.cs.showToast("Internal server error.. Try again later");
    });
  }

  comment;
  postComment(){
    if(this.comment)
    this.cs.postComplaintComment(this.complaintIdOfCommentModel,this.comment).subscribe((res) =>{
      console.log("submited",res);
      this.comment = "";
    }, (err) => {
      this.cs.showToast("Internal server error.. Try again later");
    });
  }

  clearComment(){
    delete this.comments;
  }  

  openModal(complaint) {
    console.log("asdfsd");
    this.complaint = complaint;
    $('#modal1').modal('show');
  }
}