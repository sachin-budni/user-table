import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AdduserComponent } from '../adduser/adduser.component';
import { AppState } from '../app.state';
import { LoadUserAction, UpdateUserAction } from '../store/actions/user.actions';
import { User } from '../store/models/user.model';
import { accessValue } from './../utils/user.utils';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'users-table-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserComponent implements OnInit {

  dataSource = new MatTableDataSource<User>([]);
  columnObj = [
    { name: 'blank', column: 'Blank' },
    { name: 'name', column: 'Name' },
    { name: 'username', column: 'Username' },
    { name: 'organization', column: 'Orgnization' },
    { name: 'access', column: 'Access' },
    { name: 'dateAdded', column: 'Date Added' }
  ]
  columnsToDisplay = this.columnObj.map(c => c.name);
  expandedElement: User | null;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  accessValues = accessValue;
  checkBoxes: {
    id?: number,
    noAccess?: boolean,
    eiAnalysis?: boolean,
    customMap?: boolean,
    foreCasting?: boolean,
  }[] = [];
  selectedOptionAccess: {id?: number, access?: string}[] = [];
  UserList: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  constructor(private store: Store<AppState>, private dailog: MatDialog) { }

  ngOnInit(): void {
    this.UserList = this.store.select(store => store.user.list)
    this.loading$ = this.store.select(store => store.user.loading);
    this.error$ = this.store.select(store => store.user.error);
    this.store.dispatch(new LoadUserAction());
    this.UserList.subscribe((user: User[]) => {
      this.dataSource = new MatTableDataSource(user);
      this.dataSource.paginator = this.paginator;
    });
    // this.store.select('user')
    // .subscribe((user: User[]) => {
    //   this.dataSource = new MatTableDataSource(user);
    //   this.dataSource.paginator = this.paginator;
    // });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    this.dailog.open(AdduserComponent, {
      width: '400px',
      data: null
    })
  }

  updateByCheckbox(event: MatCheckboxChange, el: User, name: string) {
    if (!(this.checkBoxes.some(d => d.id == el.id))) {
      let k= {};
      k[name] = event.checked;
      k['id'] = el.id;
      this.checkBoxes.push(k);
    } else {
      this.checkBoxes.map(d => {
        if (el.id === d.id)
        d[name] = event.checked;
      })
    }
  }

  selectedOption(event: MatSelectChange,el: User) {
    console.log(event);
    if (!(this.selectedOptionAccess.some(b => b.id === el.id))) {
      this.selectedOptionAccess.push({
        id: el.id,
        access: event.value
      });
    } else {
      this.selectedOptionAccess.map(e => {
        if(e.id == el.id)
        e.access = event.value;
      })
    }
  }
  update(el) {
    if (!(this.checkBoxes.some(d => d.id == el.id))) {
      this.expandedElement = el;
      let v = this.setValues(el);
      if(this.selectedOptionAccess.some(n => n.id === el.id)) {
        v.access = this.selectedOptionAccess.find(d1 => d1.id === el.id)?.access;
      }
      this.store.dispatch(new UpdateUserAction(v));
      this.expandedElement = v;
    } else {
      this.checkBoxes.forEach(d => {
        if(d.id === el.id) {
          const { noAccess, customMap, eiAnalysis, foreCasting } = d;
          let value: User = {
            id: el.id,
            name: el.name,
            emailId: el.emailId,
            username: el.username,
            organization:el.organization,
            access: el.access,
            dateAdded: el.dateAdded,
            noAccess: noAccess !== undefined  ? noAccess : el.noAccess,
            eiAnalysis: eiAnalysis !== undefined ? eiAnalysis: el.eiAnalysis,
            customMap: customMap !== undefined ? customMap : el.customMap,
            foreCasting: foreCasting !== undefined ? foreCasting : el.foreCasting
         }
         let v = this.setValues(value);
         if(this.selectedOptionAccess.some(n => n.id === v.id)) {
           v.access = this.selectedOptionAccess.find(d1 => d1.id === el.id)?.access;
         }
         this.store.dispatch(new UpdateUserAction(v));
         this.expandedElement = v;
        }
      });
    }
  }

  setValues(newValue: User):User {
    const { access, foreCasting, eiAnalysis, customMap, dateAdded , emailId, id, name,noAccess,organization,username }  = newValue;
    return {
      access: access,
      customMap: customMap,
      dateAdded: dateAdded,
      eiAnalysis: eiAnalysis,
      emailId: emailId,
      foreCasting: foreCasting,
      id: id,
      name: name,
      noAccess: noAccess,
      organization: organization,
      username: username
    }
  }
 }
