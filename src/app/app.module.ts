import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//MAT TOOLBARS
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'

//FIREBASE
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore, FirestoreModule } from '@angular/fire/firestore';

//FIRE MODULE/STORE
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//COMPONENTS
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PhonebookComponent } from './components/phonebook/phonebook/phonebook.component';
import { AdduserdialogComponent } from './components/phonebook/adduserdialog/adduserdialog.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { UpdateuserdialogComponent } from './components/phonebook/updateuserdialog/updateuserdialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ProductListComponent,
    PhonebookComponent,
    AdduserdialogComponent,
    UpdateuserdialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
   
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    MatMenuModule,
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    // AngularFireModule,
    // AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
