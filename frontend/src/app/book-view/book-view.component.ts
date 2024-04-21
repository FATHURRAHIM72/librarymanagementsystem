import { Component, OnInit } from '@angular/core';
import {ApiserviceService}from '../apiservice.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  listData:any;
  successmsg:any;

  ngOnInit(): void {
    this.getAllBook();
  }

  // Delete book using bookId
  deleteBook(bookId:any){
    console.log(bookId,'deleteId==>'); //Check error on console
    this.service.deleteBook(bookId).subscribe((res)=>{
      console.log(res,'deleteres==>'); // Check error on console
      this.successmsg = "Delete Book Successful!";
      this.getAllBook();

    });

  }

  // Get all book from table
  getAllBook(){

    this.service.getAllBook().subscribe((res)=>{
      console.log(res,"res==>"); // Check response on getAllBook services
      this.listData = res.data;
    });

  }

}
