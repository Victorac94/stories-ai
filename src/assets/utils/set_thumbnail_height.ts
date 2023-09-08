/**
   * Set width and height of thumbnailContainer to same value of genreName's width (making thumbnailContainer a square)
*/
export const setThumbnailHeight = (thumbnailTitle: HTMLElement, thumbnailContainer: HTMLElement, renderer: any) => {
    const genreNameClientRect = thumbnailTitle.getBoundingClientRect();

    renderer.setStyle(thumbnailContainer, 'height', genreNameClientRect.width + 'px');
    renderer.setStyle(thumbnailContainer, 'width', genreNameClientRect.width + 'px');
}