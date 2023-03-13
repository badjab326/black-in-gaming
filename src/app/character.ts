export interface Character {
    id: string;
    name: string;
    author: Author;
    image: string;
    game: Game;
    allGames?: AllGame[];
    playableGames: PlayableGame[];
    bio: Bio[];
    pics: Pic[];
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface Author {
    id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Game {
    id: string
    title: string
    boxart: string
    releaseDate: string
    description: Description[]
  }
  
  export interface Description {
    children: Children[]
  }
  
  export interface Children {
    text: string
  }
  
  export interface AllGame {
    id: string
    title: string
    boxart: string
    releaseDate: string
    description: Description2[]
  }
  
  export interface Description2 {
    children: Children2[]
  }
  
  export interface Children2 {
    text: string
  }
  
  export interface PlayableGame {
    id: string
    title: string
    boxart: string
    releaseDate: string
    description: Description3[]
  }
  
  export interface Description3 {
    children: Children3[]
  }
  
  export interface Children3 {
    text: string
  }
  
  export interface Bio {
    children: Children4[]
  }
  
  export interface Children4 {
    text: string
    italic?: boolean
  }
  
  export interface Pic {
    pic1: string
    pic2?: string
    pic3?: string
    pic4?: string
    id: string
  }
  
