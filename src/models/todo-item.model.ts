import {Entity, model, property} from '@loopback/repository';

@model()
export class TodoItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  priority: number;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;


  constructor(data?: Partial<TodoItem>) {
    super(data);
  }
}

export interface TodoItemRelations {
  // describe navigational properties here
}

export type TodoItemWithRelations = TodoItem & TodoItemRelations;
