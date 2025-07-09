import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  teacherData: any;
  teacherId: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    // Get the ID from history.state
    this.teacherId = history.state.id;

    if (this.teacherId) {
      this.getTeacherData(this.teacherId);
    } else {
      console.error('No teacher id found in navigation state');
      this.router.navigate(['/']); // Redirect or show an error page
    }
  }

  getTeacherData(id: any) {
    const teacher = { id: id };
    this.service.getOneTeacherData(teacher).subscribe(
      (response) => {
        this.teacherData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  editTeacher(values: any) {
    values.id = this.teacherId;
    this.service.editTeacher(values).subscribe(
      (response) => {
        this.teacherData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

}
