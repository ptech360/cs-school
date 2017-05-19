import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../providers/complaint.service';
import { ComplaintComponent } from '../complaint/complaint.component';

@Component({
  selector: 'by-me',
  templateUrl: './suggestion.list.html',
  styles:['../complaint/complaint.component.css']
})

export class SuggestionByMe extends ComplaintComponent{

  constructor(public cs: ComplaintService,
    public router: Router,
    public route: ActivatedRoute) {
    super(cs,router,route);
  }  

}
