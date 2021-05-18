import { Injectable, Post } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id: string) {
        return this.tasks.find(task => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    deleteTask(id: string) {
        const index = this.tasks.findIndex(task => task.id === id)
        console.log('index', index)
        if (index !== -1) {
            this.tasks.splice(index, 1)
        }
    }
}
