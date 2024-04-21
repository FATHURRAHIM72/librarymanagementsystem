import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FaqComponent } from './faq/faq.component';
import { NavbarComponent } from './navbar/navbar.component';

import { StudentViewComponent } from './student-view/student-view.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentUpdateComponent } from './student-update/student-update.component';

import { BookViewComponent } from './book-view/book-view.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookUpdateComponent } from './book-update/book-update.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'faq', component: FaqComponent},

  {path: 'studentView', component: StudentViewComponent},
  {path: 'studentAdd', component: StudentAddComponent},
  {path: 'studentUpdate/:Id', component: StudentUpdateComponent},

  {path: 'bookView', component: BookViewComponent},
  {path: 'bookAdd', component: BookAddComponent},
  {path: 'bookUpdate/:bookId', component: BookUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
