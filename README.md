# Royal-Gym
Custom Gym Management System - DAW Project (L2 NTIC)

## Project Structure
This project follows a modular directory structure to separate administrative functions from client-facing pages.

```text
Royal-Gym/
│
├── index.html              # Main Entry Point (Landing Page)
│
├── admin/                  # Back-office / Administrative Module
│   ├── dashboard.html      # Admin Control Panel Overview
│   ├── login.html          # Administrator Authentication Page
│   └── plans.html          # Membership & Subscription Management
│
├── client/                 # Client-side / Public Facing Pages
│   ├── classes.html        # Gym Class Schedules & Timetable
│   ├── contact.html        # Inquiry & Contact Form
│   ├── membership.html     # Subscription Plans & Pricing Tables
│   └── trainers.html       # Professional Trainers Profiles
│
├── assets/                 # Static Resources & Media Assets
│   ├── images/             # UI Graphics, Logos, and Content Images
│   └── fonts/              # Custom Typography & Icon Fonts
│
├── css/                    # Global Stylesheets
│   ├── classes.css         # Specific styles for Classes Page
│   ├── contact.css         # Specific styles for Contact Page
│   ├── dashboard.css       # Specific styles for Dashboard Page
│   ├── index.css           # Specific styles for Index Page
│   ├── login.css           # Specific styles for Login Page
│   ├── membership.css      # Specific styles for Membership Page
│   ├── style.css           # Core Bundle (Common/Shared Styles)
│   └── trainers.css        # Specific styles for Trainers Page
│
├── js/                     # Client-side Scripts
│   └── main.js             # Core JavaScript Logic (Part 3 Interactivity)
│
├── .gitignore              # Version Control Exclusion File
└── README.md               # Project Documentation & Team Manifest
```
