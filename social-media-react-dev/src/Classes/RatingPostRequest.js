class RatingPostRequest {
  constructor(userId, text, imageId, ratingDTO) {
    this.userId = userId;
    this.text = text;
    this.imageId = imageId;
    this.ratingDTO = ratingDTO;
  }
}
export default RatingPostRequest; 