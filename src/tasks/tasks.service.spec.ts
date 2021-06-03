import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
 
const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
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

    describe('getTaskById', () => {
        const mockTask = {
            id: 1,
            title: 'hello',
            description: 'des',
            status: TaskStatus.IN_PROGRESS,
            userId: 2
        }
        test('test get task by id successfully', async () => {
            taskRepository.findOne.mockResolvedValue(mockTask)
            const found = await tasksService.getTaskById(1, mockUser)
            expect(taskRepository.findOne).toHaveBeenCalledWith(
                { where: { id: 1, userId: mockUser.id } }
            )
            expect(found).toEqual(mockTask);

        })
        test('test get task by id failed', () => {
            taskRepository.findOne.mockResolvedValue(null)
            expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow()
        })
    })
})