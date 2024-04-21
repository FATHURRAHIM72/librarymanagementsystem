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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  listData: StudentData[] = [];
  listBook:any;
  successmsg:any;

  ngOnInit(): void {
    this.getAllStudent();
    this.getAllBook();
  }
  
  getAllStudent(){
    this.service.getAllStudent().subscribe((res)=>{
      console.log(res,"res==>");
      this.listData = res.data;
      // Initialize timeLeft and start the timer for each student
      this.listData.forEach(us => {
        us.timeLeft = this.calculateTimeLeft(us.returnDate);
        this.startTimer(us);
      });
    });
  }

    //get book
    getAllBook(){

      this.service.getAllBook().subscribe((res)=>{
        console.log(res,"res==>");
  
        this.listBook = res.data;
      });
  
    }

        startTimer(us: StudentData) {
          let timer = setInterval(() => {
            us.timeLeft = this.calculateTimeLeft(us.returnDate);
            if (us.timeLeft.days <= 0 && us.timeLeft.hours <= 0 && us.timeLeft.minutes <= 0 && us.timeLeft.seconds <= 0) {
              clearInterval(timer);
            }
          }, 1000);
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
