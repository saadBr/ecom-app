import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  public products: any;
  constructor(private httpClient: HttpClient,
  private cdr: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.httpClient.get("http://localhost:8089/api/products").subscribe({
      next: data =>{
        this.products = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
  })
  }
}
