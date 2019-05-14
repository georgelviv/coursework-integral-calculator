import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule
];

@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
})
export class MaterialModule {}
