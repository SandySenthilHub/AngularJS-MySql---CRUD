import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }

  getparamid: any;

  ngOnInit(): void {
    // console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.service.getSingleData(this.getparamid).subscribe((res) => {
      console.log(res);
      this.userForm.patchValue({
        name: res.data[0].name,
        address: res.data[0].address,
        city: res.data[0].city,
        pc: res.data[0].pc,
        country: res.data[0].country
      })

    })

  }
  userForm = new FormGroup({
    'name': new FormControl('',Validators.required),
    'address': new FormControl('',Validators.required),
    'city': new FormControl('',Validators.required),
    'pc': new FormControl('',Validators.required),
    'country': new FormControl('',Validators.required),



  })


  userSubmit() {
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res) => {
        console.log(res);
        // alert('Employee Created')
        this.userForm.reset();
    })
    
    }

  }

  userUpdate() {
    console.log(this.userForm.value, 'updatedform');
    if(this.userForm.valid){
      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res) => {
        console.log(res);
    })
 

    }
  }

}
