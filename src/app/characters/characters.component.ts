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
}
