import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';


@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss'
})
export class GenreCardComponent {


  /**
     * Constructor for DirectorInfoComponent.
     * @param data - Data injected into the component containing director information.
     */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
    },
    public fetchApiData: UserRegistrationService
  ) { }

  /**
    * Angular lifecycle hook called after component initialization.
    */
  ngOnInit(): void {

  }

}