import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { User } from '../store/models/user.model';
import { accessValue } from '../utils/user.utils';

@Component({
  selector: 'users-table-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass']
})
export class RoleComponent implements OnInit {

  @Input() element: any;
  @Input() column: any;
  accessValues = accessValue;
  @Output() selectedOption = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  selectedOptions(event: any,el: User) {
    this.selectedOption.emit({event: event, el: el});
  }

}
