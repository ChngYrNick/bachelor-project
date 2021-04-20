import { Post } from "../../../domain/entities/post/post.entity";
import { Result } from "../../../shared/core/result.base";

export type CreatePostResponse = Result<Post>;

export interface CreatePostUseCase {
	createPost(): Promise<CreatePostResponse>;
}
