import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BazaarService } from '../../service/bazaar.service';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from '../../models/user-response';
import { SnackbarService } from '../../service/snackbar-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  id!: string;

  product: Product = new Product();

  checkoutForm: FormGroup;
  totalAmount: number = 0;
  userResp: UserResponse = new UserResponse();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: BazaarService, private snackbar: SnackbarService, private router: Router) {
    this.checkoutForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    let userDetails = sessionStorage.getItem('userDetails') as any
    this.userResp = JSON.parse(userDetails);
  }


  ngOnInit(): void {
    // Get the 'id' from the route parameters
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.getProductById();
    this.calculateTotal();
    this.checkoutForm.get('quantity')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  getProductById() {
    this.service.getProductById(this.id).subscribe(data => {
      console.log(data)
      this.product = data.result;
      this.totalAmount = this.product.price * this.checkoutForm.get('quantity')?.value
    })
  }

  calculateTotal(): void {
    const quantity = this.checkoutForm.get('quantity')?.value || 1;
    this.totalAmount = this.product.price * quantity;
  }

  createOrderRequest(): any {
    const quantity = this.checkoutForm.get('quantity')?.value || 1;

    const orderRequest = {
      totalAmount: this.totalAmount,
      userId: this.userResp.userDetails.id,
      orderItems: [
        {
          productId: this.product.id,
          quantity: quantity,
          price: this.product.price
        }
      ]
    };

    return orderRequest;
  }

  onSubmit(): void {
    const orderRequest = this.createOrderRequest();
    console.log('Order Request:', orderRequest);
    this.service.placeOrder(orderRequest).subscribe(data => {
      console.log(data);
      this.snackbar.snackbarDisplay("Order placed successfully");
      this.router.navigateByUrl("/online-bazaar/view-products")
    })
  }


}
