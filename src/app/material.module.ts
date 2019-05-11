import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatButtonModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MatInputModule,
  MatButtonModule
];

@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
})
export class MaterialModule {}
