import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';
import { HttpClient } from '@angular/common/http';
import { config } from '@services/config';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-bulk-lead',
  imports: [
    ModulesModule,
  ],
  templateUrl: './bulk-lead.component.html',
  styleUrl: './bulk-lead.component.scss'
})
export class BulkLeadComponent implements OnInit {
  uploadLoader = false;
  private fileUrl = '../assets/bulklead/leadsample.xlsx';
  constructor(private apiservice: ApiService, private commonFunctionService: CommonFunctionService,private http: HttpClient) { }

  ngOnInit(): void {
  }

  clearFileInput(){
    (document.getElementById("ExcelUpload") as HTMLInputElement).value = "";
  }

  UploadFile() {
    var formData = new FormData();
    const input = document.getElementById("ExcelUpload") as HTMLInputElement;
    if (!input.files?.length) {
      this.commonFunctionService.toastMsg("warning", "Failed", "Plaese select file");
      return;
    }
    const file = input.files[0];
    var ext = file.name.split('.').pop();
    if (ext != "xlsx" && ext != "xls") {
      this.commonFunctionService.toastMsg("error", "Failed", "Please Upload Only Excel File");
      return;
    }
    formData.append("ExcelUpload", file);
    this.uploadLoader = true;
    this.apiservice.sendRequest(config['bulkLeadUpload'], formData).subscribe((response: any) => {
      this.clearFileInput();    
      this.uploadLoader = false;
      if (response != null) {
        if (response.ErrorCode === "1") {
          this.commonFunctionService.toastMsg("success", "Success", response.ErrorMessage);
        } else {
          this.commonFunctionService.toastMsg("error", "Failed", response.ErrorMessage);
        }
      }
    }, (error) => {
      this.clearFileInput();
      this.uploadLoader = false;
    });
  }
  downloadFile() {
    this.http.get(this.fileUrl, { responseType: 'blob' }).subscribe((blob) => {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      const filename = `SampleData_${timestamp}.xlsx`;

      // Create a link to download the file
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = filename;

      // Append the link to the body and click it programmatically
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }
}
