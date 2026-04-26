import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  apiUrl = 'http://localhost:5059/api/product';

  products: any[] = [];
  filteredProducts: any[] = [];

  name: string = '';
  price: number = 0;
  editId: number | null = null;
  showForm: boolean = false;

  // Search
  searchId: string = '';
  searchError: string = '';

  // Popup message
  popupMessage: string = '';
  popupType: string = '';
  showPopup: boolean = false;

  // View popup
  viewProduct: any = null;
  showViewPopup: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
  }

  showMessage(message: string, type: string) {
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }

  getProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  // Search by ID
  searchById() {
    if (!this.searchId) {
      this.filteredProducts = this.products;
      this.searchError = '';
      return;
    }
    const found = this.products.find(p => p.id == this.searchId);
    if (found) {
      this.filteredProducts = [found];
      this.searchError = '';
    } else {
      this.filteredProducts = [];
      this.searchError = 'Product not found!';
    }
  }

  clearSearch() {
    this.searchId = '';
    this.searchError = '';
    this.filteredProducts = this.products;
  }

  // View product
  openView(product: any) {
    this.viewProduct = product;
    this.showViewPopup = true;
  }

  closeView() {
    this.showViewPopup = false;
    this.viewProduct = null;
  }

  createProduct() {
    const body = { name: this.name, price: this.price };
    this.http.post(this.apiUrl, body).subscribe({
      next: () => {
        this.getProducts();
        this.resetForm();
        this.showMessage('Product added successfully!', 'success');
      },
      error: (err) => {
        console.log('Error:', err.error);
      }
    });
  }

  updateProduct() {
    const body = { id: this.editId, name: this.name, price: this.price };
    this.http.put(`${this.apiUrl}/${this.editId}`, body).subscribe(() => {
      this.getProducts();
      this.resetForm();
      this.showMessage('Product updated successfully!', 'update');
    });
  }

  deleteProduct(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.getProducts();
      this.showMessage('Product deleted successfully!', 'delete');
    });
  }

  editProduct(product: any) {
    this.editId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.showForm = true;
  }

  onSubmit() {
    if (this.editId) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  resetForm() {
    this.name = '';
    this.price = 0;
    this.editId = null;
    this.showForm = false;
  }

}