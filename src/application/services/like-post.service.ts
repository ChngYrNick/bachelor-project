import { MemberRepoPort } from '../../domain/ports/data/member-repo.port';
import { PostRepoPort } from '../../domain/ports/data/post-repo.port';
import { PostVoteRepo } from '../../domain/ports/data/post-vote-repo.port';
import { BlogService } from '../../domain/services/blog.service';
import { Result } from '../../shared/core/result.base';
import { UniqueID } from '../../shared/unique-id.base';
import { LikePostDTO } from '../dtos/post/like-post.dto';
import {
  LikePostResponse,
  LikePostUseCase,
} from '../use-cases/post/like-post.use-case';

export class LikePostService implements LikePostUseCase {
  constructor(
    private readonly _postRepo: PostRepoPort,
    private readonly _memberRepo: MemberRepoPort,
    private readonly _postVoteRepo: PostVoteRepo,
    private readonly _blogService: BlogService,
  ) {}

  async likePost(dto: LikePostDTO): Promise<LikePostResponse> {
    try {
      const member = await this._memberRepo.getMemberByUserId(
        UniqueID.create(dto.userId),
      );

      const post = await this._postRepo.getPostById(
        UniqueID.create(dto.postId),
      );

      const postVotesByMember = await this._postVoteRepo.getPostVotesByMemberId(
        post.id,
        member.id,
      );

      const likePostResult = this._blogService.likePost(
        post,
        member,
        postVotesByMember,
      );

      if (likePostResult.isFailure) {
        return Result.fail<void>(likePostResult.errorValue as Error);
      }

      await this._postRepo.savePost(post);

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(error);
    }
  }
}
