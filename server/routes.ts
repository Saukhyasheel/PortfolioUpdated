import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body using Zod schema
      const validationResult = insertContactSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errors = validationResult.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        return res.status(400).json({ 
          error: "Validation failed",
          details: errors
        });
      }

      const contactData = validationResult.data;

      // Save the contact form data to storage
      const savedContact = await storage.createContact(contactData);
      
      console.log("Contact form submission saved:", {
        id: savedContact.id,
        name: savedContact.name,
        email: savedContact.email,
        subject: savedContact.subject,
        timestamp: savedContact.createdAt.toISOString()
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 800));

      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon.",
        contactId: savedContact.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        error: "An error occurred while sending your message. Please try again." 
      });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ contacts });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        error: "An error occurred while fetching contacts." 
      });
    }
  });

  // Get specific contact by ID
  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid contact ID" });
      }

      const contact = await storage.getContact(id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({ contact });
    } catch (error) {
      console.error("Get contact error:", error);
      res.status(500).json({ 
        error: "An error occurred while fetching the contact." 
      });
    }
  });

  // Download CV endpoint
  app.get("/api/download-cv", async (req, res) => {
    try {
      // In a real application, you would serve the actual CV file
      // For now, we'll return a placeholder response
      res.json({ 
        success: true,
        downloadUrl: "/assets/Saukhyasheel-Sardesai-CV.pdf",
        message: "CV download initiated"
      });
    } catch (error) {
      console.error("CV download error:", error);
      res.status(500).json({ 
        error: "An error occurred while downloading the CV. Please try again." 
      });
    }
  });

  // Get portfolio data endpoint
  app.get("/api/portfolio", async (req, res) => {
    try {
      const portfolioData = {
        projects: [
          {
            id: 1,
            title: "Cristae – WhatsApp AI Assistant",
            description: "WhatsApp-based AI assistant with document search capabilities",
            category: "ai",
            technologies: ["Azure OpenAI", "Gmail", "Google Sheets", "Redis", "MongoDB"],
            githubUrl: "https://github.com/Saukhyasheel/gorqgpt",
            featured: true
          },
          {
            id: 2,
            title: "Samruddhi – Telegram Assistant",
            description: "Financial automation bot with Google Calendar integration",
            category: "ai",
            technologies: ["Azure OpenAI", "Google Calendar", "Gmail", "Sheets", "MongoDB"],
            githubUrl: "https://github.com/Saukhyasheel/samruddhi-ai",
            featured: true
          },
          {
            id: 3,
            title: "Prerana – Real Estate Agent",
            description: "Telegram-based property matching assistant",
            category: "ai",
            technologies: ["Google Sheets", "SERP API", "MongoDB", "Google Meet", "LangChain"],
            githubUrl: "https://github.com/Saukhyasheel/propmatch",
            featured: true
          },
          {
            id: 4,
            title: "Gorq AI Web API",
            description: "Python Flask API with dynamic user prompts and memory",
            category: "fullstack",
            technologies: ["Python", "Flask", "Groq LLM", "REST API"],
            githubUrl: "https://github.com/Saukhyasheel/Chatbot1",
            featured: false
          },
          {
            id: 5,
            title: "React Chatbot Frontend",
            description: "Multi-session UI with sidebar navigation and real-time chat",
            category: "frontend",
            technologies: ["React", "Flask Backend", "Groq LLM", "Real-time Chat"],
            githubUrl: "https://github.com/Saukhyasheel/react-chatbot",
            featured: false
          },
          {
            id: 6,
            title: "Recipe Website UI Screens",
            description: "Comprehensive recipe platform with dashboard visualization",
            category: "frontend",
            technologies: ["React", "UI/UX Design", "Dashboard", "Responsive Design"],
            demoUrl: "https://screenrec.com/share/UOv7SaE0Ce",
            featured: false
          }
        ],
        skills: [
          { name: "LLM Engineering", level: 95, category: "ai" },
          { name: "Frontend Development", level: 90, category: "frontend" },
          { name: "Backend Engineering", level: 88, category: "backend" },
          { name: "Database & Vector Stores", level: 85, category: "database" }
        ],
        stats: {
          totalProjects: 6,
          yearsExperience: 3,
          aiProjects: 3,
          fullstackProjects: 3
        }
      };

      res.json(portfolioData);
    } catch (error) {
      console.error("Portfolio data error:", error);
      res.status(500).json({ 
        error: "An error occurred while fetching portfolio data." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
