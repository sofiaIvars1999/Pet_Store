import { Component, Input } from '@angular/core';

import { Pet } from '../../interfaces/interfaces.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  /* ------------------- Variables ------------------- */
  @Input() pet!: Pet;

  /* ------------------- Functions ------------------- */

}
