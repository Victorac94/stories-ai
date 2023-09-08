import { IRootStory } from "./rootStory"

export interface IStory {
    genre: string,
    genre_es: string,
    id: number,
    title: string,
    thumbnail_desktop: string,
    thumbnail_mobile: string,
    prompt: string,
    rootStory: IRootStory
}