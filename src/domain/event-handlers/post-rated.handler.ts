import { DomainEvent } from '../../shared/event/domain-event.interface';
import { DomainEvents } from '../../shared/event/domain-events.base';
import { Handler } from '../../shared/event/handler.interface';
import { Member } from '../entities/member/member.entity';
import { PostRated } from '../events/post-rated.event';
import { MemberRepoPort } from '../ports/data/member-repo.port';
import { EmailServicePort } from '../ports/email-service.port';

export class PostRatedHandler implements Handler {
  constructor(
    private readonly _emailService: EmailServicePort,
    private readonly _memberRepo: MemberRepoPort,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.handle.bind(this) as (event: DomainEvent) => Promise<void>,
      PostRated.name,
    );
  }

  async handle(event: PostRated): Promise<void> {
    const member: Member = await this._memberRepo.getMemberById(
      event.postVote.memberId,
    );

    this._emailService.sendEmail(
      member.email.value,
      `Member ${member.fullName} rated your post.`,
    );
  }
}
