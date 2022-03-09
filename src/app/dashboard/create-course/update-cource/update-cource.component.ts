import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CourcesService } from 'src/app/shared/services/cources/cources.service';

@Component({
  selector: 'app-update-cource',
  templateUrl: './update-cource.component.html',
  styleUrls: ['./update-cource.component.scss'],
})
export class UpdateCourceComponent implements OnInit {
  routergetdata: any;
  public createCourceForm!: FormGroup;
  public commonCreateCourceForm!: FormGroup;
  public iltandViltForm!: FormGroup;
  public materialbasedForm!: FormGroup;
  public currriculumForm!: FormGroup;
  public showCertificateExpiry: boolean = false;
  public externalVendorname: boolean = false;
  showVendor: boolean = false;
  public learnerGuidearray: any = [];
  public learningType: any = '1';

  public cctLevel: any;
  coursesList: any;
  courseLength: any;
  notifications:boolean =false;

  public cctExpiryperiod: any = [
    {
      id: 1,
      name: '3 months',
      status: 1,
    },
    {
      id: 2,
      name: '6 months',
      status: 1,
    },
    {
      id: 3,
      name: '12 months',
      status: 1,
    },
  ];
  public yesNo: any = [
    { id: 'yes', name: 'Yes' },
    { id: 'no', name: 'No' },
  ];

  public cctExpiryType: any;

  public validityPeriod: any;

  public vendorType: any;
  public cctSubjects: any;
  public entityList: any;

  public deliveryMethod: any;
  public whocanSee: any;
  public preferedInstructor: any;

  public availableLanguages: any;
  public learningTypes: any;

  getUserrole: any; //to get user role
  public cordinatorsList: any = [];
  draftRequests: any = [];
  pendingRequests: any = [];
  rejectedRequests: any = [];
  closedRequests: any = [];
  publisherList:any=[];
  stringArray: any = [];
  selectedPublisherId:any;
  profileDetails:any;
  constructor(
    private fb: FormBuilder,
    private courceService: CourcesService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.routergetdata = this.router.getCurrentNavigation()?.extras.state;
    if (!this.routergetdata) {
      this.router.navigateByUrl('/dashboard/cources');
    }
    console.log(this.routergetdata)
  }

  getRole() {
    this.getUserrole = this.authService.getRolefromlocal();
    //this.getUserrole = JSON.parse(this.authService.getRolefromlocal());
  }

