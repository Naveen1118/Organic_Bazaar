import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BazaarService } from '../../service/bazaar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private service: BazaarService) {
    sessionStorage.clear();
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.loginUser(this.form.value).subscribe(data => {
        console.log(data)
        if(data.status){
          sessionStorage.setItem('userDetails',JSON.stringify(data.result));
          this.router.navigateByUrl("/organic-bazaar/view-products")
        }
      })
    }
  }
}
