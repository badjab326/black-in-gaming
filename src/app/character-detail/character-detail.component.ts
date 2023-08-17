import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from '../character.service';
import { GameService } from '../game.service';
import { Character, Game } from '../character';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent {
  @Input() character?: Character;
  games$!: Observable<Game[]>;
  private searchTerms = new Subject<string>();

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'title',
      maxWidth: 180,
      cellStyle: { wordBreak: 'normal', lineHeight: '20px' },
      wrapText: true,
      minWidth: 200,
      flex: 2,
    },
    {
      headerName: 'Box Art',
      field: 'boxart',
      valueFormatter: `(value)`,
      valueParser: 'String',
      cellRenderer: (params: any) => {
        return `<img src='${params.data.boxart}' style="height:100%;"/>`;
      },
    },
    {
      headerName: 'Details',
      field: 'description',
      valueFormatter: `(value)[0].children[0].text`,
      valueParser: 'String',
      cellStyle: { wordBreak: 'normal', lineHeight: '20px' },
      wrapText: true,
      minWidth: 200,
      maxWidth: 500,
      flex: 2,
    },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private gameService: GameService,
    private location: Location
  ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.rowData$ = this.characterService.loadCharacterGames(id);
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

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
