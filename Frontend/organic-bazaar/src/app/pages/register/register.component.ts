import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from '../../models/subscription';
import { BazaarService } from '../../service/bazaar.service';
import { SnackbarService } from '../../service/snackbar-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  paypalButtonsInstance: any;
  pricing: boolean = false;
  individualForm: FormGroup;
  selectedPlans: any[] = [];

  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,private service:BazaarService,private snackbar:SnackbarService,private router:Router) {
    this.individualForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      mobileNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      subscription: ['', Validators.required]
    });

    this.onPasswordChanges();
  }

  ngOnInit(): void {
    this.getAllPlans();
  }

  ngOnDestroy(): void {
    if (this.paypalButtonsInstance) {
      this.paypalButtonsInstance.close();
      this.paypalButtonsInstance = null;
    }
  }


  getAllPlans(){
    this.service.getAllSubscrition().subscribe(data=>{
      if(data.status){
        this.subscriptions=data.result;
      }
    })
  }

  onPasswordChanges(): void {
    this.individualForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      const password = this.individualForm.get('password')?.value;
      const confirmPassword = this.individualForm.get('confirmPassword')?.value;
      this.individualForm.get('confirmPassword')?.setErrors(password !== confirmPassword ? { passwordMismatch: true } : null);
    });
  }

  onSubmit(): void {
    if (this.individualForm.valid) {

      this.pricing = true;

      const selectedSubscriptionId = this.individualForm.get('subscription')?.value;
      const selectedItem = this.subscriptions.find(item => item.id === selectedSubscriptionId);
      if (selectedItem) {
        this.selectedPlans = [selectedItem];

        // Ensure the PayPal buttons are rendered after the DOM updates
        this.cdr.detectChanges();

        this.selectedPlans.forEach(plan => this.renderPayPalButtons(plan));
      }
    } else {
      this.individualForm.markAllAsTouched();
    }
  }

  renderPayPalButtons(plan: any): void {
    const elementId = `paymentRef_${plan.id}`;
    const paymentElement = document.getElementById(elementId);

    if (window.paypal && paymentElement) {
      this.paypalButtonsInstance = window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: plan.price.toFixed(2) } }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Transaction completed by ' + details.payer.name.given_name);
            this.service.registerUser(this.individualForm.value).subscribe(data=>{
              if(data.status){
                this.snackbar.snackbarDisplay("Registration success")
                this.router.navigateByUrl("/")
              }
            })
          });
        },
        onError: (err: any) => {
          console.error('Error during PayPal payment:', err);
        }
      });

      // Render PayPal button after DOM updates
      this.paypalButtonsInstance.render(paymentElement);
    }
  }
}
