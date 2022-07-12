import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dataConstant } from 'src/app/shared/constant/dataConstant';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { DesignLearningService } from 'src/app/shared/services/design-learning/design-learning.service';
import { DesignLearningForwardComponent } from '../design-learning-forward/design-learning-forward.component';
import { DesignLearningRatingComponent } from '../design-learning-rating/design-learning-rating.component';

@Component({
  selector: 'app-design-learning-view',
  templateUrl: './design-learning-view.component.html',
  styleUrls: ['./design-learning-view.component.scss']
})
export class DesignLearningViewComponent implements OnInit {

  dateFormate = dataConstant.dateFormate;
  dateTimeFormate = dataConstant.dateTimeFormate;
  id = 0;
  RoleID = dataConstant.RoleID;
  designStatus = dataConstant.DesignStatus;
  requestdata: any = {};
  historyList:any=[];
  isDesigner = false;
  isHeadDesigner = false;
  isBusinessConsultant = false;
  getUserrole: any = {};
  getprofileDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private designService: DesignLearningService,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private router: Router
  ) { 
    this.getprofileDetails = this.authService.getProfileDetailsfromlocal();
    this.getUserrole = this.authService.getRolefromlocal();
    this.isDesigner = this.getUserrole.id === this.RoleID.DesignTeam;
    this.isHeadDesigner = this.getUserrole.id === this.RoleID.HeadOfDesign;
    this.isBusinessConsultant =  this.getUserrole.id === this.RoleID.BussinessConsultant;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.id = Id ? parseInt(Id) : 0;
      this.getLearningDetails();
      this.getLearningHistory();
    });
  }

  update(item:any){
    if (item && item.id) {
      this.router.navigateByUrl(`/dashboard/designlearning/update/${item.id}`);
    }
  }

  getLearningDetails() {
    this.commonService.showLoading();
    this.designService.detail(this.id).subscribe(
      (res: any) => {
        this.commonService.hideLoading();
        if (res.status === 1) {
          this.requestdata = res.data;
          if(this.requestdata.attachment){
            this.requestdata.attachUrl = `${dataConstant.ImageUrl}/${this.requestdata.attachment}`;
          }
        }
      },
      (err: any) => {
        this.commonService.errorHandling(err);
        this.commonService.hideLoading();
      });
  }

  getLearningHistory(){
    this.commonService.showLoading();
    this.designService.history(this.id).subscribe(
      (res: any) => {
        this.commonService.hideLoading();
        if (res.status === 1 ) {
          this.historyList = res.data;
        }
      },
      (err: any) => {
        this.commonService.errorHandling(err);
        this.commonService.hideLoading();
      });
  }

  openModal(status: any) {
    const modalRef = this.modalService.open(DesignLearningForwardComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'alert-popup',
    });
    modalRef.componentInstance.props = {
      data: this.id,
     // objectDetail: body,
      status: status
    };
  }

  openRatingModal(item: any) {
    const modalRef = this.modalService.open(DesignLearningRatingComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'alert-popup',
    });
    modalRef.componentInstance.props = {
      title: 'View History',
      data: item.id,
      objectDetail: item,
      type: 'viewhistory'
    };
  }
}
