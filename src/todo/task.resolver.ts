import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { CreateTaskInput } from './create-task.input';
import { UpdateTaskInput } from './update-task.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Query(() => Task)
  async task(@Args('id', { type: () => ID }) id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
    return this.taskService.create(input);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateTaskInput,
  ): Promise<Task> {
    return this.taskService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.taskService.delete(id);
  }
}
