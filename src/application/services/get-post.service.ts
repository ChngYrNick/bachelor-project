import { Post } from '../../domain/entities/post/post.entity';
import { PostRepoPort } from '../../domain/ports/data/post-repo.port';
import { Result } from '../../shared/core/result.base';
import { UniqueID } from '../../shared/unique-id.base';
import { GetPostDTO } from '../dtos/post/get-post.dto';
import {
  GetPostResponse,
  GetPostUseCase,
} from '../use-cases/post/get-post.use-case';

export class GetPostService implements GetPostUseCase {
  constructor(private readonly _postRepo: PostRepoPort) {}

  async getPost(dto: GetPostDTO): Promise<GetPostResponse> {
    try {
      const post = await this._postRepo.getPostById(
        UniqueID.create(dto.postId),
      );
      return Result.ok<Post>(post);
    } catch (error) {
      return Result.fail<Post>(error);
    }
  }
}
