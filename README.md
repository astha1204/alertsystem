# Visa Slot Alerts

A full-stack application for tracking visa appointment availability. Users can create alerts for specific visa slots, monitor their status, and manage appointments through a clean, paginated interface.

## ✨ Features

- **Alert Management**: Create, update, and delete visa appointment alerts
- **Multi-criteria Search**: Filter by country, city, and visa type
- **Status Tracking**: Monitor alert lifecycle (Active → Booked → Expired)
- **Pagination**: Browse alerts efficiently with 5 items per page
- **Real-time Updates**: Immediate UI feedback with comprehensive error handling
- **Responsive Design**: Clean, status-based visual styling

---

## 🚀 Quick Start

### Prerequisites

- Node.js v14 or higher
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd visa-alert
```

**2. Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
```

Start the server:
```bash
node server.js
```
✓ Backend running at `http://localhost:5000`

**3. Frontend Setup**

Open a new terminal:
```bash
cd frontend
npm install
npm start
```
✓ Frontend running at `http://localhost:3000`

---

## 📐 Architecture

### Tech Stack

**Frontend**
- React 18 with Hooks (useState, useEffect)
- Axios for API communication
- CSS3 for responsive styling

**Backend**
- Node.js + Express.js
- JSON file-based storage
- UUID for unique identifiers
- CORS-enabled REST API

### Data Model

```javascript
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  country: "Canada",
  city: "Toronto", 
  visaType: "Student",
  status: "Active",  // Active | Booked | Expired
  createdAt: "2026-02-01T10:30:00.000Z"
}
```

### Project Structure

```
visa-alert/
├── backend/
│   ├── server.js              # Application entry point
│   ├── package.json
│   ├── .env                   # Environment configuration
│   ├── data/
│   │   └── alerts.json        # Persistent storage
│   ├── middleware/
│   │   └── logger.js          # Request logging
│   ├── routes/
│   │   └── alerts.js          # CRUD operations
│   └── utils/
│       └── errorHandler.js    # Error handling
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main component
│   │   ├── App.css            # Styles
│   │   └── index.js           # React entry
│   ├── package.json
│   └── public/
└── README.md
```

---

## 🔌 API Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/alerts` | Fetch alerts with filtering |
| POST | `/alerts` | Create new alert |
| PUT | `/alerts/:id` | Update alert status |
| DELETE | `/alerts/:id` | Delete alert |

### GET /alerts

**Query Parameters**
```
page     (number)  - Page number (default: 1)
limit    (number)  - Items per page (default: 5)
country  (string)  - Filter by country
status   (string)  - Filter by status (Active|Booked|Expired)
```

**Response**
```json
{
  "total": 42,
  "page": 1,
  "limit": 5,
  "data": [
    {
      "id": "uuid",
      "country": "Canada",
      "city": "Toronto",
      "visaType": "Student",
      "status": "Active",
      "createdAt": "2026-02-01T10:30:00.000Z"
    }
  ]
}
```

### POST /alerts

**Request Body**
```json
{
  "country": "Canada",
  "city": "Toronto",
  "visaType": "Student"
}
```

### PUT /alerts/:id

**Request Body**
```json
{
  "status": "Booked"
}
```

---

## 🏗️ Design Decisions

### Why These Choices?

**Monorepo Structure**
- Separates concerns for independent deployment
- Enables parallel development of frontend/backend
- Simplifies version control

**JSON Storage**
- Zero-configuration persistence
- Perfect for prototyping and demos
- No database setup required
- Trade-off: Not suitable for production scale

**Server-side Pagination**
- Reduces client memory footprint
- Faster initial page loads
- Scalable to large datasets

**Functional React Components**
- Modern React best practices
- Hooks provide cleaner state management
- Easier to test and maintain

**Express Middleware Pattern**
- Modular request processing
- Centralized logging and error handling
- Easy to extend with authentication

---

## 🚧 Production Roadmap

### Critical Improvements

#### 1. Database Migration
**Current**: JSON file storage  
**Needed**: PostgreSQL or MongoDB
- Better concurrency and scalability
- ACID compliance for data integrity
- Advanced querying and indexing
- Relationship management

#### 2. Authentication & Authorization
**Current**: No user isolation  
**Needed**: JWT or OAuth2
- User-specific alert management
- Role-based access control
- Secure API endpoints

#### 3. Environment Management
**Current**: Hardcoded API URLs  
**Needed**: Environment-based configuration
```javascript
// frontend/.env.production
REACT_APP_API_URL=https://api.production.com

// frontend/.env.development  
REACT_APP_API_URL=http://localhost:5000
```

#### 4. Security Hardening
- Rate limiting (express-rate-limit)
- Input validation (Joi/Zod)
- SQL injection prevention
- HTTPS enforcement
- CORS whitelist
- Helmet.js for headers

#### 5. Testing Suite
```
├── backend/
│   └── tests/
│       ├── unit/
│       ├── integration/
│       └── e2e/
├── frontend/
│   └── src/
│       └── __tests__/
```
- Jest for unit tests
- Supertest for API testing
- React Testing Library
- Cypress for E2E

#### 6. Performance Optimization

**Backend**
- Redis caching for frequently accessed data
- Database query optimization
- Response compression (gzip)
- Connection pooling

**Frontend**
- React.memo for expensive renders
- Code splitting and lazy loading
- Image optimization
- Service worker for offline support

#### 7. Monitoring & Observability
- Application Performance Monitoring (Datadog, New Relic)
- Error tracking (Sentry)
- Structured logging (Winston)
- Health check endpoints
- Metrics dashboard

#### 8. CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
- Automated testing
- Linting and formatting
- Build verification
- Automated deployment
- Rollback capability
```

#### 9. Infrastructure
- **Frontend**: Vercel/Netlify with CDN
- **Backend**: AWS ECS/Fargate or DigitalOcean
- **Database**: AWS RDS or managed MongoDB Atlas
- **File Storage**: S3 for potential document uploads

---

## 🤖 Development Insights

### AI-Assisted Development

**Where AI Excelled ✅**
- Boilerplate code generation (Express routes, React components)
- CSS patterns and responsive design
- Package dependency suggestions
- Standard error handling patterns
- Middleware architecture
- RESTful API structure

**Where Human Expertise Was Essential 🧠**
- Pagination mathematics and edge cases
- Multi-filter chaining logic
- React hooks dependency management
- Status state machine design (Active → Booked → Expired)
- Error message UX clarity
- Form submission flow and reset behavior
- Data persistence trade-offs
- API response structure design

**Key Takeaway**: AI provides excellent scaffolding and patterns, but business logic, state management, and architectural decisions require careful manual implementation.

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to backend"**
```bash
# Check backend is running
curl http://localhost:5000/alerts

# Verify CORS in server.js
app.use(cors());

# Check API URL in frontend/src/App.js
const API = "http://localhost:5000/alerts"
```

**"Port already in use"**
```bash
# Backend: Change PORT in .env
PORT=5001

# Frontend: Accept alternate port or kill process
lsof -ti:3000 | xargs kill -9
```

**"Alerts not persisting"**
```bash
# Verify file exists
ls backend/data/alerts.json

# Check permissions
chmod 644 backend/data/alerts.json
```

**"Module not found"**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 License

ISC

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Support

For issues and questions, please open an issue in the GitHub repository.
