import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
})
export class MaterialModule {}
