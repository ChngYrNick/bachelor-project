import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { ValueObject } from '../../../shared/value-object.base';
import { ValidEmailSpec } from '../../specifications/valid-email.spec';

interface EmailProps {
  email: string;
}

export class Email extends ValueObject {
  private constructor(private readonly _value: string) {
    super();
  }

  get value(): string {
    return this._value;
  }

  public static create(props: EmailProps): Result<Email> {
    const guardResult = Guard.againstNullOrUndefined(props.email, 'email');

    if (!guardResult.succeeded) {
      return Result.fail<Email>(new Error(guardResult.message));
    }

    const validEmailSpec = new ValidEmailSpec();

    const email = new Email(props.email);

    if (!validEmailSpec.isSatisfiedBy(email)) {
      return Result.fail<Email>(new Error('Email is not valid'));
    }

    return Result.ok<Email>(email);
  }
}
