## Getting Started

First, run the development server:

```bash
npm install

npm run dev
```

App will be running on [http://localhost:3001](http://localhost:3001).

## Overview

# /configs
- Database configuration
- Swagger configuration (not in use)

# /controllers
- Thin layer calling service method
- Don't really need this if there are routers, either one is sufficient

# /decorators
- Custom decorators

# /dtos
- Data transfer object definitions, used by validation middleware

# /middlewares
- Auth: Checks JWT/Session for requests
- Error: Global error handler
- Validation: Handles validation for incoming DTOs in requests

# /models
- Defines models using Sequelize ORM

# /routes
- Routing for requests

# /services
- Business logic, called by Controllers

# /utils
- Defines types used in this application
- Helper functions