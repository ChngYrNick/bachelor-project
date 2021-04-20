import { ValueObject } from '../../../shared/value-object.base';
import { Result } from '../../../shared/core/result.base';

interface PostTextProps {
  text: string;
}

export class PostText extends ValueObject {
  constructor(private readonly _text: string) {
    super();
  }

  get value(): string {
    return this._text;
  }

  public static create(props: PostTextProps): Result<PostText> {
    return Result.ok<PostText>(new PostText(props.text));
  }
}
