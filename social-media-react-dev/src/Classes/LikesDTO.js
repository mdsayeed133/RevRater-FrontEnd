class LikesDTO {
  constructor(postId, userId) {
    this.postId = postId;
    this.userId = userId;
  }
  
  getPostId() {
    return this.postId;
  }
  
  getUserId() {
    return this.userId;
  }
  
  setPostId(postId) {
    this.postId = postId;
  }
  
  setUserId(userId) {
    this.userId = userId;
  }
}
export default LikesDTO;