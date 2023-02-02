import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/comment-create.dto';
import { User } from 'src/user/decorator/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UpdateCommentsDto } from './dto/comment-update.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  createComment(
    @Body() createCommentsDto: CreateCommentsDto,
    @User('id') currentUserId: number,
  ) {
    return this.commentService.createComment(createCommentsDto, currentUserId);
  }

  @Get(':slug')
  getCommentBySlug(@Param('slug') workSlug: string) {
    return this.commentService.getComment(workSlug);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  updateComment(
    @Body() updateCommentDto: UpdateCommentsDto,
    @Param('id') commentId: number,
  ) {
    return this.commentService.updateComment(updateCommentDto, commentId);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  deleteComment(@Param('id') commentId: number) {
    return this.commentService.deleteComment(commentId);
  }
}
