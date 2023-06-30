import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  genderList: Gender[] = [];

  constructor(private studentService: StudentService,
    private readonly route: ActivatedRoute,
    private genderService: GenderService,
    private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {
          this.studentService.getStudent(this.studentId).subscribe(
            (successResponse) => {
              this.student = successResponse;
            });
          this.genderService.getGenderList().subscribe(
            (successResponse) => {
              this.genderList = successResponse;
            }
          );
        }
      });
  }

  onUpdate(): void {
    //Call Student Service to Update Student
    this.studentService.updateStudent(this.student.id, this.student).subscribe(
      (successResponse) => {
        //Show noptification
        this.snackbar.open('Student updated successefully', undefined, {
          duration: 2000
        });
      },
      (errorResponse) => {
        // Log it
        console.log(errorResponse);
      }
    );
  }

}
