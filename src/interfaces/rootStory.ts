import { IStoryOption } from "./storyOption"

export interface IRootStory {
    image_desktop: string,
    image_mobile: string,
    text: string,
    optionA: IStoryOption,
    optionB: IStoryOption
}