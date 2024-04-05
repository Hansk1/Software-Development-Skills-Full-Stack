import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  password!: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };

    //Required Fields
    if (!this.validateService.validateRegister(user)) {
      console.log('Fill all fields!');
      return false;
    }

    //Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      console.log("'Please use a valid email'");
      return false;
    }
    //Register user
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.router.navigate(['/login']);
        return true;
      } else {
        this.router.navigate(['/register']);
        return false;
      }
    });
    return false;
  }
}