  getCordinators() {
    this.courceService.getregionalCordinator().subscribe(
      (res: any) => {
        console.log(res);
        this.cordinatorsList = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getvendorType() {
    this.courceService.getVendortype().subscribe(
      (res: any) => {
        this.vendorType = res.data;
        console.log(this.vendorType);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getLevel() {
    this.courceService.getcctLevel().subscribe(
      (res: any) => {
        this.cctLevel = res.data;
        console.log(this.cctLevel);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getSubjects() {
    this.courceService.getSubjects().subscribe(
      (res: any) => {
        this.cctSubjects = res.data;
        console.log(this.cctSubjects);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getValidityPeriod() {
    this.courceService.getValidityperiod().subscribe(
      (res: any) => {
        this.validityPeriod = res.data;
        console.log(this.validityPeriod);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getEntitylist() {
    this.courceService.getEntitylist().subscribe(
      (res: any) => {
        console.log(res);
        this.entityList = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getDeliveryMethod() {
    this.courceService.getDeliveryMethod().subscribe(
      (res: any) => {
        console.log(res);
        this.deliveryMethod = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getWhocansee() {
    this.courceService.whoSeeCourse().subscribe(
      (res: any) => {
        console.log(res);
        this.whocanSee = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //prefered instructor
  getPreferedInstructor() {
    this.courceService.getpreferedInstructor().subscribe(
      (res: any) => {
        console.log(res);
        this.preferedInstructor = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //get Languages
  getLanguages() {
    this.courceService.getLanguages().subscribe(
      (res: any) => {
        console.log(res);
        this.availableLanguages = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //getLearning type
  getLearningType() {
    this.courceService.getLearningType().subscribe(
      (res: any) => {
        console.log(res);
        this.learningTypes = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //get Expirytype
  getExpiryType() {
    this.courceService.getExpiryType().subscribe(
      (res: any) => {
        console.log(res);
        this.cctExpiryType = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getPublisher(){
    this.authService.getUserRoles().subscribe((res:any)=>{
      console.log(res);
      this.publisherList = res.data['4'];
      console.log(this.publisherList)
    },(err:any)=>{
      console.log(err)
    })
  }

  getprofileDetails(){
  this.profileDetails = this.authService.getProfileDetailsfromlocal();
  }

  getTotalCourse() {
    this.courceService.getCources().subscribe(
      (res: any) => {
        this.coursesList = res.data;
        this.courseLength = this.coursesList.length;
        this.coursesList.map((course: any) => {
          if (course.status === 'pending') {
            this.pendingRequests.push(course);
          }
          if (course.status === 'reject') {
            this.rejectedRequests.push(course);
          }
          if (course.status === 'draft') {
            this.draftRequests.push(course);
          }
          if (course.status === 'close') {
            this.closedRequests.push(course);
          }
        });
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getpublisher(){
    this.getPublisher();
  }

  ngOnInit(): void {
    const emailregexp = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    this.getCordinators();
    this.getvendorType();
    this.getLevel();
    this.getSubjects();
    this.getValidityPeriod();
    this.getTotalCourse();
    this.getEntitylist();
    this.getDeliveryMethod();
    this.getWhocansee();
    this.getPreferedInstructor();
    this.getLanguages();
    this.getLearningType();
    this.getExpiryType();
    this.getprofileDetails();
    console.log(this.profileDetails)
    console.log(this.routergetdata);
    this.getRole();

    //common form
    this.commonCreateCourceForm = this.fb.group({
      title1: new FormArray([]),
      //title: new FormArray([]),
      title: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      learning_type: new FormControl('1', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      resource: new FormControl(''),
      objective: new FormControl('', [Validators.required]),
      level: new FormControl([Validators.required]),
      subject: new FormControl([Validators.required]),
      // additional_comment: new FormControl(''),
      prerequisite: new FormControl(''),
      keyword: new FormControl('', [Validators.required]),
      email_content_owner: new FormControl('', [
        Validators.required,
        Validators.pattern(emailregexp),
      ]),
      training_provided_by: new FormControl([Validators.required]),
      available_language: new FormControl([Validators.required]),

      //no field
      email_training_contact: new FormControl('', [
        Validators.required,
        Validators.pattern(emailregexp),
      ]),
    });

    //ilt and vilt
    this.iltandViltForm = this.fb.group({
      manager_approval: new FormControl([Validators.required]),
      digital: new FormControl( [Validators.required]),
      certification: new FormControl( [Validators.required]),
      certification_expiry_type: new FormControl(''),
      validity_period: new FormControl(''),
      external_vendor_name: new FormControl(''),
      purchase_order: new FormControl(),
      // email_training_contact: new FormControl('', [Validators.required]),
      delivery_method: new FormControl([Validators.required]),
      for_whoom: new FormControl('', [Validators.required]),
      cost_of_training: new FormControl(''),
      // cost_of_training: new FormControl('', [Validators.required]),
      learn_more: new FormControl(''),
      free_field_content: new FormControl(''),
      url: new FormControl(''),
      //s need to add
      //provide_video_link: new FormControl(''),
      video_link: new FormControl(''),
      //e need to add
      first_session_date: new FormControl('', [Validators.required]),
      expiry_date: new FormControl('', [Validators.required]),
      title_additional: new FormControl(''),
      external_vendor: new FormControl( [Validators.required]),

      entity_business_area: new FormControl([Validators.required]),
      email_preffered_instructor: new FormControl([Validators.required]),

      who_see_course: new FormControl(),
      additional_comment: new FormControl(''),

      // learner_guideline: new FormControl(''),
      guidelines: this.fb.array([]),
      //ilt and vilt

      regional_cordinator:
        this.getUserrole.id === 2
          ? new FormControl('', [Validators.required])
          : new FormControl(),
    });

    this.materialbasedForm = this.fb.group({
      //material based
      material_source: new FormControl(''),
      material_expiry_date: new FormControl(''),
      material_url: new FormControl(''),
      //material
    });

    this.commonCreateCourceForm.patchValue(this.routergetdata);
    console.log('patch',this.routergetdata)
    this.commonCreateCourceForm.controls['learning_type'].disable({onlySelf: true});
    this.iltandViltForm.patchValue(this.routergetdata);
    if (this.routergetdata.external_vendor == 'yes') {
      this.externalVendorname = true;
    } else {
      this.externalVendorname = false;
    }
    if (this.routergetdata.certification == 'yes') {
      this.showCertificateExpiry = true;
    }
    this.commonCreateCourceForm.patchValue({
      subject: parseInt(this.routergetdata.subject),
    });
    //console.log(this.routergetdata.subject);

    this.addLearnerGuideline();
  }

  get f() {
    return this.iltandViltForm.controls;
  }

  get t() {
    return this.f.guidelines as FormArray;
  }

  addMorelearnerGuideline() {
    return this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  addLearnerGuideline() {
    console.log(this.t);
    return this.t.push(this.addMorelearnerGuideline());
  }

  removeLearnerGuideline(i: any) {
    this.t.removeAt(i);
    // this.learnerGuidearray.splice(i,1)
  }

  selectLearning() {
    // this.createCourceForm.setValue({
    //   name:new FormControl('Test')
    // })
  }

  getFormValidationErrors() {
    Object.keys(this.commonCreateCourceForm.controls).forEach((key) => {
      const controlErrors: any = this.commonCreateCourceForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }

  //create ilt vilt form
  createNewCourceIlt(status:any) {
    let courseid = { course_id: this.routergetdata.id };
    let savetype = { status: status };
    let totalObj = {
      ...this.iltandViltForm.value,
      ...savetype,
      ...this.commonCreateCourceForm.value,
      ...courseid,
      ...{learning_type:this.routergetdata.learning_type}
    };
    if (this.iltandViltForm.valid && this.commonCreateCourceForm.valid) {
      this.courceService.updateCourse(totalObj).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.router.navigate(['/dashboard/cources']);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
      console.log(totalObj);
    } else {
      this.commonCreateCourceForm.markAllAsTouched();
      this.iltandViltForm.markAllAsTouched();
      this.getFormValidationErrors();
    }
  }

  //draft ilt and vilt
  saveasDraftIlt() {
    let savetype = { status: 'draft' };
    let courseid = { course_id: this.routergetdata.id };
    let totalObj = {
      ...this.iltandViltForm.value,
      ...savetype,
      ...courseid,
      ...this.commonCreateCourceForm.value,
      ...{learning_type:this.routergetdata.learning_type}
    };
    if (this.iltandViltForm.valid && this.commonCreateCourceForm.valid) {
      console.log(totalObj);
      this.courceService.createCource(totalObj).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.router.navigate(['/dashboard/cources']);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      this.commonCreateCourceForm.markAllAsTouched();
      this.iltandViltForm.markAllAsTouched();
      console.log(totalObj);
    }
  }

  transfertoPublishData(){
    let courseid = { course_id: this.routergetdata.id };
    let savetype = { status: 'pending' };
    //let publisher = {trasfer_user_id:this.selectedPublisherId}
    let totalObj = {
      ...this.iltandViltForm.value,
      ...savetype,
      ...this.commonCreateCourceForm.value,
      ...courseid,
      ...{learning_type:this.routergetdata.learning_type},

    };
    if (this.iltandViltForm.valid && this.commonCreateCourceForm.valid) {
      this.courceService.updateCourse(totalObj).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            debugger
           // this.router.navigate(['/dashboard/cources']);
            let transferobj ={ course_id:this.routergetdata.id ,transfer_id:this.selectedPublisherId};
            this.courceService.courseTransfer(transferobj).subscribe((res:any)=>{
              console.log(res);
              this.router.navigate(['/dashboard/cources']);
            },(err:any)=>{
              console.log(err)
            })
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
      console.log(totalObj);
    } else {
      this.commonCreateCourceForm.markAllAsTouched();
      this.iltandViltForm.markAllAsTouched();
      this.getFormValidationErrors();
    }
  }

  publishCourse(status:any){
    let courseid = { course_id: this.routergetdata.id };
    let savetype = this.routergetdata.copy ? {status:'publish'} : {};
    let transferobj = {transfer_user_id:this.profileDetails.data.id}
    let totalObj = {
      ...this.iltandViltForm.value,
      ...savetype,
      ...this.commonCreateCourceForm.value,
      ...courseid,
      // ...transferobj,
      ...{learning_type:this.routergetdata.learning_type}
    };
    console.log(totalObj)
    if (this.iltandViltForm.valid && this.commonCreateCourceForm.valid) {
      this.courceService.updateCourse(totalObj).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.router.navigate(['/dashboard/cources']);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
      console.log(totalObj);
    } else {
      this.commonCreateCourceForm.markAllAsTouched();
      this.iltandViltForm.markAllAsTouched();
      this.getFormValidationErrors();
    }
  }

  createNewCource() {
    let learnerguidearr = this.createCourceForm.value.learnerguidearray;
    let localarr: any = [];
    learnerguidearr.map((arrayres: any) => {
      if (arrayres.name) {
        localarr.push(arrayres.name);
      } else {
        localarr.push(arrayres);
      }
    });
    this.learnerGuidearray = localarr;
    this.createCourceForm.value.learnerguidearray = this.learnerGuidearray;
    console.log(this.learnerGuidearray);
    let savetype = { action: 'submit' };
    let totalObj = { ...this.createCourceForm.value, ...savetype };
    if (this.createCourceForm.valid) {
      this.courceService.createCource(totalObj).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.router.navigate(['/dashboard/cources']);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      this.createCourceForm.markAllAsTouched();
      console.log(this.learnerGuidearray);
      console.log(totalObj);
    }
  }
  saveasDraft() {
    let learnerguidearr = this.createCourceForm.value.learnerguidearray;
    let localarr: any = [];
    learnerguidearr.map((arrayres: any) => {
      if (arrayres.name) {
        localarr.push(arrayres.name);
      } else {
        localarr.push(arrayres);
      }
    });
    this.learnerGuidearray = localarr;
    this.createCourceForm.value.learnerguidearray = this.learnerGuidearray;
    let savetype = { action: 'draft' };
    let totalObj = { ...this.createCourceForm.value, ...savetype };
    console.log(this.learnerGuidearray);
    if (this.createCourceForm.valid) {
      console.log(totalObj);
      console.log(this.createCourceForm.value);
      this.courceService.createCource(this.createCourceForm.value).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.router.navigate(['/dashboard/cources']);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      this.createCourceForm.markAllAsTouched();
      console.log(this.learnerGuidearray);
      console.log(totalObj);
    }
  }

  certificationType(event: any) {
    if (event.target.value == 'yes') {
      this.showCertificateExpiry = true;
      console.log(this.createCourceForm.value);
      this.iltandViltForm
        .get('certification_expiry_type')
        ?.setValidators(Validators.required);
      this.iltandViltForm
        .get('validity_period')
        ?.setValidators(Validators.required);
    } else {
      this.showCertificateExpiry = false;
      this.iltandViltForm.get('certification_expiry_type')?.clearValidators();
      this.iltandViltForm.get('validity_period')?.clearValidators();
    }
  }

  externalVendor(event: any) {
    if (event.target.value == 'yes') {
      this.externalVendorname = true;
      this.showVendor = true;
      this.iltandViltForm
        .get('external_vendor_name')
        ?.setValidators(Validators.required);
    } else {
      this.externalVendorname = false;
      this.showVendor = false;
      this.iltandViltForm.get('external_vendor_name')?.clearValidators();
    }
  }

  getlearningType(event: any) {
    console.log(event.target.value);
    this.learningType = event.target.value;
  }

  getPublisherselected(event:any){
    console.log(event.target.value);
    this.selectedPublisherId = event.target.value;
  }
}
