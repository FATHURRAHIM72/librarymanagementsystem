import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

interface StudentData {
  Id: number;
  studentName: string;
  studentID: string;
  bookTitle: string;
  borrowDate: string;
  returnDate: string;
  timeLeft?: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  listData: StudentData[] = []; // Add this line here
  successmsg:any;

  ngOnInit(): void {

    this.getAllStudent();
  }

  //get delete id
  deleteStudent(Id:any){
    console.log(Id,'deleteId==>'); //Check error on console
    this.service.deleteStudent(Id).subscribe((res)=>{
      console.log(res,'deleteres==>'); //Check error on console
      this.successmsg = "Delete Student Successful";
      this.getAllStudent();

    });

  }

  // Then use this interface as the type for the 'us' parameter
  startTimer(us: StudentData) {
    let timer = setInterval(() => {
      us.timeLeft = this.calculateTimeLeft(us.returnDate);
      if (us.timeLeft.days <= 0 && us.timeLeft.hours <= 0 && us.timeLeft.minutes <= 0 && us.timeLeft.seconds <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

getAllStudent(){
  this.service.getAllStudent().subscribe((res)=>{
    console.log(res,"res==>");//Check error on console
    this.listData = res.data;
    // Initialize timeLeft and start the timer for each student
    this.listData.forEach(us => {
      us.timeLeft = this.calculateTimeLeft(us.returnDate);
      this.startTimer(us);
    });
  });
}

  calculateTimeLeft(returnDate: string) {
    let difference = +new Date(returnDate) - +new Date();
    let timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
    return timeLeft;
  }
}
