class CommentPostRequest {
  constructor(userId, text, imageId, postId) {
    this.userId = userId;
    this.text = text;
    this.imageId = imageId;
    this.postId = postId;
  }
}
export default CommentPostRequest;