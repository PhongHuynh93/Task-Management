import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }

  async getTaskById(id: number, user: User) {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } })
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    return found
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User) {
    return this.taskRepository.getTasks(filterDto, user)
  }

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    return this.taskRepository.createTask(createTaskDto, user)
  }

  async deleteTask(id: number, user: User) {
    const result = await this.taskRepository.delete({ id, userId: user.id })
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User) {
    const task = await this.getTaskById(id, user)
    task.status = status
    await task.save()
    return task
  }
}
