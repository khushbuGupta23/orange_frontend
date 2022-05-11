import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetReportRoutingModule } from './get-report-routing.module';
import { GetReportListComponent } from './get-report-list/get-report-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { GetReportHistoryComponent } from './get-report-history/get-report-history.component';
import { GetReportCreateComponent } from './get-report-create/get-report-create.component';


@NgModule({
  declarations: [GetReportListComponent, GetReportHistoryComponent, GetReportCreateComponent],
  imports: [
    CommonModule,
    GetReportRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgSelectModule,
    NgbModule
  ]
})
export class GetReportModule { }
