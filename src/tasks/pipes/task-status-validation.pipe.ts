import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase()
        if (this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is not supported`)
        }
        return value
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status)
        return index !== 1
    }
}