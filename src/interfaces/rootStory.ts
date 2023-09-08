import { IStoryOption } from "./storyOption"

export interface IRootStory {
    image_desktop: string,
    image_mobile: string,
    video_desktop?: string,
    video_mobile?: string,
    text: string,
    optionA: IStoryOption,
    optionB: IStoryOption
}