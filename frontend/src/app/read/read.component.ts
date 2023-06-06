import { Component , OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
constructor(private service:ApiserviceService){

}
readData:any;

ngOnInit(): void {
this.getAllData();
}

deleteID(id:any){
  console.log(id,"Deleted");
  this.service.deleteData(id).subscribe((res)=>{
  console.log(res,'deleted');
  alert("Deleted"); 
  // this.userForm.reset();
    this.getAllData();
    
  });
 
  }

getAllData(){
  this.service.getAllData().subscribe((res)=>{
    console.log(res,"res==>");
    this.readData = res.data;
    
  });
}
}
