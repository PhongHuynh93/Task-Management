import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
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
    const found = this.taskRepository.findOne(id)
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

  createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto)
  }

  // deleteTask(id: string) {
  //   const found = this.getTaskById(id)
  //   const index = this.tasks.findIndex((task) => task.id === found.id);
  //   this.tasks.splice(index, 1);
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
