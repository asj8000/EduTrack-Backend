import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskInput } from './create-task.input';
import { UpdateTaskInput } from './update-task.input';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(input: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.create(input);
    return this.taskRepository.save(task);
  }

  async update(id: string, input: UpdateTaskInput): Promise<Task> {
    await this.findOne(id); // Check if exists
    await this.taskRepository.update(id, input);
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
