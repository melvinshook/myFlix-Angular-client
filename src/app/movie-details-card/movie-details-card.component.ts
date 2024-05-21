import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';


@Component({
  selector: 'app-movie-details-card',
 
  templateUrl: './movie-details-card.component.html',
  styleUrl: './movie-details-card.component.scss'
})
export class MovieDetailsCardComponent {

  /**
     * Constructor for DirectorInfoComponent.
     * @param data - Data injected into the component containing director information.
     */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      description: string;
      title: string;
    },
    public fetchApiData: UserRegistrationService
  ) { }

  /**
    * Angular lifecycle hook called after component initialization.
    */
  ngOnInit(): void {

  }
}
