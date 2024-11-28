import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';
import { BazaarService } from '../../service/bazaar.service';
import { FormBuilder } from '@angular/forms';
import { Category } from '../../models/category';
import { UserResponse } from '../../models/user-response';
interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  userId: number;
  orderItems: OrderItem[];
  totalAmount: number;
  status: string;
  orderDate: string;
}

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  // displayedColumns: string[] = ['id','productId', 'quantity', 'itemPrice','total'];

  displayedColumns: string[] = ['id', 'totalAmount', 'orderDate', 'orderItems'];


  orders: Order[] = [];
  userResp: UserResponse = new UserResponse();

  dataSource = new MatTableDataSource<Order[]>();
  constructor(private service: BazaarService) {
    let userDetails = sessionStorage.getItem('userDetails') as any
    this.userResp = JSON.parse(userDetails);
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.service.getOrdersByUser(this.userResp.userDetails.id).subscribe(data=>{
      console.log(data);
      this.orders=data.result;
      this.dataSource.data=data.result;
    })
  }



}
