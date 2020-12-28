import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
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
  constructor(private store: Store<AppState>) { }

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

  update(el) {
    console.log(el)
  }
 }
