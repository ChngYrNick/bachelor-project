import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';
import { ValueObject } from '../../../shared/value-object.base';

interface LastNameProps {
  name: string;
}

export class LastName extends ValueObject {
  public static maxLength = 15;
  public static minLength = 2;

  private constructor(private readonly _value: string) {
    super();
  }

  get value(): string {
    return this._value;
  }

  public static create(props: LastNameProps): Result<LastName> {
    const usernameResult = Guard.againstNullOrUndefined(props.name, 'username');
    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);

    if (!usernameResult.succeeded) {
      return Result.fail<LastName>(new Error(usernameResult.message));
    }

    if (!minLengthResult.succeeded) {
      return Result.fail<LastName>(new Error(minLengthResult.message));
    }

    if (!maxLengthResult.succeeded) {
      return Result.fail<LastName>(new Error(maxLengthResult.message));
    }

    return Result.ok<LastName>(new LastName(props.name));
  }
}
