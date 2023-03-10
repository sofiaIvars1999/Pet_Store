import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { Pet } from '../../interfaces/interfaces.interface';
import { environment } from 'src/app/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  /* ------------------- Variables ------------------- */
  url:string = environment.API_URL;
  pets: Pet[] = [];
  petsCopy: Pet[] = [];
  initialStatus:string = 'available';
  statusOptions:string[] =  ['available', 'pending', 'sold'];
  newPetForm: FormGroup = this.fb.group({
    'id': [0, Validators.required],
    'name': ['', Validators.required],
    'status': ['', Validators.required]
  })
  pictureShowed:boolean = false;

  /* ------------------- Functions ------------------- */
  constructor( public http:HttpClient, private fb: FormBuilder ){
    this.getPets();
    localStorage.setItem("status",this.initialStatus);
  }

  // Get all pets
  async getPets(){
    let url = this.url + "pet/findByStatus";
    let params = new HttpParams();
    params = params.append('status', localStorage.getItem("status") || this.initialStatus);
    await this.http.get<any>(url, {params}).subscribe((res)=> {
        this.pets = res.map( (r:any) => {
            return {
                name: r.name,
                status: r.status,
                image: r.photoUrls[0]
            };
        })
        this.petsCopy = this.pets;
    })
  }

  // Add a new pet to the store
  addPet(){
    console.log("Form ", this.newPetForm.value)
    let url = this.url + "pet";
    this.http.post<any>(url, this.newPetForm.value).subscribe((res)=>{
      Swal.fire({
        icon: 'success',
        confirmButtonColor: '#3471cd',
        text: 'A new pet was created!',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById('buttonDismiss')?.click();
          this.getPets();
          location.reload();
        } 
      })
    }),
    (error:any) => {
      console.log("Error: ", error)
    }
  }

  // Search pet by name
  filter(e:any){
    const search: string = e.target.value;
    this.pets = this.petsCopy?.filter( ({name}: Pet) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }

  // Change status
  changeStatus(status:string){
    localStorage.setItem("status",status);
    this.getPets();
  }

  // Show picture
  showPicture(){
    this.pictureShowed = !this.pictureShowed;
  }
}
