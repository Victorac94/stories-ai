export interface IStoryOption {
    image_desktop: string,
    image_mobile: string,
    video_desktop?: string,
    video_mobile?: string,
    optionText: string,
    text: string,
    optionA?: IStoryOption,
    optionB?: IStoryOption
}