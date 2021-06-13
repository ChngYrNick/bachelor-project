import { PostRepoPort } from '../../domain/ports/data/post-repo.port';
import { Result } from '../../shared/core/result.base';
import { UniqueID } from '../../shared/unique-id.base';
import { DeletePostDTO } from '../dtos/post/delete-post.dto';
import {
  DeletePostResponse,
  DeletePostUseCase,
} from '../use-cases/post/delete-post.use-case';

export class DeletePostService implements DeletePostUseCase {
  constructor(private readonly _postRepo: PostRepoPort) {}

  async deletePost(dto: DeletePostDTO): Promise<DeletePostResponse> {
    try {
      await this._postRepo.deletePost(UniqueID.create(dto.postId));
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(error);
    }
  }
}
