import { Component, OnInit, Inject, NgZone  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Phonebookinfo } from '../../models/phonebook';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import { documentId, Firestore } from 'firebase/firestore';


@Component({
  selector: 'app-updateuserdialog',
  templateUrl: './updateuserdialog.component.html',
  styleUrls: ['./updateuserdialog.component.css']
})
export class UpdateuserdialogComponent implements OnInit {

  updateForm = new FormGroup({
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

  pbook: Observable<Phonebookinfo[]>;
  
  model: Phonebookinfo;

  private itemDoc: AngularFirestoreDocument<Phonebookinfo>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fs: AngularFirestore,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<UpdateuserdialogComponent>,
    
  )  { 
    
  }

  ngOnInit(): void {
  
    const dataCollection = this.fs.collection<Phonebookinfo>('info_table', ref => ref.where(documentId() , '==', this.data.id))
        .valueChanges({idField: 'id'})
        .subscribe(data_array=> {
            console.log(data_array[0].Email ? data_array[0].Email : undefined)
            this.updateForm.setValue({
              fname: data_array[0].FirstName ? data_array[0].FirstName : null,
              lname: data_array[0].LastName ? data_array[0].LastName : null,
              email: data_array[0].Email ? data_array[0].Email : null,
              phone: data_array[0].PhoneNumber ? data_array[0].PhoneNumber : null,
              gender: data_array[0].Gender ? data_array[0].Gender : null,
            })
          })
        
    

  }



  //check email for valdation
  get email() {
    return this.updateForm.get('email');
  }

  //check first name for valdation
  get fname() {
    return this.updateForm.get('fname');
  }

  //check last name for valdation
  get lname() {
    return this.updateForm.get('lname');
  }

  //check last name for valdation
  get phone() {
    return this.updateForm.get('phone');
  }

  //check email for valdation
  get gender() {
    return this.updateForm.get('gender');
  }
  
  updateData () {
    const { fname, lname, email, phone, gender } = this.updateForm.value;

    console.log(document.getElementsByClassName('ng-invalid'))
    if (!this.updateForm.valid || !email || !fname || !lname || !phone || !gender) {
      alert('Kindly make sure that all fields are valid or entered')
      return;
    }
    // var fname = this.updateForm.get('fname')?.value?.toString();
    // var lname = this.updateForm.get('lname')?.value?.toString();
    // var email = this.updateForm.get('email')?.value?.toString();
    // var phone = this.updateForm.get('phone')?.value?.toString();
    // var gender = this.updateForm.get('gender')?.value?.toString();

    this.model = {
    FirstName: fname,
    LastName: lname,
    Email: email,
    PhoneNumber: phone,
    Gender: gender
    }

    this.fs.doc(`info_table/${this.data.id}`).update({
      FirstName: this.model.FirstName,
      LastName: this.model.LastName,
      Email: this.model.Email,
      PhoneNumber: this.model.PhoneNumber,
      Gender: this.model.Gender,
    }).then(result=> {
      this.closeDialog();
      alert('Successfully Updated');
      
    });
  }


  closeDialog() {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }

}
