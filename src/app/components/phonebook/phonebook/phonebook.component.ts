import { Component, NgZone, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { PhonebookService } from 'src/app/services/phonebook.service';
import { Phonebookinfo } from '../../models/phonebook';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AdduserdialogComponent } from '../adduserdialog/adduserdialog.component';
import { UpdateuserdialogComponent } from '../updateuserdialog/updateuserdialog.component';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css'],
})
export class PhonebookComponent implements OnInit {
  phonebookinfo$: Observable<Phonebookinfo[]>;
  users: Phonebookinfo[] = [];

  dataRecord: Observable<Phonebookinfo[]>;

  constructor(
    private ps: PhonebookService,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.phonebookinfo$ = this.ps.getUserInfo();
  }

  //////OPEN MODAL FOR ADD NEW USER
  openDialog(): void {
    // var test = this.phonebookinfo$.subscribe(users => {
    let dialogRef = this.dialog.open(AdduserdialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngZone.run(() => {
        this.dialog.closeAll();
      });
    });

    // })
  }

  //UPDATE DATA
  updateDialog(id:any) {
    
    let dialogRef = this.dialog.open(UpdateuserdialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngZone.run(() => {
        this.dialog.closeAll();
      });
    });
  }

  /////DELETE CONFIRMATION
  deleteConfirmation(data: any) {
    var id = data;
    if (confirm('Are you sure you want to delete this record?')) {
        this.ps.deleteData(data);
    }
  }
}
