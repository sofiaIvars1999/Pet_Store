import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  /* ------------------- Functions ------------------- */
  constructor( public http:HttpClient ){
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
  async addPet(form:any){
    let url = this.url + "pet";
    await this.http.post<any>(url, form).subscribe((res)=>{
      this.getPets();
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

  // Generate random id to add a new pet
  getRandomId(){
    //console.log("Random ", Math.floor((Math.random() * (100000 - 0 + 1)) + 0))
   // return Math.random();
  }

}
