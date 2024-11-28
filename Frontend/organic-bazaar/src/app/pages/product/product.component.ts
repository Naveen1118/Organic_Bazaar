import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';
import { BazaarService } from '../../service/bazaar.service';
import { Category } from '../../models/category';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];

  categories: Category[] = [];

  dataSource = new MatTableDataSource<Product>();
  constructor(private fb: FormBuilder, private service: BazaarService, private dialog: MatDialog) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
      categoryId: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.service.getAllCategory().subscribe(data => {
      console.log(data)
      if (data.status) {
        this.categories = data.result

      }
    })
  }

  openDialog(org: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      },
      panelClass: 'confirm-dialog',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(org.id)
      }
    });
  }

  delete(id: any) {
    this.service.deleteProduct(id).subscribe(data => {
      console.log(data)
      this.getProducts();
    })
  }


  imgdata: any;
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imgdata = (reader.result as string);
        this.productForm.patchValue({ img: file.name });
      };

      reader.readAsDataURL(file);
    }
  }
  displayForm: boolean = false;
  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.imgdata = this.imgdata.split(",")[1];
      formData.img = this.imgdata
      console.log(formData)
      this.service.addProduct(formData).subscribe(data => {
        console.log(data)
        this.displayForm = false;
        this.getProducts();
      })
    }
  }

  getProducts() {
    this.service.getAllProduct().subscribe(data => {
      console.log(data)
      if (data.status) {
        this.dataSource.data = data.result

      }
    })
  }
}
