import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICustomer } from 'src/app/models/ICustomer';
import { IDocument } from 'src/app/models/IDocument';
import Swal from 'sweetalert2';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-view-documents',
  templateUrl: './agent-view-documents.component.html',
  styleUrls: ['./agent-view-documents.component.css']
})
export class AgentViewDocumentsComponent implements OnInit {

  constructor(private adminService:AgentService, private sanitizer: DomSanitizer) { }

  documents:IDocument[];
  customer:ICustomer;
  imageUrl:any;
  ngOnInit(): void {
    this.customer = this.adminService.getCustomer();
    this.adminService.getDocumentsByCustomerId(this.customer.id).subscribe(x => {
      console.log(x);
      this.documents = x;
    })
  }

  viewDocument(document:IDocument){
    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${document.imageData}`);
    Swal.fire({
      title: document.imageTitle,
      text: "Image Id: " +document.id,
      imageUrl: this.imageUrl.changingThisBreaksApplicationSecurity,
      imageWidth: 900,
      imageHeight: 400,
      imageAlt: document.imageTitle,
    })
  }
}
