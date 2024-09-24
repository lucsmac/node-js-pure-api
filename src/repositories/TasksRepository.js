import { randomUUID } from 'node:crypto'
import { db } from "../lib/Database.js"

export class TasksRepository {
  list(req, res) {
    const tasks = db.select('tasks')

    res
      .writeHead(200)
      .end(JSON.stringify(tasks))
  }
  
  create(req, res) {
    const task = {
      id: randomUUID(),
      title: req.body.title,
      description: req.body.description,
      completed_at: req.body.completed_at,
      created_at: new Date().toISOString(),
      updated_at: null,
    }
    
    db.insert('tasks', task)
  
    res
      .writeHead(204)
      .end()
  }

  modify(req, res) {
    const taskId = req.params.id

    const searchTaskResult = db.select('tasks', {
      id: taskId
    })

    if (searchTaskResult.length === 0) res.writeHead(404).end()

    const savedTask = searchTaskResult[0]
    
    db.update('tasks', taskId, {
      ...savedTask,
      ...req.body,
      updated_at: new Date().toISOString()
    })

    res
      .writeHead(200)
      .end()
  }

  update(req, res) {
    const taskId = req.params.id

    const searchTaskResult = db.select('tasks', {
      id: taskId
    })

    if (searchTaskResult.length === 0) res.writeHead(404).end()

    const savedTask = searchTaskResult[0]
    
    db.update('tasks', taskId, {
      ...req.body,
      id: savedTask.id,
      created_at: savedTask.created_at,
      updated_at: new Date().toISOString()
    })

    res
      .writeHead(200)
      .end()
  }

  delete(req, res) {
    const taskId = req.params.id 
    db.delete('tasks', taskId)

    res
      .writeHead(204)
      .end()
  }
}
