import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "./theme-provider";
import profileImage from '../images/imgpro.jpeg';
import whatsappImage from '../images/whatsappImage.png'; 
import Sam from '../images/Samruddhi.png';
import prer from '../images/Prerana.png';
import gorq from '../images/Flask.png';
import react from '../images/ChatFE.png';
import recipe from '../images/Recipe.png'

import { cn, scrollToSection, validateEmail } from "@/lib/utils";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Github, 
  Linkedin, 
  MessageSquare,
  Instagram,
  ChevronDown,
  ArrowUp,
  Send,
  Bot,
  Code,
  Database,
  Smartphone,
  BarChart3,
  Workflow,
  Layers,
  Settings
} from "lucide-react";

// Typing effect hook
function useTypingEffect(texts: string[], speed: number = 100) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = texts[currentIndex];
      
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [texts, currentIndex, charIndex, isDeleting, speed]);

  return displayText;
}

// Scroll to top component
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full z-50 gradient-bg hover:shadow-xl transition-all duration-300"
      size="icon"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="h-5 w-5 text-white" />
    </Button>
  );
}

// Navigation component
function Navigation() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { href: "home", label: "Home" },
    { href: "about", label: "About" },
    { href: "services", label: "Services" },
    { href: "portfolio", label: "Portfolio" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled && "glass-effect shadow-lg"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold gradient-text">Saukhya</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="nav-link text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.label}
              </button>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-full justify-start"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero section component
function HeroSection() {
  const typedText = useTypingEffect([
    "AI Engineer",
    "Full Stack Developer", 
    "Data Science Graduate",
    "LLM Specialist",
    "Automation Expert"
  ], 80);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
              👋 Welcome to my portfolio
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="gradient-text">Saukhya</span>
          </h1>
          
          <div className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mb-8 h-16 flex items-center justify-center">
            <span>I am a </span>
            <span className="ml-2 text-blue-600 dark:text-blue-400 font-semibold min-w-[200px] text-left">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            AI Engineer specializing in building conversational agents, automating complex workflows, and integrating LLMs with real-world tools. Creating intelligent systems with Python, LangChain, Azure OpenAI, and React.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("contact")}
              className="gradient-bg text-white hover:shadow-xl hover:scale-105 transition-all duration-300 animate-glow px-8 py-4 text-lg"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
           <a href="/Saukhyasheel-CV.pdf" download>
  <Button
    variant="outline"
    className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 px-8 py-4 text-lg"
  >
    <Download className="mr-2 h-5 w-5" />
    Download CV
  </Button>
</a>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <ChevronDown className="text-slate-400 h-6 w-6" />
      </div> */}
    </section>
  );
}

