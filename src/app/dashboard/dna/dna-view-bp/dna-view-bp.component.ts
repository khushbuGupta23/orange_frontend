import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dataConstant } from 'src/app/shared/constant/dataConstant';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { DnaService } from 'src/app/shared/services/dna/dna.service';
import { GeneralDropdownsService } from 'src/app/shared/services/general-dropdowns/general-dropdowns.service';
import { DnaForwardComponent } from '../dna-forward/dna-forward.component';

@Component({
  selector: 'app-dna-view-bp',
  templateUrl: './dna-view-bp.component.html',
  styleUrls: ['./dna-view-bp.component.scss']
})
export class DnaViewBpComponent implements OnInit {

  RoleID = dataConstant.RoleID;
  getUserrole: any = {};
  dnaStatus = dataConstant.DnaStatus;
  selectedStatus = this.dnaStatus.total;
  dnaList: any = [];
  dnaListToShow: any = [];
  priorityObj: any = [];
  countriesObj:any =[];
  bussinessUnitObj:any = [];
  regionsObj:any = [];

  learningList:any= [];
  learningListToShow:any= [];
  isDomainExpert = false;
  isBussinessConsultant = false;

  dna_count = {
    total: 0,
    draft: 0,
    closed: 0,
    close: 0,
    rejected: 0,
    forwarded:0,
    pending: 0,
    submitted: 0,
    transferred: 0,
    expired: 0,
    publish: 0,
    digital_learning:0
  }
  searchText: any;
  trackerId:number = 0;
  isDisabled = false;
  learningIds:any = [];
  titleList:any=[];
  isChecked=false;

  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }
  constructor(
    private authService:AuthenticationService,
    private commonService: CommonService,
    private generalDrpdownsService: GeneralDropdownsService,
    private dnaService:DnaService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getUserrole = this.authService.getRolefromlocal();
    this.isDomainExpert = this.getUserrole.id == this.RoleID.DomainExpert;
    this.isBussinessConsultant = this.getUserrole.id == this.RoleID.BussinessConsultant;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.trackerId = Id ? parseInt(Id) : 0;
      this.getLearningList();
    });
    this.getPriority();
    this. getCountries();
    this. getRegions();
    this.getBusinessUnits();
  }

  getBUFilterRecords(item:any){
    if (item) {
      this.learningListToShow = [...this.learningList].filter((a, b) => {
        return a.business_unit_id == item
      });
    }  
    else{
      this.learningListToShow = this.learningList;
    }
  }
 
  getPriorityFilterRecords(item:any){
    if (item) {
      this.learningListToShow = [...this.learningList].filter((a, b) => {
        return a.priority_id == item
      });
    }  
    else{
      this.learningListToShow = this.learningList;
    }
  }

  getRegionFilterRecords(item:any){
    if (item) {
      this.learningListToShow = [...this.learningList].filter((a, b) => {
        return a.region_id == item
      });
    }  
    else{
      this.learningListToShow = this.learningList;
    }
  }

  getCountryFilterRecords(item:any){
    if (item) {
      this.learningListToShow = [...this.learningList].filter((a, b) => {
        return a.country == item
      });
    }  
    else{
      this.learningListToShow = this.learningList;
    }
  }

  selectedItems(item:any){
    this.titleList = [];
    this.learningIds = [];
    item.isChecked = !item.isChecked;
    if(item.isChecked == true){
    this.learningIds.push(item.id);
    }
    else{
      this.learningIds.pop(item.id);
    }
    if(this.learningIds.length != 0){
     this.learningList.forEach((item: any) => {
      let title = this.learningIds.find((x: any) => x == item.id);
      if (title) {
        this.titleList.push(item.title);
      }
    });
   }
  }

  checkAllOptions() {
    let newList=[];
    this.learningIds=[];
    this.titleList = [];
    this.isChecked = !this.isChecked;
    this.learningList.forEach((val:any) => { val.isChecked = this.isChecked });
    if(this.isChecked == false){
      return;
    }
    newList = this.learningList.filter((y:any)=> y.status == this.dnaStatus.pending);
    newList.forEach((val:any)=>{
      this.learningIds.push(val.id);
    });
    this.learningList.forEach((item: any) => {
      let title = this.learningIds.find((x: any) => x == item.id);
      if (title) {
        this.titleList.push(item.title);
      }
    });
  }

  viewRequest(item:any){
    this.router.navigateByUrl(`/dashboard/dna/update/${this.trackerId}/${item.id}`);
  }

  openModal(status:any) {
    if(this.learningIds.length == 0){
      return;
    }
    const modalRef = this.modalService.open(DnaForwardComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'alert-popup',
    });
    modalRef.componentInstance.props = {
      title: status == 'close' ? 'Close Request' : 'Forward Request',
      data: this.learningIds,
      objectDetail: this.titleList,
      trackerId:this.trackerId,
      type: 'forward'
    };
  }

  getLearningList(){
    this.commonService.showLoading();
    this.dnaService.getDna().subscribe(
      (res: any) => {
        if(res.status == 1){
        this.commonService.hideLoading();
        this.learningList = res.data.digital_learning[this.trackerId];
        this.dna_count = res.data.all_count[this.trackerId];
        this.learningListToShow = res.data.digital_learning[this.trackerId];
        }
        else{
          this.commonService.hideLoading();
          this.commonService.toastErrorMsg('Error', res.message);
        }
      },(err:any)=>{
        this.commonService.hideLoading();
        this.commonService.toastErrorMsg('Error', err.message);
      });
  }

  getPriority(){
    this.commonService.showLoading();
    this.generalDrpdownsService.getPriority().subscribe(
      (res: any) => {
        this.commonService.hideLoading();
        this.priorityObj = res.data;
      },
      (err: any) => {
        this.commonService.hideLoading();
        this.commonService.toastErrorMsg('Error', err.message);
      }
    );
  }

  getCountries(){
    this.commonService.showLoading();
    this.generalDrpdownsService.getCountries().subscribe(
      (res: any) => {
        this.commonService.hideLoading();
        this.countriesObj= res.data;
      },
      (err: any) => {
        this.commonService.hideLoading();
        this.commonService.toastErrorMsg('Error', err.message);
      }
    );
  }

  getRegions(){
    this.commonService.showLoading();
    this.generalDrpdownsService.getRegions().subscribe(
      (res: any) => {
        this.commonService.hideLoading();
       this.regionsObj = res.data;
      },
      (err: any) => {
        this.commonService.hideLoading();
        this.commonService.toastErrorMsg('Error', err.message);
      }
    );
  }

  getBusinessUnits(){
    this.generalDrpdownsService.getBusinessUnits().subscribe( (res: any) => {
      this.commonService.hideLoading();
      this.bussinessUnitObj = res.data;
    },
    (err: any) => {
      this.commonService.hideLoading();
      this.commonService.toastErrorMsg('Error', err.message);
    }
  );
  }

  showRecords(type: string) {
    if (type === this.dnaStatus.total) {
      this.dnaListToShow = this.dnaList.map((x: any) => Object.assign({}, x));
    } else {
      this.dnaListToShow = this.dnaList.filter((x: any) => { if (x.status_show === type) { return x } }).map((x: any) => Object.assign({}, x));
    }
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

}
