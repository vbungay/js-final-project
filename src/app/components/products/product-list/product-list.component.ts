import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from '../shared/product.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;
  constructor(private ps: ProductService) { 
    
  }

  ngOnInit(): void {
    this.products$ = this.ps.getProducts();
    console.log(this.products$)
  }

}
