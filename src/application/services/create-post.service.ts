import { PostText } from '../../domain/entities/post/post-text.value';
import { PostTitle } from '../../domain/entities/post/post-title.value';
import { Post, PostProps } from '../../domain/entities/post/post.entity';
import { MemberRepoPort } from '../../domain/ports/data/member-repo.port';
import { PostRepoPort } from '../../domain/ports/data/post-repo.port';
import { Result } from '../../shared/core/result.base';
import { UniqueID } from '../../shared/unique-id.base';
import { CreatePostDTO } from '../dtos/post/create-post.dto';
import {
  CreatePostResponse,
  CreatePostUseCase,
} from '../use-cases/post/create-post.use-case';

export class CreatePostService implements CreatePostUseCase {
  constructor(
    private readonly _postRepo: PostRepoPort,
    private readonly _memberRepo: MemberRepoPort,
  ) {}

  async createPost(dto: CreatePostDTO): Promise<CreatePostResponse> {
    const postProps = {} as PostProps;

    try {
      const member = await this._memberRepo.getMemberByUserId(
        UniqueID.create(dto.userId),
      );
      postProps.memberId = member.id;
    } catch (error) {
      return Result.fail<Post>(error);
    }

    const titleResult = PostTitle.create(dto.title);
    if (titleResult.isFailure) {
      return Result.fail<Post>(titleResult.errorValue as Error);
    }
    postProps.postTitle = titleResult.value as PostTitle;

    const textResult = PostText.create(dto.text);
    if (textResult.isFailure) {
      return Result.fail<Post>(textResult.errorValue as Error);
    }
    postProps.postText = textResult.value as PostText;

    const postResult = Post.create(postProps);
    if (postResult.isFailure) {
      return Result.fail<Post>(postResult.errorValue as Error);
    }

    const post = postResult.value as Post;

    try {
      await this._postRepo.savePost(post);
    } catch (error) {
      return Result.fail<Post>(error);
    }

    return Result.ok<Post>(post);
  }
}
