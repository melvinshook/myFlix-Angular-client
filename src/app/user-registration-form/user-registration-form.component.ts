import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';

////////////////////////////////////////////////////////////////////////////////
// Types
////////////////////////////////////////////////////////////////////////////////

type RawUserData = {
  userName: string;
  password: string;
  email: string;
  birthday: string;
};

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////

// Ideally this would be a function that *parses* RawUserData into
// ParsedUserData, but this is enough for now.
function validate(
  userData: RawUserData,
): { ok: true } | { ok: false; messages: string[] } {
  const xs = [
    {
      isValid: userData.userName.length > 0,
      message: 'username is empty',
    },
    {
      isValid: userData.password.length > 0,
      message: 'password is empty',
    },
    // Can do more complicated email validation as you wish.
    {
      isValid: userData.email.length > 0,
      message: 'email is empty',
    },
    // Can do more complicated birthday validation as you wish.
    {
      isValid: userData.birthday.length > 0,
      message: 'birthday is empty',
    },
  ].filter((x) => !x.isValid);

  if (xs.length === 0) {
    return { ok: true };
  } else {
    return { ok: false, messages: xs.map((x) => x.message) };
  }
}

////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData: RawUserData = {
    userName: '',
    password: '',
    email: '',
    birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    // There's server-side validation on the data, but clientside validation
    // never hurts :)
    const validation = validate(this.userData);
    if (validation.ok) {
      this.fetchApiData.userRegistration(this.userData).subscribe(
        (result) => {
          // Logic for a successful user registration goes here! (To be implemented)
          this.dialogRef.close(); // This will close the modal on success!
          console.log(result);
          this.snackBar.open('user registration successful', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          debugger;
          console.log(result);
          this.snackBar.open(result, 'OK', {
            duration: 2000,
          });
        },
      );
    } else {
      this.snackBar.open(
        `User Data is invalid: ${validation.messages.join(', ')}`,
        'OK',
        {
          duration: 4000,
        },
      );
    }
  }
}
