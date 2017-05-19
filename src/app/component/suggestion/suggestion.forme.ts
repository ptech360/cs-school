import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../providers/complaint.service';
import { ComplaintComponent } from '../complaint/complaint.component';
@Component({
  selector: 'for-me',
  templateUrl: './suggestion.list.html',
  styleUrls:['../complaint/complaint.component.css']
})

export class SuggestionForMe extends ComplaintComponent{

  constructor(public cs: ComplaintService,
    public router: Router,
    public route: ActivatedRoute) {
    super(cs,router,route);
    if(this.url == "/suggestion/for-me") this.url = "/suggestion";
  }  

}
