import { ValueObject } from '../../../shared/value-object.base';
import { Result } from '../../../shared/core/result.base';
import { Guard } from '../../../shared/core/guard.base';

interface CommentTextProps {
  text: string;
}

export class CommentText extends ValueObject {
  public static minLength = 2;
  public static maxLength = 500;

  constructor(private readonly _text: string) {
    super();
  }

  get value(): string {
    return this._text;
  }

  public static create(props: CommentTextProps): Result<CommentText> {
    const guardResult = Guard.inRange(
      props.text.length,
      this.minLength,
      this.maxLength,
      'props.text.length',
    );

    if (!guardResult.succeeded) {
      return Result.fail<CommentText>(new Error(guardResult.message));
    }

    return Result.ok<CommentText>(new CommentText(props.text));
  }
}
