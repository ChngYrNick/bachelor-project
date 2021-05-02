export interface CreatePostDTO {
  userId: string;
  title: string;
  text: string;
  hashtags: Array<string>;
}
