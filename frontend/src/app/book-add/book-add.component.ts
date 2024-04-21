import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  constructor(private service:ApiserviceService,  private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {

    // Get one book by bookId
    this.getparamid = this.router.snapshot.paramMap.get('bookId');
    if (this.getparamid){
    this.service.getOneBook(this.getparamid).subscribe((res)=>{

      console.log(res,'res==>');
      this.bookForm.patchValue({
        bookTitle:res.data[0].bookTitle,
        bookAuthor:res.data[0].bookAuthor,
        bookStatus:res.data[0].bookStatus,
      });
    });
  }
  }

  bookForm = new FormGroup({
    'bookTitle':new FormControl('',Validators.required),
    'bookAuthor':new FormControl('',Validators.required),
    'bookStatus':new FormControl('',Validators.required)


  });

  //to create a new book
  bookSubmit(){
    if(this.bookForm.valid){
      console.log(this.bookForm.value);
      this.service.addBook( this.bookForm.value ).subscribe((res)=>{
        console.log(res,'res==>');
        this.bookForm.reset();
        this.successmsg = 'Add Book Successful';
      }, (error) => {
        console.error(error);
      });
    }
    else{
      this.errormsg = 'Add Book Unsuccessful';
    }

  }
}