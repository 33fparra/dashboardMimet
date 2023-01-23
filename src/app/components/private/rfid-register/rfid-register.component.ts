import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRfidRegister } from 'src/app/core/interfaces/rfid.interface';
import { RfidsService } from 'src/app/core/services/rfids.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const CLOSE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>
`;

const CHECK_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
`;

@Component({
   selector: 'app-rfid-register',
   templateUrl: './rfid-register.component.html',
   styleUrls: ['./rfid-register.component.scss']
})
export class RfidRegisterComponent implements OnInit {
   public dataSource = new MatTableDataSource<IRfidRegister>();
   public loadingStatusIds: string[] = [];
   public loading = true;
   

   displayedColumns: string[] = [
      'code',
      'model',
      'rfid',
      'description',
      'logo',
      'device',
      'antenna',
      'status',
      'createdAt'
   ];

   @ViewChild(MatSort) set sort(sort: MatSort) {
      this.dataSource.sort = sort;
   }

   @ViewChild(MatPaginator) set pag(paginator: MatPaginator) {
      this.dataSource.paginator = paginator;
   }

   constructor(private service: RfidsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIconLiteral('check_icon', sanitizer.bypassSecurityTrustHtml(CHECK_ICON));
      iconRegistry.addSvgIconLiteral('close_icon', sanitizer.bypassSecurityTrustHtml(CLOSE_ICON));
   }

   ngOnInit(): void {
      this.RfidRegisterList();
           
     // if ( Array.some( (element) => element.status==='not-found') ) { this.alarm(); }
      
   }

   // alarm(){
   //    const audio = new Audio();
   //    audio.src = '../../../assets/audio/alarma.mp3';
   //    audio.load();
   //    audio.play();
   //  }

   public RfidRegisterList(): void {
      this.service.getItems().subscribe((res) => {
         this.dataSource.data = res;
         this.loading = false;
      })
   }

   
}
