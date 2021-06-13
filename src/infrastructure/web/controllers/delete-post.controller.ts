import { Request, Response } from 'express';
import { DeletePostDTO } from '../../../application/dtos/post/delete-post.dto';
import { DeletePostUseCase } from '../../../application/use-cases/post/delete-post.use-case';

export class DeletePostController {
  constructor(private readonly _deletePostService: DeletePostUseCase) {}

  async deletePost(req: Request, res: Response): Promise<void> {
    const dto: DeletePostDTO = {
      postId: req.body.postId,
    };

    const response = await this._deletePostService.deletePost(dto);

    if (response.isFailure) {
      throw response.errorValue;
    }

    res.status(200);
  }
}
