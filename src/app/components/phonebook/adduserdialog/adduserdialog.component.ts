import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Phonebookinfo } from '../../models/phonebook';
import { Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adduserdialog',
  templateUrl: './adduserdialog.component.html',
  styleUrls: ['./adduserdialog.component.css']
})
export class AdduserdialogComponent implements OnInit {

  userForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    gender: new FormControl('', Validators.required),
  })

  model: Phonebookinfo;

  successMsg = 'Data successfully saved.';

  pbookRef: AngularFirestoreCollection<Phonebookinfo>;
  pbook: Observable<Phonebookinfo[]>;


  
  constructor(
    private fs: AngularFirestore,
    private readonly auth: Auth,
    public dialogRef: MatDialogRef<AdduserdialogComponent>,
    private ngZone: NgZone
    ) { }

  ngOnInit(): void {
  }

  //check email for valdation
  get email() {
    return this.userForm.get('email');
  }

  //check first name for valdation
  get fname() {
    return this.userForm.get('fname');
  }

  //check last name for valdation
  get lname() {
    return this.userForm.get('lname');
  }

  //check last name for valdation
  get phone() {
    return this.userForm.get('phone');
  }

  //check email for valdation
  get gender() {
    return this.userForm.get('gender');
  }

  /////ADD NEW PHONEBOOK INFO
  addNewInfo() {

    //GET VALUES
      const { fname, lname, email, phone, gender } = this.userForm.value;
      //CHECK FOR INVALID/MISSING FIELDS
      if (!this.userForm.valid || !email || !fname || !lname || !phone || !gender) {
        alert('Kindly make sure that all fields are valid or entered')
        return;
      }

      // 
      // var firstName = this.userForm.get('fname')?.value?.toString();
      // var lastName = this.userForm.get('lname')?.value?.toString();
      // var mailAdd = this.userForm.get('email')?.value?.toString();
      // var pNumber = this.userForm.get('phone')?.value?.toString();

      var loginID = this.auth.currentUser?.uid


      this.pbookRef = this.fs.collection<Phonebookinfo>('info_table');

      this.model = {
      FirstName: fname,
      LastName: lname,
      Email: email,
      PhoneNumber: phone,
      LoginID: loginID,
      Gender: gender
      }

      this.closeDialog();
      
      this.pbookRef.add(this.model).then( _ => {
        alert(this.successMsg);
        
      }
      );
      
  }

  closeDialog() {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

}
