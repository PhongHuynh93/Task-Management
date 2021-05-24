import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}


  // getAllTasks() {
  //   return this.tasks;
  // }

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOne(id)
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    return found
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto) {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status == status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto)
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus) {
    const task = await this.getTaskById(id)
    task.status = status
    await task.save()
    return task
  }
}
