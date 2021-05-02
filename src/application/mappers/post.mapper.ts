import { Comments } from '../../domain/entities/comment/comments.list';
import { PostText } from '../../domain/entities/post/post-text.value';
import { PostTitle } from '../../domain/entities/post/post-title.value';
import { PostVotes } from '../../domain/entities/post/post-votes.list';
import { Post } from '../../domain/entities/post/post.entity';
import { Mapper } from '../../shared/mapper.base';
import { UniqueID } from '../../shared/unique-id.base';
import { PostDTO } from '../dtos/post/post.dto';
import { CommentMapper } from './comment.mapper';
import { PostVoteMapper } from './post-vote.mapper';

export class PostMapper implements Mapper<PostDTO, Post> {
  public toDomain(dto: PostDTO): Post {
    return Post.create({
      postId: UniqueID.create(dto.postId),
      memberId: UniqueID.create(dto.memberId),
      postTitle: PostTitle.create(dto.postTitle).value as PostTitle,
      postText: PostText.create(dto.postText).value as PostText,
      postLikes: PostVotes.create(
        dto.postLikes.map(new PostVoteMapper().toDomain),
      ),
      comments: Comments.create(dto.comments.map(new CommentMapper().toDomain)),
      datePosted: dto.datePosted,
      dateModified: dto.dateModified,
    }).value as Post;
  }

  public toPersistence(domain: Post): PostDTO {
    return {
      postId: domain.id.value,
      memberId: domain.memberId.value,
      postTitle: domain.title.value,
      postText: domain.text.value,
      postLikes: domain.likes
        .getItems()
        .map(new PostVoteMapper().toPersistence),
      comments: domain.comments
        .getItems()
        .map(new CommentMapper().toPersistence),
      datePosted: domain.datePosted,
      dateModified: domain.dateModified,
    };
  }
}
