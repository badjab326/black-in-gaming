export interface Character {
  id: string;
  name: string;
  author: Author;
  image: string;
  game: Game;
  bio: Bio[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface Game {
  id: string;
  title: string;
  boxart: string;
  releaseDate: string;
  description: Description[];
}
export interface Author {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface Description {
  children: Children[];
}
export interface Children {
  text: string;
  italic?: boolean;
}
export interface Bio {
  children: Children2[];
}
export interface Children2 {
  text: string;
}
