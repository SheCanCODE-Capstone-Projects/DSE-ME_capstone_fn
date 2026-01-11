# DSE-ME Capstone Project

A comprehensive educational management system built with Next.js, designed to streamline academic operations for facilitators and administrators in educational institutions.

## 🎯 MVP Overview

This system provides two main user interfaces:

### **Facilitator Dashboard**
A complete academic management platform for educators to:
- **Assignment Management**: Create, edit, and grade assignments with status tracking
- **Attendance Tracking**: ALU-style attendance system with 5 status types (Present, Late, Absent, Late with Communication, Absent with Communication)
- **Grade Analytics**: Comprehensive grade summaries and typing performance analytics
- **Student Progress**: Real-time monitoring of student performance and engagement

### **ME (Management & Evaluation) Portal**
An administrative interface for institutional oversight:
- **Facilitator Management**: Assign facilitators to cohorts/courses, handle access requests
- **Course Administration**: Create and manage courses with level classifications and participant tracking
- **System Analytics**: Monitor institutional performance and resource allocation

## 🚀 Key Features

### **Assignment System**
- CRUD operations for assignments
- Status tracking (Not Started, In Progress, Completed)
- Bulk grading capabilities
- Search and filter functionality
- Pagination for large datasets

### **Attendance Management**
- Weekly and monthly attendance views
- Real-world ALU attendance model implementation
- Visual status indicators with color coding
- Comprehensive attendance analytics

### **Grade Analytics**
- Statistical summaries and performance metrics
- Typing speed and accuracy tracking
- Progress visualization
- Export capabilities

### **User Management**
- Role-based access control
- Facilitator assignment workflows
- Access request handling
- Professional UI with modal overlays

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **UI Components**: Custom component library

## 📁 Project Structure

```
src/
├── app/
│   ├── (facilitator)/          # Facilitator dashboard routes
│   │   ├── grades/             # Assignment and grade management
│   │   ├── attendance/         # Attendance tracking
│   │   └── layout.tsx          # Facilitator layout
│   ├── ME/                     # Management & Evaluation portal
│   │   ├── facilitators/       # Facilitator management
│   │   ├── courses/           # Course administration
│   │   └── layout.tsx         # ME layout
│   └── page.tsx               # Landing page
├── components/
│   ├── AttendanceComponents/   # Attendance system components
│   ├── GradesComponents/      # Assignment and grading components
│   ├── ME/                    # ME portal components
│   ├── ui/                    # Reusable UI components
│   ├── Navbar.tsx            # Main navigation
│   └── Sidebar.tsx           # Sidebar navigation
├── types/                     # TypeScript type definitions
└── utils/                     # Utility functions and helpers
```

## 🎨 Design System

- **Primary Color**: #0B609D (Professional blue)
- **Consistent Card Design**: Unified styling across all components
- **Responsive Layout**: Mobile-first approach with adaptive layouts
- **Professional UI**: Clean, modern interface with proper spacing and typography
- **Status Indicators**: Color-coded system for different states (green/yellow/red)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DSE-ME_capstone_fn
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### **For Facilitators**
1. Access the facilitator dashboard
2. Manage assignments and track student progress
3. Record attendance using the ALU-style system
4. View comprehensive grade analytics

### **For Administrators**
1. Access the ME portal
2. Manage facilitator assignments and access requests
3. Create and oversee course offerings
4. Monitor institutional performance

## 🔧 Development

- **Component Architecture**: Modular, reusable components with separation of concerns
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Code Organization**: Clean file structure with logical component grouping
- **Responsive Design**: Mobile-first approach with consistent breakpoints

## 📊 Future Enhancements

- Database integration for persistent data storage
- Real-time notifications and updates
- Advanced analytics and reporting
- Mobile application development
- Integration with external educational platforms

## 🤝 Contributing

This project follows professional development practices:
- Consistent code formatting and naming conventions
- Component-based architecture
- TypeScript for type safety
- Responsive design principles

---

**Built with Next.js** | **Designed for Educational Excellence**