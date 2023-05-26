import { IRootStory } from "./rootStory"

export interface IStory {
    genre: string,
    genre_es: string,
    id: number,
    title: string,
    thumbnail: string,
    prompt: string,
    rootStory: IRootStory
}