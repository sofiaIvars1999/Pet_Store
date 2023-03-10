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

  /* ------------------- Functions ------------------- */
  constructor( public http:HttpClient ){
   this.getPets();
  }

  // Get all pets
  async getPets(){
    let url = this.url + "pet/findByStatus";
    let params = new HttpParams();
    params = params.append('status', 'available');
    await this.http.get<any>(url, {params}).subscribe((res)=>{
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

  // Search pet by name
  filter(e:any){
    const search: string = e.target.value;
    this.pets = this.petsCopy?.filter( ({name}: Pet) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }

}
