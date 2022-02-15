import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourcesService } from 'src/app/shared/services/cources/cources.service';

@Component({
  selector: 'app-create-new-course',
  templateUrl: './create-new-course.component.html',
  styleUrls: ['./create-new-course.component.scss'],
})
export class CreateNewCourseComponent implements OnInit {
  public createCourceForm!: FormGroup;
  showCollapse:boolean = true;

  public cctLevel = [
    {
      id: 1,
      name: 'Beginner',
      status: 1,
    },
    {
      id: 2,
      name: 'Advanced',
      status: 1,
    },
    {
      id: 3,
      name: 'Expert',
      status: 1,
    },
    {
      id: 4,
      name: 'All Users',
      status: 1,
    },
  ];

  public cctExpiryperiod = [
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

  public cctExpiryType = [
    {
      id: 1,
      name: 'None',
      status: 1,
    },
    {
      id: 2,
      name: 'Internal certification-with expire date',
      status: 1,
    },
    {
      id: 3,
      name: 'Internal certification-with no expire date',
      status: 1,
    },
    {
      id: 4,
      name: 'External certification-with expire date',
      status: 1,
    },
    {
      id: 5,
      name: 'External certification-with no expire date',
      status: 1,
    },
  ];

  public validityPeriod = [
    {
      id: 1,
      name: 'Not Applicable',
      status: 1,
    },
    {
      id: 2,
      name: '6 months',
      status: 1,
    },
    {
      id: 3,
      name: '1 year',
      status: 1,
    },
    {
      id: 4,
      name: '2 years',
      status: 1,
    },
    {
      id: 5,
      name: '3 year',
      status: 1,
    },
    {
      id: 6,
      name: '5 year',
      status: 1,
    },
  ];

  public vendorType = [
    {
      id: 1,
      vendor_name: 'Orange Business Services',
      name: 'Orange Business Services',
      status: 1,
      flag: 1,
    },
    {
      id: 2,
      vendor_name: 'IB Sales Academy',
      name: 'IB Sales Academy',
      status: 1,
      flag: 1,
    },
  ];

  public cctSubjects = [
    {
      id: 1,
      name: 'Content and Multimedia - Content',
      status: 1,
    },
    {
      id: 2,
      name: 'Content and Multimedia - Multimedia',
      status: 1,
    },
    {
      id: 3,
      name: 'Customers and Marketing - Consulting',
      status: 1,
    },
    {
      id: 4,
      name: 'Customers and Marketing - Customer service & sales BtoB',
      status: 1,
    },
    {
      id: 5,
      name: 'Customers and Marketing - Sales and Customer Relations B2C',
      status: 1,
    },
    {
      id: 6,
      name: 'Customers and Marketing - Customer Service and Wholesale Sale',
      status: 1,
    },
    {
      id: 7,
      name: 'Customers and Marketing - Marketing',
      status: 1,
    },
    {
      id: 8,
      name: 'Customers and Marketing - Presales B2B',
      status: 1,
    },
    {
      id: 9,
      name: 'Digital Learning Group - New way of working at Orange',
      status: 0,
    },
    {
      id: 10,
      name: 'Digital Learning Group - Orange corporate culture',
      status: 0,
    },
    {
      id: 11,
      name: 'Innovation - Internet of things',
      status: 1,
    },
    {
      id: 12,
      name: 'Innovation - Patents and Promoting Innovation',
      status: 1,
    },
    {
      id: 13,
      name: 'Innovation - Design and User Experience',
      status: 1,
    },
    {
      id: 14,
      name: 'Management - Other trainings on management',
      status: 0,
    },
    {
      id: 15,
      name: 'Management - Country/Entity - Specific training',
      status: 1,
    },
    {
      id: 16,
      name: 'Management - Individual Development',
      status: 1,
    },
    {
      id: 17,
      name: 'Management - Team Development',
      status: 1,
    },
    {
      id: 18,
      name: 'Network IT and Cybersecurity - 5G',
      status: 1,
    },
    {
      id: 19,
      name: 'Network IT and Cybersecurity - Cloud and Network Virtualization',
      status: 1,
    },
    {
      id: 20,
      name: 'Network IT and Cybersecurity - Customer and Network Interventions',
      status: 1,
    },
    {
      id: 21,
      name: 'Network IT and Cybersecurity - Cybersecurity',
      status: 1,
    },
    {
      id: 22,
      name: 'Network IT and Cybersecurity - Data and AI',
      status: 1,
    },
    {
      id: 23,
      name: 'Network IT and Cybersecurity - Design',
      status: 1,
    },
    {
      id: 24,
      name: 'Network  IT and Cybersecurity - Health and Safety for Technical jobs',
      status: 1,
    },
    {
      id: 25,
      name: 'Network IT and Cybersecurity - Equipments and Services Integration',
      status: 1,
    },
    {
      id: 26,
      name: 'Network IT and Cybersecurity - Network Engineering',
      status: 1,
    },
    {
      id: 27,
      name: 'Network IT and Cybersecurity - IT Services',
      status: 1,
    },
    {
      id: 28,
      name: 'Network IT and Cybersecurity - Network Deployment',
      status: 1,
    },
    {
      id: 29,
      name: 'Network IT and Cybersecurity - Operations Network Supervision and Maintenance',
      status: 1,
    },
    {
      id: 30,
      name: 'Network IT and Cybersecurity - Software Development',
      status: 1,
    },
    {
      id: 31,
      name: 'Network IT and Cybersecurity - Software Packages',
      status: 1,
    },
    {
      id: 32,
      name: 'Network IT and Cybersecurity - Support and IT technical assistance',
      status: 1,
    },
    {
      id: 33,
      name: 'Support - Finance  Controlling and Accounting',
      status: 1,
    },
    {
      id: 34,
      name: 'Support - Assistants',
      status: 0,
    },
    {
      id: 35,
      name: 'Support - Communication',
      status: 1,
    },
    {
      id: 36,
      name: 'Support - Controlling',
      status: 0,
    },
    {
      id: 37,
      name: 'Support - Finance',
      status: 0,
    },
    {
      id: 38,
      name: 'Support - Human Resources',
      status: 1,
    },
    {
      id: 39,
      name: 'Support - Legal and Regulatory',
      status: 1,
    },
    {
      id: 40,
      name: 'Support - Real Estate  Logistics and Facility Management',
      status: 1,
    },
    {
      id: 41,
      name: 'Support â€“ Purchase',
      status: 1,
    },
    {
      id: 42,
      name: 'Support - Real Estate',
      status: 0,
    },
    {
      id: 43,
      name: 'Support - Regulation lobbying',
      status: 0,
    },
    {
      id: 44,
      name: 'Support - Risk management',
      status: 1,
    },
    {
      id: 45,
      name: 'Support - Supply chain',
      status: 1,
    },
    {
      id: 46,
      name: 'Transversal skills - Group Culture',
      status: 1,
    },
    {
      id: 47,
      name: 'Transversal skills - Career Development',
      status: 1,
    },
    {
      id: 48,
      name: 'Transversal skills - Diversity handicap awareness',
      status: 0,
    },
    {
      id: 49,
      name: 'Transversal skills - Intergenerational & knowledge transfer',
      status: 0,
    },
    {
      id: 50,
      name: 'Transversal skills - Languages',
      status: 1,
    },
    {
      id: 51,
      name: 'Transversal skills - New hire welcome Group culture intercultural',
      status: 0,
    },
    {
      id: 52,
      name: 'Transversal skills - Digital Culture and Collaborative tools',
      status: 1,
    },
    {
      id: 53,
      name: '"Transversal skills - Agility and Project Management',
      status: 1,
    },
    {
      id: 54,
      name: 'Transversal skills - Personal and Professional Development',
      status: 1,
    },
    {
      id: 55,
      name: 'Transversal skills - Corporate Social Responsibility and Diversity',
      status: 1,
    },
    {
      id: 56,
      name: 'Transversal skills - Quality Processes and Audits',
      status: 1,
    },
    {
      id: 57,
      name: 'Transversal skills - Quality of Work Life',
      status: 1,
    },
    {
      id: 58,
      name: 'Transversal skills - Transmission of Knowledge',
      status: 1,
    },
    {
      id: 59,
      name: 'Transversal skills - Ethics and Compliance',
      status: 1,
    },
    {
      id: 60,
      name: 'Credit Risk Analysis',
      status: 0,
    },
    {
      id: 61,
      name: 'Management - Orange Campus - Collective issues',
      status: 0,
    },
    {
      id: 62,
      name: 'Management - Orange Campus - Individual development',
      status: 0,
    },
    {
      id: 63,
      name: 'Transversal skills - Professional efficiency and personal development',
      status: 0,
    },
  ];

  public deliveryMethod = [
    {
      id: 1,
      name: 'Face-to-face',
      status: 1,
    },
    {
      id: 2,
      name: 'CoopNet virtual classroom',
      status: 1,
    },
    {
      id: 3,
      name: 'Virtual classroom (other than CoopNet)',
      status: 1,
    },
  ];

  public availableLanguages = [
    { id: 1, name: 'Arabic' },
    { id: 2, name: 'Dutch (The Netherlands)' },
    { id: 3, name: 'English (US)' },
    { id: 4, name: 'French (France)' },
    { id: 5, name: 'Polish (Poland)' },
    { id: 6, name: 'Romanian (Romania)' },
    { id: 7, name: 'Russian (Russia)' },
    { id: 8, name: 'Slovak (Slovakia)' },
    { id: 9, name: 'Spanish(Spain)' },
  ];

  constructor(private fb: FormBuilder, private courceService: CourcesService,private router:Router) {}
  public showCertificateExpiry: boolean = false;
  public externalVendorname:boolean = false;

  ngOnInit(): void {
    this.createCourceForm = this.fb.group({
      title: new FormControl('',[Validators.required]),
      duration: new FormControl('',[Validators.required]),
      learning_type: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      objective: new FormControl('',[Validators.required]),
      resource: new FormControl(''),
      manager_approval: new FormControl('',[Validators.required]),
      level: new FormControl('',[Validators.required]),
      digital: new FormControl('',[Validators.required]),
      certification: new FormControl('',[Validators.required]),
      certification_expiry_type: this.showCertificateExpiry ?  new FormControl(''): new FormControl('', [Validators.required]),
      validity_period: this.showCertificateExpiry ? new FormControl(''): new FormControl('', [Validators.required]),
      purchase_order: new FormControl(''),
      subject: new FormControl('',[Validators.required]),
      external_vendor: new FormControl('',[Validators.required]),
      email_training_contact: new FormControl('',[Validators.required]),
      delivery_method: new FormControl('',[Validators.required]),
      keyword: new FormControl('',[Validators.required]),
      cost_of_training: new FormControl('',[Validators.required]),
      learn_more: new FormControl(''),
      url: new FormControl(''),
      additional_comment: new FormControl(''),
      for_whoom:new FormControl('',[Validators.required]),
      prerequisite:new FormControl(''),
      free_field_content:new FormControl(''),
      first_session_date:new FormControl('',[Validators.required]),
      expiry_date:new FormControl('',[Validators.required]),
      learner_guideline:new FormControl(''),
      title_additional:new FormControl(''),
      email_content_owner:new FormControl(''),
      entity_business_area:new FormControl('',[Validators.required]),
      email_preffered_instructor:new FormControl('',[Validators.required]),
      training_provided_by:new FormControl('',[Validators.required]),
      available_language:new FormControl('',[Validators.required]),
      who_see_course:new FormControl(''),
    });
  }

  get f() {
    return this.createCourceForm.controls;
  }
  selectLearning() {
    // this.createCourceForm.setValue({
    //   name:new FormControl('Test')
    // })
  }

  createNewCource() {
    if (this.createCourceForm.valid) {
      console.log(this.createCourceForm.value);
      this.courceService.createCource(this.createCourceForm.value).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.router.navigate(['/dashboard/cources'])
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      this.createCourceForm.markAllAsTouched();
      console.log(this.createCourceForm.value);
    }
  }

  certificationTyupe(event: any) {
    if (event.target.value == 'yes') {
      this.showCertificateExpiry = true;
      console.log(this.createCourceForm.value)
    } else {
      this.showCertificateExpiry = false;
    }
  }

  externalVendor(event:any){
    if(event.target.value="yes"){
      this.externalVendorname = true;
    }else{
      this.externalVendorname = false;
    }
  }

  isshowOverallmenu(){
    this.showCollapse= !this.showCollapse;
  }
}
