import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/app/environments/environment';
import { Pet } from '../interfaces/interfaces.interface';


@Injectable({
    providedIn: 'root'
})

export class PetService {
    /* ------------------- Variables ------------------- */
    url:string = environment.API_URL;

    /* ------------------- Functions ------------------- */
    constructor( public http:HttpClient ){}

}