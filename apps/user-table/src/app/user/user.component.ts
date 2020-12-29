import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AdduserComponent } from '../adduser/adduser.component';
import { AppState } from '../app.state';
import { UpdateUser } from '../store/actions/user.actions';
import { User } from '../store/models/user.model';

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
  @ViewChild(MatSort, { static: true }) sort: MatSort;
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
  accessValues = ['Administrator', 'Basic'];
  constructor(private store: Store<AppState>, private dailog: MatDialog) { }

  ngOnInit(): void {
    this.store.select('user')
    .subscribe((user: User[]) => {
      this.dataSource = new MatTableDataSource(user);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
    let value: User = {
       id: el.id,
       name: el.name,
       username: el.username,
       organization:el.organization,
       access: el.access,
       dateAdded: el.dateAdded,
       noAccess: el.noAccess,
       eiAnalysis: el.eiAnalysis,
       customMap: el.customMap,
       foreCasting: el.foreCasting
    }
    if(name === 'noAccess') { value.noAccess = event.checked }
    if(name === 'eiAnalysis') { value.eiAnalysis = event.checked }
    if(name === 'customMap') { value.customMap = event.checked }
    if(name === 'foreCasting') { value.foreCasting = event.checked }
    this.store.dispatch(new UpdateUser(value));
  }

  update(el) {
    this.dailog.open(AdduserComponent, {
      width: '400px',
      data: el as User
    })
  }
 }
