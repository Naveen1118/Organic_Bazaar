import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BazaarService {
 private baseUrl = "http://localhost:8080"


  

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, user).pipe(catchError(error => {
      return throwError(() => new Error('Error registerUser'));
    }));
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials).pipe(catchError(error => {
      console.log(error)
      return throwError(() => new Error('Error loginUser'));
    }));
  }

  //Category
  

  getAllCategory(): Observable<any> {
    const url = `${this.baseUrl}/category/get-all`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getAllCategory'));
    }));
  }
  
  getCategoryById(id:any): Observable<any> {
    const url = `${this.baseUrl}/category/get-by-id/${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getCategoryById'));
    }));
  }

  addCategory(request:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/category/add`, request).pipe(catchError(error => {
      return throwError(() => new Error('Error addCategory'));
    }));
  }

  //Product
  addProduct(request:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/product/add`, request).pipe(catchError(error => {
      return throwError(() => new Error('Error addProduct'));
    }));
  }
  getAllProduct(): Observable<any> {
    const url = `${this.baseUrl}/product/get-all`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getAllProduct'));
    }));
  }
  
  getProductById(id:any): Observable<any> {
    const url = `${this.baseUrl}/product/get-by-id/${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getProductById'));
    }));
  }

  getProductByCategory(id:any): Observable<any> {
    const url = `${this.baseUrl}/category/get-by-category/${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getProductByCategory'));
    }));
  }

  updateProduct(id: any, request: any): Observable<any> {
    const url = `${this.baseUrl}/product/update/${id}`;
    return this.http.put<any>(url, request).pipe(catchError(error => {
      return throwError(() => new Error('Error updateProduct'));
    }));
  }

  deleteProduct(id: any): Observable<any> {
    const url = `${this.baseUrl}/product/delete/${id}`;
    return this.http.delete<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error deleteProduct'));
    }));
  }

  //Order
  

  placeOrder(request:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders/create`, request).pipe(catchError(error => {
      return throwError(() => new Error('Error placeOrder'));
    }));
  }
  
  getOrderById(id:any): Observable<any> {
    const url = `${this.baseUrl}/orders/get-by-id/${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getOrderById'));
    }));
  }

  getOrdersByUser(id:any): Observable<any> {
    const url = `${this.baseUrl}/orders/user/${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getOrdersByUser'));
    }));
  }

  //Subscription

  addSubscription(request:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/subscription/add`, request).pipe(catchError(error => {
      return throwError(() => new Error('Error addSubscription'));
    }));
  }
  getAllSubscrition(): Observable<any> {
    const url = `${this.baseUrl}/subscription/getAll`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getAllSubscrition'));
    }));
  }
  
  getSubscriptionById(id:any): Observable<any> {
    const url = `${this.baseUrl}/subscription/getById?id=${id}`;
    return this.http.get<any>(url).pipe(catchError(error => {
      return throwError(() => new Error('Error getSubscriptionById'));
    }));
  }
}
