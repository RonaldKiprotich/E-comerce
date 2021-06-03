import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = []
  cart: any = []
  total: number = 0;
  constructor(private service: ApiCallsService) { }

  ngOnInit(): void {
    this.service.get('/api/product').subscribe(data => {
      this.products = data
    })
  }

  buy(id: string) {
    //get product with selected id and push into cart
    var ct = this.products.filter((product: any) => {
      return product.id == id;
    })
    this.cart.push(ct[0])
    this.total = this.total + parseInt(ct[0].price);
  }

  remove_item(id: string) {

    console.log(this.cart);


  }

  search(value: string) {
    if (value == "") {
      this.service.get('/api/product').subscribe(data => {
        this.products = data
      })
    } else {
      var ct = this.products.filter((product: any) => {
        return product.name == value;
      })
      if(ct.length>0){
        this.products = ct;        
      }else{
        this.service.get('/api/product').subscribe(data => {
          this.products = data
        })
      }
    }


  }

}
