// Creates (or updates) the hard-coded admin account and seeds starter portfolio content.
// Usage: npm run seed   (reads ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD from .env)
import mongoose from "mongoose";
import config from "./config/config.js";
import User from "./models/user.model.js";
import Project from "./models/project.model.js";
import Qualification from "./models/qualification.model.js";

const { ADMIN_NAME = "Admin", ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.");
  process.exit(1);
}

const owner = { firstname: "Mikias", lastname: "Haile", email: "mhaile2@my.centennialcollege.ca" };

const qualifications = [
  {
    title: "Advanced Diploma in Software Engineering Technology (Co-op) - Centennial College",
    completion: new Date("2027-04-30"),
    description:
      "Focusing on Web Application Development, Object-Oriented Software Design, Database Systems, and Linux System Administration.",
  },
  {
    title: "Google Data Analytics Professional Certificate - Coursera",
    completion: new Date("2026-03-01"),
    description:
      "Completed hands-on data cleaning, SQL analysis, visualization and case-study projects.",
  },
  {
    title: "Data Analysis with Python Certification - freeCodeCamp",
    completion: new Date("2026-06-01"),
    description:
      "Completed hands-on data modeling, demographic analysis, time-series visualization, and predictive modeling projects.",
  },
];

const projects = [
  {
    title: "Responsive Restaurant Web Application",
    completion: new Date("2025-12-01"),
    description:
      "Lead Front-End Developer. Built an interactive web platform with dynamic menu routing, OpenWeatherMap API integration, and Leaflet.js mapping.",
  },
  {
    title: "Fantasy Premier League AI Optimizer",
    completion: new Date("2026-02-01"),
    description:
      "Data Analyst & Algorithm Developer. Designed an expected-points optimization tool using Python, Pandas, and PuLP linear programming, deployed on Streamlit Cloud.",
  },
  {
    title: "Smart Garage & Parking Management Schema",
    completion: new Date("2026-04-01"),
    description:
      "Database Architect & Systems Designer. Constructed normalized relational Oracle SQL schemas and UML interaction diagrams for real-time spot tracking and reservations.",
  },
];

await mongoose.connect(config.mongoUri);

let admin = await User.findOne({ email: ADMIN_EMAIL });
if (!admin) admin = new User({ name: ADMIN_NAME, email: ADMIN_EMAIL });
admin.password = ADMIN_PASSWORD;
admin.role = "admin";
await admin.save();
console.log(`Admin account ready: ${ADMIN_EMAIL}`);

if ((await Qualification.countDocuments()) === 0) {
  await Qualification.insertMany(qualifications.map((q) => ({ ...owner, ...q })));
  console.log("Seeded qualifications");
}
if ((await Project.countDocuments()) === 0) {
  await Project.insertMany(projects.map((p) => ({ ...owner, ...p })));
  console.log("Seeded projects");
}

await mongoose.disconnect();
