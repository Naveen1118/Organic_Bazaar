import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../models/user-response';
import { BazaarService } from '../../service/bazaar.service';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit {

  userResp: UserResponse = new UserResponse();

  categories: Category[] = [];
  products: Product[] = [];

  constructor(private service: BazaarService,private router:Router) {
    let userDetails = sessionStorage.getItem('userDetails') as any
    this.userResp = JSON.parse(userDetails);
  }
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  activeFilter = '*';

  getProducts() {
    this.service.getAllProduct().subscribe(data => {
      console.log(data)
      if(data.status){
        this.products=data.result

      }
    })
  }

  getCategories() {
    this.service.getAllCategory().subscribe(data => {
      console.log(data)
      if(data.status){
        this.categories=data.result
      }
    })
  }

  setActiveFilter(filter: string) {
    this.activeFilter = filter;
  }

  get filteredProducts() {
    if (this.activeFilter === '*') {
      return this.products;
    }
    return this.products.filter(product => product.category.name.toLowerCase() === this.activeFilter);
  }


  openCheckoutPage(id:any){

  }
}
