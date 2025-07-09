import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  studentData: any;
  studentId: any;

  constructor(
    private service: AppServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentId = history.state.id;

    if (this.studentId) {
      this.getStudentData(this.studentId);
    } else {
      console.error('No student id found in navigation state');
      this.router.navigate(['/']); // Or show an error page
    }
  }

  getStudentData(id: any) {
    let student = { id: id };
    this.service.getOneStudentData(student).subscribe(
      (response) => {
        this.studentData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  editStudent(values: any) {
    values.id = this.studentId;
    this.service.editStudent(values).subscribe(
      (response) => {
        this.studentData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

}
