import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {
  orderId: string;
  orderDetails : any;
  constructor(private http: HttpClient,
              private cdr: ChangeDetectorRef,
              private route : ActivatedRoute) {
    this.orderId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.http.get("http://localhost:8091/api/orders/"+this.orderId).subscribe({
      next : order => {
        this.orderDetails = order;
        this.cdr.detectChanges();
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getTotal(orderDetails: any) {
    let total:number = 0;
    this.orderDetails.items.forEach((item: { price: number; quantity: number; }) => {
      total = total + item.price * item.quantity;
    })
    return total;
  }
}
