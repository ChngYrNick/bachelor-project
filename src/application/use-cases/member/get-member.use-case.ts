import { Post } from '../../../domain/entities/post/post.entity';
import { Result } from '../../../shared/core/result.base';
import { GetMemberDTO } from '../../dtos/member/get-member.dto';

export type GetMemberResponse = Result<Post>;

export interface GetMemberUseCase {
  getMember(dto: GetMemberDTO): Promise<GetMemberResponse>;
}
