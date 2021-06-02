import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from 'dist/tasks/dto/get-tasks-filter.dto';
import { TaskStatus } from 'dist/tasks/task-status.enum';
 
const mockTaskRepository = () => ({
    getTasks: jest.fn()
})

const mockUser = { id: 12, username: 'Test user' };

describe('TaskService', () => {
    let tasksService
    let taskRepository

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ]
        }).compile()

        tasksService = await module.get<TasksService>(TasksService)
        taskRepository = await module.get<TaskRepository>(TaskRepository)
    })

    describe('getTasks', () => {
        test('get all tasks from repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');

            expect(taskRepository.getTasks).not.toHaveBeenCalled()
            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' };
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        })
    })
})