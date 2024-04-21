import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  bookTitle: any;

  studentForm = new FormGroup({
    'Id': new FormControl('', Validators.required),
    'studentName': new FormControl('', Validators.required),
    'studentID': new FormControl('', Validators.required),
    'bookTitle': new FormControl('', Validators.required),
    'borrowDate': new FormControl('', Validators.required),
    'returnDate': new FormControl('', Validators.required)
  });

  constructor( private service:ApiserviceService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;
  message: boolean= false;

  ngOnInit(): void {
    
    forkJoin({
      bookTitle: this.service.getBookTitle(),
      student: this.service.getOneStudent(this.router.snapshot.params['Id'])
    }).subscribe(({ bookTitle, student }) => {
      console.log('Student Data:', student.data[0]); // Check student data on console

      this.bookTitle = bookTitle.data;
      console.log('Book Title:', this.bookTitle); // Check book title on console

      this.studentForm.patchValue({
        Id: student.data[0].Id,
        studentName: student.data[0].studentName,
        studentID: student.data[0].studentID,
        bookTitle: student.data[0].bookTitle,
        borrowDate: student.data[0].borrowDate,
        returnDate: student.data[0].returnDate
      });
    });
  }

    getbookTitle(){
    this.service.getBookTitle().subscribe((result: any)=> {
      console.log('Service Response:', result); // Check services of getBookTitle
      this.bookTitle = result.data;
    })
  }

  

//to update a student
studentUpdate()
{
  console.log('Form Status:', this.studentForm.status); // Check status on studentForm
  console.log('Form Value:', this.studentForm.value); // Check value on studentForm
  console.log('Form Controls:', this.studentForm.controls); // Check control on studentForm

  const bookTitleControl = this.studentForm.get('bookTitle');
  if (bookTitleControl) {
    console.log('Book Title Control Value:', bookTitleControl.value); // Check Book Title control value
  } else {
    console.log('Book Title Control is not defined'); // Check if Book Title is not defined
  }
  console.log('Form Value:', this.studentForm.value); // Chech form values after input
  this.service.updateStudent(this.router.snapshot.params['Id'], this.studentForm.value).subscribe((result:any)=>{
    this.successmsg = 'Update Student Successful';
    this.message = true;
    this.studentForm.reset();
  });
}
}
