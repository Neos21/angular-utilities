import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // 「/home」にアクセスした時 HomeModule を読み込む
  { path: 'home', loadChildren: 'app/pages/home/home.module#HomeModule' },
  
  // 空パスで Index にリダイレクトする
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  // 存在しないパスの場合に Index にリダイレクトする
  { path: '**', redirectTo: '/index', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
