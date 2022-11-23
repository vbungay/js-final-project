import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection } from "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private fs: AngularFirestore) { }

  getProducts() : Observable<Product[]>{
    return this.fs.collection<Product>('products')
    .valueChanges();
     
    // .subscribe(val => console.log(val));
    
  }
}
