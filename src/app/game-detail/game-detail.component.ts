import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../game.service';
import { Game } from '../character';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  @Input() game?: Game;
  
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id).subscribe(game => this.game = game);
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    if (this.game) {
      this.gameService.updateGame(this.game)
        .subscribe(() => this.goBack());
    }
  }

}
