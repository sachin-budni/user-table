import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AddUser, UpdateUser } from '../store/actions/user.actions';
import { User } from '../store/models/user.model';

@Component({
  selector: 'users-table-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  userForm: FormGroup;
  accessValues = ['Administrator', 'Basic'];
  organizationValues = ['Customer', 'Dealer', 'CAT']
  constructor(private store: Store<AppState>, private fb: FormBuilder,
    private dailogRef: MatDialogRef<AdduserComponent>, @Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit(): void {
     this.userForm = this.fb.group({
       name: ['', Validators.required],
       username: ['', Validators.required],
       organization: ['', Validators.required],
       access: ['', Validators.required],
       dateAdded: ['', Validators.required],
       noAccess: [false, Validators.required],
       eiAnalysis: [false, Validators.required],
       customMap: [false, Validators.required],
       foreCasting: [false, Validators.required],
     });
     if (this.user) {
      console.log(this.user);
      let keys = Object.keys(this.user);
      keys.forEach((key: any) => {
        this.setValues(key)
      })
     }
  }

  setValues(name: string) {
    if (name === 'id') return false;
    this.userForm.controls[name].setValue(this.user[name]);
  }

  onSubmit(value: User) {
    if(this.user) {
      value.id = this.user.id;
      this.store.dispatch(new UpdateUser(value));
    } else {
      value.id = Math.floor((Math.random()*1000000)+1)
      value.dateAdded = new Date();
      this.store.dispatch(new AddUser(value));
    }
    this.close();
  }

  close() {
    this.dailogRef.close();
  }

}
