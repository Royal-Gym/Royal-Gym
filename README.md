# Royal-Gym
Custom Gym Management System - DAW Project (L2 NTIC)

## Project Structure
This project follows a modular directory structure to separate administrative functions from client-facing pages.

```text
Royal-Gym/ (Project Root)
│
├── index.html              # Main Entry Point (Landing Page)
│
├── admin/                  # Back-office / Administrative Module
│   ├── login.html          # Administrator Authentication Page
│   ├── dashboard.html      # Admin Control Panel Overview
│   └── plans.html          # Membership & Subscription Management
│
├── client/                 # Client-side / Public Facing Pages
│   ├── classes.html        # Gym Class Schedules & Timetable
│   ├── membership.html     # Subscription Plans & Pricing Tables
│   ├── trainers.html       # Professional Trainers Profiles
│   └── contact.html        # Inquiry & Contact Form
│
├── assets/                 # Static Resources & Media Assets
│   ├── images/             # UI Graphics, Logos, and Content Images
│   └── fonts/              # Custom Typography & Icon Fonts
│
├── css/                    # Global Stylesheets
│   ├── style.css           # Core Bundle (Common/Shared Styles)
│   ├── index-style.css     # Specific styles for Landing Page
│   └── membership.css      # Specific styles for Pricing Tables
│
├── js/                     # Client-side Scripts
│   └── main.js             # Core JavaScript Logic (Part 3 Interactivity)
│
├── .gitignore              # Version Control Exclusion File
└── README.md               # Project Documentation & Team Manifest
```
