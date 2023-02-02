import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentsDto } from './dto/comment-create.dto';
import { UpdateCommentsDto } from './dto/comment-update.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    createCommentsDto: CreateCommentsDto,
    currentUserId: number,
  ) {
    const comment = await this.prisma.comments.create({
      data: {
        ...createCommentsDto,
        userId: currentUserId,
      },
    });

    return comment;
  }

  async getComment(workSlug: string) {
    return await this.prisma.comments.findMany({
      where: { workSlug },
    });
  }

  async updateComment(updateCommentDto: UpdateCommentsDto, commentId: number) {
    const updateComment = await this.prisma.comments.update({
      where: { id: commentId },
      data: updateCommentDto,
    });

    updateComment.updatedAt = new Date();

    return await this.prisma.comments.update({
      where: { id: commentId },
      data: updateComment,
    });
  }

  async deleteComment(commentId: number) {
    return await this.prisma.comments.delete({
      where: { id: commentId },
    });
  }
}
