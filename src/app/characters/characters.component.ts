import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {
  selectedCharacter?: Character;

  characters: Character[] = [];

  constructor(private characterService: CharacterService) { }
  // constructor(private characterService: CharacterService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  // onSelect(character: Character): void {
  //   this.selectedCharacter = character;
  //   this.messageService.add(`CharactersComponent: Selected character id=${character.id}`);
  // }

  getCharacters(): void {
    this.characterService.getCharacters()
        .subscribe(characters => this.characters = characters);
  }  

  add(name: string, game: string): void {
    name = name.trim();
    game = game.trim();
    if (!name && !game) { return; }
    this.characterService.addCharacter({ name, game: { title: game } } as Character)
      .subscribe(character => {
        this.characters.push(character);
      });
  }

  delete(character: Character): void {
    this.characters = this.characters.filter(c => c !== character);
    this.characterService.deleteCharacter(character.id).subscribe();
  }

}