// About section component
function AboutSection() {
  const [activeTab, setActiveTab] = useState("skills");

 const skills = [
    { name: "LLM Engineering", progress: 75, description: "LangChain, Prompt Engineering, Agent Design" },
    { name: "Frontend Development", progress: 60, description: "ReactJS, AngularJS, HTML/CSS/JS" },
    { name: "Backend Engineering", progress: 70, description: "Python Flask, FastAPI, REST APIs, .NET" },
    { name: "Database & Vector Stores", progress: 65, description: "Redis, MongoDB Atlas Vector DB, SQL" },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
              <div className="absolute inset-0 gradient-bg rounded-2xl transform rotate-6"></div>
              <img 
  src={profileImage} 
  alt="Saukhyasheel Sardesai - AI Engineer" 
  className="relative w-full h-full object-cover rounded-2xl shadow-2xl z-10"
/>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I am Saukhyasheel Sardesai, an AI Engineer specializing in building conversational agents, automating complex workflows, and integrating LLMs with real-world tools like Gmail, Redis, WhatsApp, and Google Calendar. I architect end-to-end intelligent systems using Python, LangChain, Azure OpenAI, and React.
              </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="mt-6">
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{skill.name}</span>
                        {/* <span className="text-blue-600 font-medium">{skill.progress}%</span> */}
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">AI / Software Developer</h3>
                      <span className="text-blue-600 font-medium">2024 - Present</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">Freelancing</p>
                    <p className="text-slate-500 dark:text-slate-400">Building AI Agents and automating workflows using Best-in-Class AI Technologies</p>
                  </div>

                  <div className="border-l-4 border-slate-300 dark:border-slate-600 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Software Developer</h3>
                      <span className="text-slate-600 font-medium">2021 - 2023</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">Capgemini, India</p>
                    <p className="text-slate-500 dark:text-slate-400">Led backend API development along with frontend development in Angular and managing database activities</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Master's in Data Science</h3>
                      <span className="text-blue-600 font-medium">2023 - 2024</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">Nottingham Trent University, UK</p>
                    <p className="text-slate-500 dark:text-slate-400">Project: Intelligent AI chatbot integrated with vector DB and OpenAI</p>
                  </div>

                  <div className="border-l-4 border-slate-300 dark:border-slate-600 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Bachelor of Engineering</h3>
                      <span className="text-slate-600 font-medium">2016 - 2020</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">Savitribai Phule Pune University, India</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services section component
function ServicesSection() {
  const aiServices = [
    {
      icon: Bot,
      title: "AI Chatbot Development",
      description: "Crafting intelligent, multilingual chatbots powered by OpenAI, LangChain, and Redis with deployment on WhatsApp, Telegram, and Web platforms.",
      gradient: "from-blue-500 to-violet-500"
    },
    {
      icon: Workflow,
      title: "Workflow Automation", 
      description: "Automating business processes using Langflow, Microsoft Logic Apps, n8n, Gmail API, Google Calendar, and Redis memory to streamline operations and reduce manual effort.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Code,
      title: "AI-Driven Backend APIs",
      description: "Developing robust Python-based APIs (Flask, FastAPI) to serve intelligent agents, manage vector stores, and facilitate real-time data interactions.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: BarChart3,
      title: "Data Dashboards",
      description: "Building smart dashboards to visualize chatbot analytics, system usage, and user behavior using Chart.js and custom React frontends.",
      gradient: "from-emerald-500 to-cyan-500"
    }
  ];

  const fullstackServices = [
    {
      icon: Settings,
      title: ".NET Web API Development",
      description: "Developed RESTful APIs using ASP.NET Web API for mobile applications with secure authentication, token management, and versioning.",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Code,
      title: "Frontend with Angular",
      description: "Built dynamic single-page applications using Angular, implementing reusable components, routing, and responsive layouts.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Database,
      title: "SQL Server (SSMS)",
      description: "Designed, queried, and maintained databases using Microsoft SQL Server, writing optimized stored procedures and handling data integrity.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Smartphone,
      title: "Responsive UI Design",
      description: "Created responsive and mobile-first user interfaces using modern frameworks, ensuring cross-device and browser compatibility.",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const ServiceCard = ({ service }: { service: any }) => (
    <Card className="service-card group hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
      <CardContent className="p-6">
        <div className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r",
          service.gradient
        )}>
          <service.icon className="h-8 w-8 text-white" />
        </div>
        <h4 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">{service.title}</h4>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
      </CardContent>
    </Card>
  );

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            I provide comprehensive solutions spanning AI development, automation, and full-stack engineering
          </p>
        </div>

        {/* AI & Automation Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10 text-slate-700 dark:text-slate-300">
            <Bot className="inline-block h-6 w-6 text-blue-500 mr-2" />
            AI & Automation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        {/* Full-Stack Development Services */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-10 text-slate-700 dark:text-slate-300">
            <Layers className="inline-block h-6 w-6 text-violet-500 mr-2" />
            Full-Stack Development
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fullstackServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Portfolio section component
function PortfolioSection() {
  const [filter, setFilter] = useState("all");

  const projects = [
   {
  title: "WhatsApp integrated AI Assistant",
  description: "with document search capabilities, collects leads and sends summary to admin via mail.",
  category: "ai",
  image: whatsappImage,
  tech: "Azure OpenAI, Gmail, Google Sheets, Redis, MongoDB vector store",
  link: "#"
}
,




    {
      title: "Telegram integrated AI Assistant",
      description: "collects users details, customises a  plan and setup meeting with staff.",
      category: "ai",
      image: Sam,
      tech: "Azure OpenAI, Google Calender, Perplexity, Azure AI Search",
      link: "#"
    },
    
{
  title: "Job Search AI Agent",
  description: "Telegram-based assistant that finds relevant jobs using search APIs and filters based on user preferences.",
  category: "ai",
  image:prer,
  tech: "SerpApi, LangChain, MongoDB, Telegram Bot API",
  link: "#"
},
    {
      title: "Gorq AI Web API",
      description: "Python Flask API with dynamic user prompts and memory",
      category: "fullstack",
      image:gorq,
      tech: "Scalable Python Flask API serving AI requests via Groq LLM",
      link: "https://github.com/Saukhyasheel/Chatbot1"
    },
    {
      title: "React Chatbot Frontend",
      description: "Multi-session UI with sidebar navigation and real-time chat",
      category: "frontend",
      image:react,
      tech: "Multi-session chatbot UI with dynamic message history",
      link: "https://github.com/Saukhyasheel/ChatbotFE"
    },
    {
      title: "Recipe Website UI Screens",
      description: "Comprehensive recipe platform with dashboard visualization",
      category: "frontend",
      image: recipe,
      tech: "70+ responsive React screens for recipe management",
      link: "https://screenrec.com/share/UOv7SaE0Ce"
    }
  ];

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "ai", label: "AI Projects" },
    { key: "fullstack", label: "Full-Stack" },
    { key: "frontend", label: "Frontend" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            My <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore some of my recent projects in AI engineering and full-stack development
          </p>
        </div>

        {/* Portfolio Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterItem) => (
            <Button
              key={filterItem.key}
              variant={filter === filterItem.key ? "default" : "outline"}
              onClick={() => setFilter(filterItem.key)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all duration-300",
                filter === filterItem.key
                  ? "gradient-bg text-white"
                  : "hover:bg-blue-600 hover:text-white"
              )}
            >
              {filterItem.label}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={index} className="portfolio-item group relative overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{project.tech}</p>
                    <a 
                      href={project.link}
                      className="inline-flex items-center text-white hover:text-blue-300 transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </a>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
        <a href="https://github.com/Saukhyasheel" target="_blank" rel="noopener noreferrer">
  <Button className="gradient-bg text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-4">
    <Github className="mr-2 h-5 w-5" />
    View More on GitHub
  </Button>
</a>

        </div>
      </div>
    </section>
  );
}

// Contact section component
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone && formData.phone.trim() === "") {
      // Phone is optional, no validation needed
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsSubmitting(true);
    
  //   try {
  //     const response = await fetch('/api/contact', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       if (data.details) {
      
  //         const fieldErrors: Record<string, string> = {};
  //         data.details.forEach((error: any) => {
  //           fieldErrors[error.field] = error.message;
  //         });
  //         setErrors(fieldErrors);
  //       } else {
  //         console.error('Form submission error:', data.error);
  //       }
  //       return;
  //     }

      
  //     setIsSubmitted(true);
  //     setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  //     console.log('Contact submission successful:', data);
      
  //     setTimeout(() => {
  //       setIsSubmitted(false);
  //     }, 5000);
  //   } catch (error) {
  //     console.error('Network error:', error);
  //     setErrors({ submit: 'Network error. Please try again.' });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxIbTJvXA-oe9BiXcnv7gwa-Mz4OYruUX22QmntQ4GIlCm12bYBHPAjJGWobCG8mVci/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});

      console.log('Contact submission successful');
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setErrors({ submit: 'Failed to submit. Please try again later.' });
    }
  } catch (error) {
    console.error('Network error:', error);
    setErrors({ submit: 'Network error. Please try again.' });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Ready to bring your AI project to life? Let's discuss how we can work together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <Card className="p-8">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-6 text-slate-700 dark:text-slate-300">Let's Connect</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Email</p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">saukhyasardesai@outlook.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Phone</p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">+44 7384025477</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Location</p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">United Kingdom</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-600">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Follow me on social media</p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/saukhyasheel-sardesai/" target="_blank" rel="noopener noreferrer">
  <Button size="icon" variant="outline" className="hover:bg-blue-500 hover:text-white transition-all duration-300">
    <Linkedin className="h-4 w-4" />
  </Button>
</a>

                  <a href="https://github.com/Saukhyasheel" target="_blank" rel="noopener noreferrer">
  <Button size="icon" variant="outline" className="hover:bg-gray-800 hover:text-white transition-all duration-300">
    <Github className="h-4 w-4" />
  </Button>
</a>

               <a href="https://api.whatsapp.com/send/?phone=447384025477&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
  <Button size="icon" variant="outline" className="hover:bg-green-500 hover:text-white transition-all duration-300">
    <MessageSquare className="h-4 w-4" />
  </Button>
</a>

                  
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="p-8">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+44 1234 567890"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Project inquiry, collaboration, etc."
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell me about your project, requirements, or any questions you have..."
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                {errors.submit && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}

                {isSubmitted && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                      Thank you for your message! I'll get back to you soon.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-bg text-white hover:shadow-xl transition-all duration-300 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Footer component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Saukhya
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              AI Engineer & Full Stack Developer crafting intelligent solutions for tomorrow's challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-slate-400">AI Chatbot Development</li>
              <li className="text-slate-400">Workflow Automation</li>
              <li className="text-slate-400">Full-Stack Development</li>
              <li className="text-slate-400">API Development</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Saukhya. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main portfolio component
export default function PortfolioHome() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
