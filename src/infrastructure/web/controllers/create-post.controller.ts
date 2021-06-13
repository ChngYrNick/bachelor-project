import { Request, Response } from 'express';
import { CreatePostDTO } from '../../../application/dtos/post/create-post.dto';
import { CreatePostUseCase } from '../../../application/use-cases/post/create-post.use-case';

export class CreatePostController {
  constructor(private readonly _createPostService: CreatePostUseCase) {}

  async createPost(req: Request, res: Response): Promise<void> {
    const dto: CreatePostDTO = {
      memberId: req.body.memberId,
      title: req.body.title,
      text: req.body.text,
    };

    const response = await this._createPostService.createPost(dto);

    if (response.isFailure) {
      throw response.errorValue;
    }

    res.status(200);
  }
}
