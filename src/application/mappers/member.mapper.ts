import { Member } from '../../domain/entities/member/member.entity';
import { MemberDTO } from '../dtos/member/member.dto';
import { Mapper } from '../../shared/mapper.base';
import { UniqueID } from '../../shared/unique-id.base';
import { UserName } from '../../domain/entities/member/username.value';
import { FirstName } from '../../domain/entities/member/first-name.value';
import { LastName } from '../../domain/entities/member/last-name.value';
import { Email } from '../../domain/entities/member/email.value';

export class MemberMapper implements Mapper<MemberDTO, Member> {
	public toDomain(dto: MemberDTO): Member {
		return Member.create({
			memberId: UniqueID.create(dto.memberId),
			username: UserName.create(dto.username).value as UserName,
			firstName: FirstName.create(dto.firstName).value as FirstName,
			lastName: LastName.create(dto.lastName).value as LastName,
			email: Email.create(dto.email).value as Email
		}).value as Member;
	}

	public toPersistence(domain: Member): MemberDTO {
		return {
			memberId: domain.id.value,
			username: domain.username.value,
			firstName: domain.firstName.value,
			lastName: domain.lastName.value,
			email: domain.email.value
		};
	}
}
