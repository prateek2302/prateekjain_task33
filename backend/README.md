# Todo List App - MongoDB Backend Implementation

## Part 1: Backend API Development with Node.js, Express, and MongoDB

This is the backend implementation for a fully functional Todo List application built using Node.js, Express.js, and MongoDB.

### Project Overview

The backend provides RESTful APIs for managing todos with the following features:
- Create new todos
- Retrieve all todos with filtering capabilities
- Get individual todo details
- Update todo information and status
- Delete todos
- Search functionality
- Filter by status and priority

### Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Additional Libraries**:
  - `mongoose`: MongoDB object modeling
  - `cors`: Cross-Origin Resource Sharing
  - `dotenv`: Environment variable management

### Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── models/
│   └── Todo.js            # Mongoose Todo schema
├── controllers/
│   └── TodoController.js  # Route handlers
├── services/
│   └── TodoService.js     # Business logic layer
├── routes/
│   └── todoRoutes.js      # API endpoints definition
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
└── .gitignore             # Git ignore rules
```

### Setup Instructions

#### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

#### Installation Steps

1. **Clone or Extract the Repository**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create or update the `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todoapp
   NODE_ENV=development
   ```
   
   For MongoDB Atlas (cloud):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
   ```

4. **Start the Server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   The server will start on `http://localhost:5000`

### API Endpoints

#### Base URL
```
http://localhost:5000/api
```

#### 1. Get All Todos
- **Endpoint**: `GET /todos`
- **Query Parameters**:
  - `status`: Filter by status (pending, in-progress, completed)
  - `priority`: Filter by priority (low, medium, high)
  - `search`: Search in title and description
- **Example**: `GET /todos?status=pending&priority=high`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Todos retrieved successfully",
    "data": [
      {
        "_id": "...",
        "title": "Complete project",
        "description": "...",
        "status": "pending",
        "priority": "high",
        "dueDate": "2026-10-20",
        "createdAt": "2026-10-10T...",
        "updatedAt": "2026-10-10T..."
      }
    ]
  }
  ```

#### 2. Get Todo by ID
- **Endpoint**: `GET /todos/:id`
- **Example**: `GET /todos/65f1a2b3c4d5e6f7g8h9i0j1`
- **Response**: Single todo object

#### 3. Create New Todo
- **Endpoint**: `POST /todos`
- **Request Body**:
  ```json
  {
    "title": "Complete project",
    "description": "Finish the todo list app",
    "priority": "high",
    "dueDate": "2026-10-20"
  }
  ```
- **Response**: Created todo object with generated ID

#### 4. Update Todo
- **Endpoint**: `PUT /todos/:id`
- **Request Body**: Same as create (any or all fields can be updated)
- **Response**: Updated todo object

#### 5. Delete Todo
- **Endpoint**: `DELETE /todos/:id`
- **Response**: Confirmation message

#### 6. Update Todo Status
- **Endpoint**: `PATCH /todos/:id/status`
- **Request Body**:
  ```json
  {
    "status": "in-progress"
  }
  ```
- **Valid Status Values**: `pending`, `in-progress`, `completed`
- **Response**: Updated todo object

#### 7. Health Check
- **Endpoint**: `GET /api/health`
- **Response**: `{ "success": true, "message": "Server is running" }`

### Data Schema

#### Todo Schema

| Field | Type | Required | Default | Enum |
|-------|------|----------|---------|------|
| title | String | Yes | - | - |
| description | String | No | '' | - |
| status | String | No | 'pending' | pending, in-progress, completed |
| priority | String | No | 'medium' | low, medium, high |
| dueDate | Date | No | null | - |
| createdAt | Date | No | now | - |
| updatedAt | Date | No | now | - |

### Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes:

- **400 Bad Request**: Invalid input or validation errors
- **404 Not Found**: Todo not found
- **500 Internal Server Error**: Server-side errors

**Error Response Format**:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Input Validation

- **Title**: Required, must not be empty
- **Status**: Must be one of: pending, in-progress, completed
- **Priority**: Must be one of: low, medium, high
- **ID Format**: Must be a valid MongoDB ObjectId

### CORS Configuration

The backend is configured to accept requests from any origin. For production, update the CORS configuration in `index.js`:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### Testing the API

#### Using Postman

1. Import the collection or create requests manually
2. Set base URL to `http://localhost:5000/api`
3. Test each endpoint as documented above

#### Using cURL

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","priority":"high"}'

# Update status
curl -X PATCH http://localhost:5000/api/todos/<id>/status \
  -H "Content-Type: application/json" \
  -d '{"status":"in-progress"}'
```

### Development Notes

#### Best Practices Implemented

1. **Modular Architecture**: Separation of concerns with Controllers, Services, and Models
2. **Error Handling**: Try-catch blocks and validation at every level
3. **Asynchronous Programming**: Async/await for database operations
4. **Environment Management**: Sensitive data stored in .env file
5. **RESTful Design**: Proper use of HTTP methods and status codes

#### Challenges Faced and Solutions

1. **MongoDB Connection Issues**
   - Solution: Implemented connection retry logic and proper error messages

2. **Validation Errors**
   - Solution: Added comprehensive input validation at controller and service layers

3. **Concurrent Updates**
   - Solution: Used MongoDB's atomic operations and findByIdAndUpdate

### Deployment Considerations

For production deployment (e.g., on Render):

1. Update MongoDB URI to use Atlas or managed MongoDB service
2. Set NODE_ENV to 'production'
3. Use environment-specific configurations
4. Implement rate limiting and request validation
5. Add comprehensive logging
6. Use HTTPS only

### Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | Database connection string | mongodb://localhost:27017/todoapp |
| NODE_ENV | Environment mode | development/production |

### Troubleshooting

**Issue**: MongoDB connection error
- **Solution**: Ensure MongoDB is running locally or provide correct Atlas connection string

**Issue**: Port already in use
- **Solution**: Change PORT in .env or kill process using port 5000

**Issue**: CORS errors
- **Solution**: Frontend URL should match CORS configuration

### Future Enhancements

- [ ] User authentication and authorization
- [ ] Pagination support
- [ ] Advanced filtering and sorting
- [ ] File upload support
- [ ] WebSocket for real-time updates
- [ ] Rate limiting
- [ ] Request logging and monitoring
- [ ] API versioning

### License

MIT License

### Support

For issues or questions, please check the error messages carefully and review the troubleshooting section above.
