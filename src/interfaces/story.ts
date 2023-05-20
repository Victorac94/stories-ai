import { IRootStory } from "./rootStory"

export interface IStory {
    genre: string,
    id: number,
    title: string,
    thumbnail: string,
    prompt: string,
    rootStory: IRootStory
}