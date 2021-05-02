import { Post } from '../../domain/entities/post/post.entity';
import { PostRepoPort } from '../../domain/ports/data/post-repo.port';
import { Result } from '../../shared/core/result.base';
import {
  GetAllPostsResponse,
  GetAllPostsUseCase,
} from '../use-cases/post/get-all-posts.use-case';

export class GetAllPostsService implements GetAllPostsUseCase {
  constructor(private readonly _postRepo: PostRepoPort) {}

  async getAllPosts(): Promise<GetAllPostsResponse> {
    try {
      const posts = await this._postRepo.getAllPosts();
      return Result.ok<Post[]>(posts as Post[]);
    } catch (error) {
      return Result.fail<Post[]>(error);
    }
  }
}
