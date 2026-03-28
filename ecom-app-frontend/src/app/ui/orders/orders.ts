import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  public orders : any;
  constructor(private http: HttpClient,
              private cdr: ChangeDetectorRef,
              private router: Router,) {
  }
  ngOnInit() {
    this.http.get("http://localhost:8091/api/orders").subscribe({
      next : orders => {
        this.orders = orders;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getOrderDetails(o:any) {
    this.router.navigateByUrl("/orders/" + o.id);
  }
}
