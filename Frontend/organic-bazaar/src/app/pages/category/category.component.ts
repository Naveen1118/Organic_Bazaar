import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BazaarService } from '../../service/bazaar.service';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categoryForm!: FormGroup;
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<Category>();
  constructor(private fb: FormBuilder,private service:BazaarService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  displayForm:boolean=false;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.service.getAllCategory().subscribe(data => {
      console.log(data)
      if(data.status){
        this.dataSource.data=data.result

      }
    })
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log('Form Submitted', this.categoryForm.value);
      this.service.addCategory(this.categoryForm.value).subscribe(data=>{
        this.displayForm=false;
        console.log(data)
        this.getCategories();
      })
    }
  }

}
