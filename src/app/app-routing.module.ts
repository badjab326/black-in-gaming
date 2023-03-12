import { NgModule } from '@angular/core';
import { CharactersComponent } from './characters/characters.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'detail/:id', component: CharacterDetailComponent },
  { path: 'games', component: GamesComponent },
  { path: 'game-detail/:id', component: GameDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
