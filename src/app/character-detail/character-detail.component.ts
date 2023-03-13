import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from '../character.service';
import { Character } from '../character';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent {
  @Input() character?: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.characterService
      .getCharacter(id)
      .subscribe((character) => (this.character = character));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.character) {
      this.characterService
        .updateCharacter(this.character)
        .subscribe(() => this.goBack());
    }
  }
}
