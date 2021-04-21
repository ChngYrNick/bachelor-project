export interface EditPostDTO {
  userId: string;
	postId: string;
  title: string;
  text: string;
	hashtags: Array<string>;
}
