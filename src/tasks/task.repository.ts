import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: GetTasksFilterDto) {
        const { status, search } = filterDto;
        let query = this.createQueryBuilder('task')

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
        }

        const tasks = await query.getMany()
        return tasks
    }

    async createTask(createTaskDto: CreateTaskDto, user: User) {
        const { title, description } = createTaskDto;

        const task = new Task()
        task.title = title
        task.description = description
        task.user = user

        task.status = TaskStatus.OPEN

        await task.save()
        
        delete task.user

        return task
    }
}