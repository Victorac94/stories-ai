export interface IStoryOption {
    image_desktop: string,
    image_mobile: string,
    optionText: string,
    text: string,
    optionA?: IStoryOption,
    optionB?: IStoryOption
}