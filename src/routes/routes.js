import { TasksRepository } from "../repositories/TasksRepository.js";
import { buildRoutePath } from "../utils/build-route-path.js";

const tasksRepository = new TasksRepository()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: tasksRepository.list
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: tasksRepository.create
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: tasksRepository.modify
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: tasksRepository.update
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: tasksRepository.delete,
  },
]
