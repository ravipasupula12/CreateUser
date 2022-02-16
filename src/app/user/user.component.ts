import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';  


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  constructor(private http:HttpClient,private fb: FormBuilder) {
    
   }
   public action: string = '';
  public UserData: any;
  public actionData: any;
  public showUser:boolean = true; 
  ngOnInit(): void {
   this.userForm = this.fb.group({  
      name: [''],  
      email: [''],  
      phone: [''],  
      website: [''],    
    });  
    this.getUser();
  }
  getUser(){
      this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
        console.log(data,"&&&*")
        this.UserData = data;
      })
    }

    InsertUser(){
      console.log(this.action,"&*&*&*")
      switch(this.action){
        case 'edit': this.editData(this.userForm.value);
        
         this.userForm.reset(); 
         this.action = '';
         alert('user Updated successfully'); 

        break;
        case 'delete': this.delete(this.actionData);
        break;
        default:
          let data = this.userForm.value;
          let headers = new HttpHeaders({
            'Content-type': 'application/json; charset=UTF-8' });
        let options = { headers: headers };
          this.http.post('https://jsonplaceholder.typicode.com/users',data,options).subscribe(data => {
            console.log(data,"post")
          })
          alert('user Inserted successfully');
          this.userForm.reset();
          this.showUser = true;
          break;
      }
    }

    edit(data:any){
      this.action = 'edit';
      this.actionData = data;
      this.userForm.patchValue({
        name:data.name,
        email:data.email,
        phone:data.phone,
        website:data.website
      })
    }

    editData(data:any){
      console.log(data,'&*&*&*&*&*  edit data');
      let headers = new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8' });
    let options = { headers: headers };
      this.http.put(`https://jsonplaceholder.typicode.com/users/${this.actionData.id}`,JSON.stringify(data),options).subscribe(data => {
        console.log("User Deleted..");
        this.getUser();
        this.showUser = true;
      })
    }
    delete(data:any){
      this.action = 'delete';
      confirm("Are you sure you want to delete the data");
      this.actionData = data;
      this.http.delete(`https://jsonplaceholder.typicode.com/users/${data.id}`,data).subscribe(data => {
        alert('user Deleted successfully')
        this.action = '';
        this.getUser()
      })
    }
  
}
