// In-memory data store for microservice tasks
let tasks = [
  {
    id: 1,
    title: 'Design Microservice Architecture',
    description: 'Create C4 Model diagrams for DLBSEPPSD01_E Software Development task',
    status: 'COMPLETED',
    priority: 'HIGH',
    createdAt: new Date('2026-10-20T10:00:00Z').toISOString()
  },
  {
    id: 2,
    title: 'Containerize Application',
    description: 'Build Dockerfile and docker-compose.yml for backend microservice',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    createdAt: new Date('2026-10-22T14:30:00Z').toISOString()
  }
];

let nextId = 3;

// GET /api/v1/tasks
exports.getAllTasks = (req, res) => {
  const { status, priority } = req.query;
  let filtered = [...tasks];

  if (status) {
    filtered = filtered.filter(t => t.status.toUpperCase() === status.toUpperCase());
  }

  if (priority) {
    filtered = filtered.filter(t => t.priority.toUpperCase() === priority.toUpperCase());
  }

  return res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

// GET /api/v1/tasks/:id
exports.getTaskById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with ID ${id} not found`
    });
  }

  return res.status(200).json({
    success: true,
    data: task
  });
};

// POST /api/v1/tasks
exports.createTask = (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Task title is required'
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    status: 'PENDING',
    priority: priority ? priority.toUpperCase() : 'MEDIUM',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  return res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: newTask
  });
};

// PUT /api/v1/tasks/:id
exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with ID ${id} not found`
    });
  }

  const { title, description, status, priority } = req.body;

  if (title !== undefined) tasks[taskIndex].title = title.trim();
  if (description !== undefined) tasks[taskIndex].description = description.trim();
  if (status !== undefined) tasks[taskIndex].status = status.toUpperCase();
  if (priority !== undefined) tasks[taskIndex].priority = priority.toUpperCase();

  return res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: tasks[taskIndex]
  });
};

// DELETE /api/v1/tasks/:id
exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with ID ${id} not found`
    });
  }

  const deleted = tasks.splice(taskIndex, 1)[0];

  return res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: deleted
  });
};

// Helper for test resets
exports.resetStore = () => {
  tasks = [
    {
      id: 1,
      title: 'Design Microservice Architecture',
      description: 'Create C4 Model diagrams for DLBSEPPSD01_E Software Development task',
      status: 'COMPLETED',
      priority: 'HIGH',
      createdAt: new Date('2026-10-20T10:00:00Z').toISOString()
    },
    {
      id: 2,
      title: 'Containerize Application',
      description: 'Build Dockerfile and docker-compose.yml for backend microservice',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      createdAt: new Date('2026-10-22T14:30:00Z').toISOString()
    }
  ];
  nextId = 3;
};
