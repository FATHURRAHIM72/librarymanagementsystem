import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  bookForm = new FormGroup({
    'bookId':new FormControl('',Validators.required),
    'bookTitle':new FormControl('',Validators.required),
    'bookAuthor':new FormControl('',Validators.required),
    'bookStatus':new FormControl('',Validators.required),


  });
  
Available: any;
NotAvailable: any;

  constructor(private service:ApiserviceService,  private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;
  message: boolean= false;

  ngOnInit(): void {

    // Get one book by bookId
    this.service.getOneBook(this.router.snapshot.params['bookId']).subscribe((res:any)=>{
      console.log(res,'res==>'); // Check response getOneBook from services
      this.bookForm.patchValue({
          bookId:res.data[0].bookId,
          bookTitle:res.data[0].bookTitle,
          bookAuthor:res.data[0].bookAuthor,
          bookStatus:res.data[0].bookStatus

      });
    });
  }

  // Function to update book
bookUpdate() {
  console.log(this.bookForm.value); // Check value from bookForm on console
  this.service.updateBook(this.router.snapshot.params['bookId'], {
    ...this.bookForm.value,
    bookStatus: this.bookForm.value.bookStatus.toLowerCase(),
  }).subscribe((result: any) => {
    this.bookForm.reset();
    this.successmsg = 'Update Book Successful';
    this.message = true;

  });
}
removeMessage(){
  this.message = false;
}

}
