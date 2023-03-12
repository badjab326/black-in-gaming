import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../game.service';
import { CharacterService } from '../character.service';
import { Character } from '../character';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Game } from '../character';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  @Input() game?: Game;
  characters$!: Observable<Character[]>;
  private searchTerms = new Subject<string>();
  
   // Each Column Definition results in one Column.
 public columnDefs: ColDef[] = [
  { field: 'name'},
  { field: 'image'},
  { field: 'price' }
];

// DefaultColDef sets props common to all Columns
public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
};

// Data that gets displayed in the grid
public rowData$!: Observable<Character[]>;

// For accessing the Grid's API
@ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location,
    private characterService: CharacterService
  ) {}

// Push a search term into the observable stream.
search(term: string): void {
  this.searchTerms.next(term);
}

// Example load data from sever
onGridReady(params: GridReadyEvent) {
  const id = String(this.route.snapshot.paramMap.get('id'));
  this.gameService.getGame(id).subscribe(game => {
    this.rowData$ = this.characterService.loadCharacters(game ? game.title : '');
  })
}

// Example of consuming Grid Event
onCellClicked( e: CellClickedEvent): void {
  console.log('cellClicked', e);
}

// Example using Grid's API
clearSelection(): void {
  this.agGrid.api.deselectAll();
}
  
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
