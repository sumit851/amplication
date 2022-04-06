import {
  generatePullRequestMessage,
  SendPullRequestArgs,
} from '@amplication/common';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
import { PullRequestService } from './pull-request.service';
import { plainToClass } from 'class-transformer';

@Controller()
export class PullRequestController {
  constructor(private readonly pullRequestService: PullRequestService) {}
  @MessagePattern(generatePullRequestMessage)
  async generatePullRequest({ value }: KafkaMessage) {
    const validArgs = plainToClass(SendPullRequestArgs, value);
    const pullRequest = await this.pullRequestService.createPullRequest(
      validArgs
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return pullRequest.files;
  }
}
