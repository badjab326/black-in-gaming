import { Component } from '@angular/core';
import { Game } from '../character'; 
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
    selectedGame?: Game;
  
    games: Game[] = [];
  
    constructor(private gameService: GameService) { }
    // constructor(private gameService: GameService, private messageService: MessageService) { }
  
    ngOnInit(): void {
      this.getGames();
    }
  
    getGames(): void {
      this.gameService.getGames()
          .subscribe(games => this.games = games);
    }  
  
    add(title: string): void {
      title = title.trim();
      if (!title) { return; }
      this.gameService.addGame({ title } as Game)
        .subscribe(game => {
          this.games.push(game);
        });
    }
  
    delete(game: Game): void {
      this.games = this.games.filter(c => c !== game);
      this.gameService.deleteGame(game.id).subscribe();
    }
}
