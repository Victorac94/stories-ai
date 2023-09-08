/**
   * Set thumbnail wrapper width and height to those of thumbnail image
*/
export const setThumbnailWrapperDimensions = (thumbnailContainer: HTMLElement, thumbnailWrapper: HTMLElement, renderer: any, isDesktopVersion: boolean) => {
    let thumbnailHeight = 0;
    let thumbnailWidth = 0;

    // We need to get width from height and viceversa this way because on view initialization one of those properties is 0 (the one set to 'auto' on css) when we try to access it with the properties 'clientWidth' or 'clientHeight'
    if (isDesktopVersion) {
        thumbnailHeight = thumbnailContainer.clientHeight;
        thumbnailWidth = thumbnailHeight * 16 / 9; // Desktop version has thumbnails with 16:9 aspect ratio
    } else {
        thumbnailWidth = thumbnailContainer.clientWidth;
        thumbnailHeight = thumbnailWidth * 16 / 9; // Non desktop version has thumbnails with 9:16 aspect ratio
    }

    console.log(thumbnailHeight, thumbnailWidth);

    renderer.setStyle(thumbnailWrapper, 'width', thumbnailWidth + 'px');
    renderer.setStyle(thumbnailWrapper, 'height', thumbnailHeight + 'px');
}