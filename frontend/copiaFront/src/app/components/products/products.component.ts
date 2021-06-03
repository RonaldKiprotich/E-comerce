import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any = []

  constructor(private service:ApiCallsService) { }

  ngOnInit(): void {
    this.service.get('/api/product').subscribe(data=>{
      this.products=data
    })
  }

}
