# Todo List App - React Frontend Integration

## Part 2: Frontend Development with React and API Integration

This is the frontend implementation for the Todo List application, built with React and integrated with the Node.js/Express backend.

### Project Overview

The frontend provides a user-friendly interface for managing todos with seamless integration to the backend APIs. Users can create, read, update, delete, and filter todos in real-time.

### Technology Stack

- **Frontend Framework**: React 18
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: CSS3 with responsive design
- **State Management**: React Hooks (useState, useEffect)

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TodoForm.jsx      # Form for creating todos
│   │   ├── TodoItem.jsx      # Individual todo display
│   │   ├── TodoList.jsx      # List container
│   │   ├── Filters.jsx       # Filter and search controls
│   │   └── EditModal.jsx     # Modal for editing todos
│   ├── services/
│   │   └── todoAPI.js        # API calls wrapper
│   ├── hooks/
│   │   └── useTodos.js       # Custom hook for todo management
│   ├── styles/
│   │   ├── App.css           # Main app styles
│   │   ├── TodoForm.css      # Form component styles
│   │   ├── TodoItem.css      # Todo item styles
│   │   ├── TodoList.css      # List styles
│   │   ├── Filters.css       # Filter styles
│   │   └── EditModal.css     # Modal styles
│   ├── App.jsx               # Main app component
│   ├── index.jsx             # React entry point
│   └── App.css               # Global styles
├── index.html                # HTML entry point
├── public/
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies
├── .env                      # Environment variables
└── .gitignore                # Git ignore rules
```

### Setup Instructions

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

#### Installation Steps

1. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Update or create `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   
   For production:
   ```
   VITE_API_URL=https://yourdomain.com/api
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

5. **Build for Production**
   ```bash
   npm run build
   ```
   
   Output will be in `dist/` directory

### Features

#### 1. Create Todos
- Add new todos with title, description, priority, and due date
- Real-time form validation
- Error message display
- Success feedback

#### 2. View Todos
- Display all todos in a list
- Visual status indicators
- Priority badges with color coding
- Due date and creation date display
- Responsive layout

#### 3. Update Todos
- Inline status updates via dropdown
- Edit full todo details in a modal
- Update title, description, priority, and due date
- Real-time UI refresh

#### 4. Delete Todos
- Delete confirmation dialog
- Immediate UI update after deletion
- Error handling

#### 5. Filter & Search
- Filter by status (Pending, In Progress, Completed)
- Filter by priority (Low, Medium, High)
- Full-text search in title and description
- Reset filters functionality
- Real-time filtering

#### 6. User Feedback
- Loading indicators during API calls
- Error messages for failed operations
- Success confirmations
- Responsive alerts

### Component Documentation

#### TodoForm Component
Handles todo creation with form validation.

**Props**:
- `onAddTodo` (function): Callback to create todo
- `loading` (boolean): Loading state

**Features**:
- Required field validation
- Optional description textarea
- Priority selector
- Due date picker
- Submit button with loading state

#### TodoItem Component
Displays individual todo with actions.

**Props**:
- `todo` (object): Todo data
- `onStatusChange` (function): Status update callback
- `onDelete` (function): Delete callback
- `onEdit` (function): Edit callback

**Features**:
- Status-based styling
- Priority badge with color coding
- Date formatting
- Action buttons (Edit, Delete, Status)
- Completion visual indicator

#### TodoList Component
Container for displaying all todos.

**Props**:
- `todos` (array): List of todos
- `onStatusChange` (function): Status update callback
- `onDelete` (function): Delete callback
- `onEdit` (function): Edit callback
- `loading` (boolean): Loading state
- `error` (string): Error message

**Features**:
- Empty state message
- Loading animation
- Error display
- Todo count

#### Filters Component
Search and filter controls.

**Props**:
- `onFilterChange` (function): Filter update callback
- `onSearch` (function): Search callback
- `currentFilters` (object): Current filter values

**Features**:
- Status filter dropdown
- Priority filter dropdown
- Search input with debouncing
- Reset button

#### EditModal Component
Modal dialog for editing todos.

**Props**:
- `todo` (object): Todo to edit
- `onSave` (function): Save callback
- `onCancel` (function): Cancel callback
- `loading` (boolean): Loading state

**Features**:
- Modal overlay with click-outside dismiss
- Form fields matching create form
- Cancel and save buttons
- Validation feedback

### API Integration

#### TodoAPI Service

The `todoAPI` object provides methods for all backend operations:

```javascript
// Get all todos with optional filters
todoAPI.getAllTodos({ status: 'pending', search: 'project' })

// Get single todo
todoAPI.getTodoById(id)

// Create new todo
todoAPI.createTodo({ title: '...', priority: '...' })

// Update todo
todoAPI.updateTodo(id, { title: '...' })

// Delete todo
todoAPI.deleteTodo(id)

