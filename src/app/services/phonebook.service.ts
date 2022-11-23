import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phonebookinfo } from '../components/models/phonebook'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Auth, authState } from '@angular/fire/auth';
import * as firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { compileDeclareInjectableFromMetadata } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  
  private userID? : string;
  pbook: Observable<Phonebookinfo[]>;
  pbookinfoforupdate$: Observable<Phonebookinfo[]>;
  

  constructor(
    private fs: AngularFirestore,
    private readonly auth: Auth) { }
  

  //PULL PHONEBOOK DATA FROM FIREBASE
  getUserInfo() {
   
    return this.fs.collection<Phonebookinfo>('info_table', ref => ref.where('LoginID', '==', this.auth.currentUser?.uid))
        .valueChanges({idField: 'id'});
        
  }

  // pullDataForUpdate(id:any) {
  //   return this.fs.collection<Phonebookinfo>('info_table', ref => ref.where('id', '==', id))
  //       .valueChanges({idField: 'id'});
  // }

  //DELETE DATA IN PHONEBOOK FROM FIREBASE

  deleteData(id : string) {
     this.fs.collection('info_table').doc(id).delete().then(res => {
      alert('Record has been deleted.')
     })
     .catch((error) => {
      console.error('Error removing document: ', error);
     })
    
  }


}
