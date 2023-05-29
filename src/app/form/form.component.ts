import { SupplierService } from './../supplier.service';
import { Supplier } from './supplier';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  supplier: Supplier[] = [];
  formGroupSupplier!: FormGroup;
  isEditing: boolean = false;

  constructor (private SupplierService: SupplierService, private formBuilder: FormBuilder){
    this.formGroupSupplier = formBuilder.group({
      id: [''],
      name: [''],
      contact: [''],
      active: [],
      category: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(){
      this.SupplierService.getSuppliers().subscribe(
        {
            next:  data =>  this.supplier = data,
            error: msg  => console.log("Erro ao chamar o endpont " + msg)
        }
      )
  }

  Save(){
    if(this.isEditing){
      this.isEditing = false;
      this.SupplierService.update(this.formGroupSupplier.value).subscribe({
        next: () => {
          this.loadSuppliers();
          this.formGroupSupplier.reset();
        }
      })
    }
    else{
    this.SupplierService.save(this.formGroupSupplier.value).subscribe(
      {
        next: data =>{
          this.supplier.push(data);
        }
      }
    )
    }

    this.loadSuppliers();
  }

  Exluir(Suppliers: Supplier): void{
    this.SupplierService.remove(Suppliers).subscribe({
      next:() => this.loadSuppliers()

    });
  }

  Alterar(Suppliers: Supplier){
    this.formGroupSupplier.setValue(Suppliers)
    this.isEditing = true;
  }



}