// Update status only
todoAPI.updateStatus(id, 'in-progress')
```

#### Axios Configuration

Base configuration in `services/todoAPI.js`:
- Base URL from environment variable
- 10-second timeout
- Automatic Content-Type headers

### Styling

#### Color Scheme
- **Primary**: #667eea to #764ba2 (gradient)
- **Success**: #4caf50 (green)
- **Warning**: #ff9800 (orange)
- **Error**: #f44336 (red)
- **Info**: #2196f3 (blue)

#### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

#### CSS Features Used
- CSS Grid for layouts
- Flexbox for component layouts
- CSS animations for loading states
- Box shadows for depth
- Gradient backgrounds

### State Management

#### App State
```javascript
{
  todos: [],           // Array of todo objects
  loading: false,      // API call loading state
  error: null,         // Error message
  filters: {
    status: '',        // Filter value
    priority: '',      // Filter value
    search: ''         // Search term
  },
  editingTodo: null,   // Currently editing todo
  isModalOpen: false   // Modal visibility
}
```

### Error Handling

#### Error Types
1. **Network Errors**: Display error banner
2. **Validation Errors**: Show inline error messages
3. **Server Errors**: Display error with HTTP status
4. **Not Found**: Handle 404 responses gracefully

#### User Feedback Strategy
- Error banner at top of page
- Form validation messages
- Loading indicators during operations
- Success confirmations for create/update/delete

### Performance Optimizations

1. **Lazy Loading**: Components load on demand
2. **Event Debouncing**: Search input debouncing
3. **Conditional Rendering**: Skip rendering when data loading
4. **CSS Optimization**: Minified CSS in production build
5. **API Caching**: Avoid redundant API calls

### Testing the Frontend

#### Manual Testing

1. **Create Todo**:
   - Fill form with valid data
   - Verify success message
   - Verify todo appears in list

2. **Update Todo**:
   - Click Edit button
   - Modify details
   - Verify changes in list

3. **Filter Todos**:
   - Select status filter
   - Verify list updates
   - Try multiple filters combined

4. **Search**:
   - Type in search box
   - Verify matching todos display
   - Test with partial words

5. **Error Scenarios**:
   - Try creating empty title
   - Delete with confirmation
   - Disconnect backend and test errors

### Deployment

#### Build for Production
```bash
npm run build
```

#### Deploy Options

**GitHub Pages**:
1. Push the repository to GitHub and set Pages to use **GitHub Actions**.
2. Add the Actions repository variable `VITE_API_URL` with the deployed backend API URL.
3. Run the **Deploy frontend to GitHub Pages** workflow.
4. The frontend is published at `https://prateek2302.github.io/prateekjain_task33/`.

GitHub Pages serves only the frontend. Deploy the Express/MongoDB backend separately before setting `VITE_API_URL`; otherwise the app will try `http://localhost:5000/api`.

**Netlify**:
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable `VITE_API_URL`

**Vercel**:
1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Auto-deployed on every push

**Manual Deployment**:
1. Build: `npm run build`
2. Upload `dist/` folder contents to static hosting
3. Configure environment for API URL

### Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| VITE_API_URL | Backend API base URL | http://localhost:5000/api |

### Troubleshooting

**Issue**: CORS errors in console
- **Solution**: Ensure backend is running and CORS is enabled
- **Check**: Backend .env has correct PORT
- **Fix**: Update VITE_API_URL in .env

**Issue**: "Cannot GET /" on page refresh
- **Solution**: Configure Vite to handle SPA routing
- **Status**: Already configured in vite.config.js

**Issue**: Styles not loading
- **Solution**: CSS files must be imported in components
- **Check**: Verify import paths are correct

**Issue**: API calls not working
- **Solution**: Check Network tab in DevTools
- **Verify**: Backend URL in .env
- **Test**: Try health check endpoint

### Best Practices Implemented

1. **Component Organization**: Separation by functionality
2. **Reusable Components**: TodoItem, TodoForm designed for reusability
3. **Error Boundaries**: Try-catch in API calls
4. **Loading States**: User feedback during operations
5. **Accessibility**: Semantic HTML, proper labels
6. **Responsive Design**: Works on all screen sizes
7. **Performance**: Optimized re-renders and API calls

### Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Future Enhancements

- [ ] User authentication and login
- [ ] Local storage for offline support
- [ ] Drag and drop for reordering
- [ ] Recurring todos
- [ ] Notifications and reminders
- [ ] Dark mode toggle
- [ ] Todo categories/tags
- [ ] Collaborative sharing
- [ ] Mobile app version
- [ ] Export todos (PDF, CSV)

### Performance Metrics

- Page Load: < 2 seconds
- API Response: < 500ms
- Component Render: < 100ms
- Mobile Friendly: Fully responsive

### License

MIT License

### Support

For issues:
1. Check browser console for errors
2. Verify backend is running
3. Check environment variables
4. Review error messages in app
5. Test API endpoints with Postman

### Challenges Faced and Solutions

1. **API Communication Issues**
   - Solution: Implemented proper error handling and retry logic in API service

2. **State Synchronization**
   - Solution: Used React hooks to manage local state and sync with server state

3. **Real-time Updates**
   - Solution: Refresh list after every operation

4. **Responsive Design**
   - Solution: Used CSS Grid and Flexbox with media queries

5. **Loading States**
   - Solution: Maintained loading flag to prevent multiple simultaneous requests
