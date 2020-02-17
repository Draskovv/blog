import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [MatButtonModule,MatCardModule, MatDividerModule,MatProgressBarModule,MatListModule, MatExpansionModule, MatToolbarModule, MatInputModule,MatIconModule],
  exports: [MatButtonModule,MatCardModule, MatDividerModule,MatProgressBarModule,MatListModule, MatExpansionModule, MatToolbarModule, MatInputModule,MatIconModule]
})
export class MaterialModule { }
