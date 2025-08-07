'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';

// Custom SVG Icons
const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

// Navigation Component
const Navigation = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-slate-900/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">
          </div>
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-emerald-400 bg-emerald-400/10'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/20 to-teal-400/20 border border-emerald-400/20" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// 3D Scene Component with subtle animations
const ThreeScene = ({ variant = 'geometric' }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    let mesh;
    
    if (variant === 'geometric') {
      // Sophisticated geometric structure
      const group = new THREE.Group();
      
      // Main structure
      const geometry = new THREE.IcosahedronGeometry(1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.8,
        wireframe: true
      });
      const mainMesh = new THREE.Mesh(geometry, material);
      group.add(mainMesh);
      
      // Orbiting elements
      for (let i = 0; i < 6; i++) {
        const smallGeometry = new THREE.OctahedronGeometry(0.1);
        const smallMaterial = new THREE.MeshPhongMaterial({
          color: 0x14b8a6,
          transparent: true,
          opacity: 0.9
        });
        const smallMesh = new THREE.Mesh(smallGeometry, smallMaterial);
        const radius = 2;
        const angle = (i / 6) * Math.PI * 2;
        smallMesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * 0.5,
          Math.sin(angle) * radius
        );
        group.add(smallMesh);
      }
      
      mesh = group;
      scene.add(mesh);
    } else if (variant === 'network') {
      // Network visualization
      const group = new THREE.Group();
      const nodes = [];
      
      // Create nodes
      for (let i = 0; i < 8; i++) {
        const nodeGeometry = new THREE.SphereGeometry(0.05, 12, 12);
        const nodeMaterial = new THREE.MeshPhongMaterial({ color: 0x10b981 });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        
        node.position.set(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        );
        nodes.push(node);
        group.add(node);
      }
      
      // Create connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() > 0.6) {
            const points = [nodes[i].position, nodes[j].position];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 0x14b8a6,
              transparent: true,
              opacity: 0.3
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            group.add(line);
          }
        }
      }
      
      mesh = group;
      scene.add(mesh);
    }

    // Subtle lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(2, 2, 2);
    scene.add(ambientLight, directionalLight);

    camera.position.z = 4;

    // Smooth animation
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (mesh) {
        mesh.rotation.y += 0.005;
        mesh.rotation.x += 0.002;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [variant]);

  return <div ref={mountRef} className="w-full h-full flex items-center justify-center" />;
};

// Profile Image Component
const ProfileImage = () => {
  return (
    <div className="relative w-[450px] h-[450px] mx-auto">
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 p-1.5">
        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
          {/* Placeholder for actual profile image */}
          <div className="w-[430px] h-[430px] rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-9xl text-emerald-400">
            K
          </div>
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 blur-xl -z-10"></div>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Khushi - CV.pdf';
    link.download = 'Khushi - CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Khushi - Resume.pdf';
    link.download = 'Khushi - Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-emerald-400 text-sm font-medium tracking-wide uppercase">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Computer Science Student</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="text-slate-100">Hi, I'm </span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Khushi
              </span>
            </h1>
            
            <h2 className="text-xl lg:text-2xl text-slate-400 font-light leading-relaxed">
              Full-Stack Developer & Software Engineer
            </h2>
          </div>
          
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            Passionate about creating innovative digital solutions through clean code and 
            thoughtful design. Specializing in modern web technologies, system architecture, 
            and user-centered development practices.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={downloadCV}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
            >
              <DownloadIcon />
              <span>Download CV</span>
            </button>
            
            <button 
              onClick={downloadResume}
              className="inline-flex items-center space-x-2 border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-lg font-medium hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300"
            >
              <DownloadIcon />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {[
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/khushi-jagwani-766a6a348', label: 'LinkedIn' },
              { icon: GithubIcon, href: 'https://github.com/khushi-Jag', label: 'GitHub' },
              { icon: MailIcon, href: 'mailto:khushijagwani04@gmail.com', label: 'Email' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 hover:border-emerald-400/50 transition-all duration-300"
                title={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center">
          <div 
            className="transition-transform duration-500 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`
            }}
          >
            <img 
                src="/best.jpg"
                alt="Profile"
                className="w-52 h-52 rounded-full object-cover shadow-lg"
              />
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Animation */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-96 h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-3xl"></div>
              <div className="relative w-full h-full">
                <Suspense fallback={<div className="w-full h-full bg-slate-800 rounded-2xl animate-pulse" />}>
                  <ThreeScene variant="geometric" />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>About Me</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
                Crafting Digital 
                <span className="text-emerald-400"> Experiences</span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                As a dedicated Computer Science student, I combine strong theoretical foundations 
                with practical development experience. My approach focuses on writing clean, 
                maintainable code while delivering exceptional user experiences.
              </p>

              <p className="text-lg">
                With expertise spanning <span className="text-emerald-400 font-semibold">Java</span>, 
                <span className="text-emerald-400 font-semibold"> Python</span>, 
                <span className="text-emerald-400 font-semibold"> C++</span>, and modern web technologies, 
                I enjoy tackling complex problems and transforming ideas into functional solutions.
              </p>

              <p className="text-lg">
                From enterprise systems to interactive games, I believe in the power of technology 
                to solve real-world challenges while maintaining a focus on performance, scalability, 
                and user-centered design principles.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-800">
              {[
                { number: '15+', label: 'Projects Delivered' },
                { number: '3+', label: 'Years Experience' },
                { number: '6+', label: 'Tech Stacks' }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Full-stack web applications with modern frameworks, responsive design, and optimal performance optimization.',
      features: ['React & Next.js', 'Responsive Design', 'Performance Optimization', 'SEO Implementation'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🎮',
      title: 'Game Development',
      description: 'Interactive games and simulations using C++ and SFML with focus on engaging gameplay mechanics.',
      features: ['C++ & SFML', 'Game Physics', 'Animation Systems', 'Cross-Platform'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🏗️',
      title: 'System Architecture',
      description: 'Scalable enterprise systems with robust database design, API development, and security implementation.',
      features: ['Database Design', 'API Development', 'System Architecture', 'Security Implementation'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '📱',
      title: 'Mobile Solutions',
      description: 'Mobile-first applications and progressive web apps optimized for performance across all devices.',
      features: ['Mobile-First Design', 'PWA Development', 'Cross-Platform', 'Native Performance'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>What I Do</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Professional <span className="text-emerald-400">Services</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Comprehensive development solutions tailored to your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-emerald-400/50 transition-all duration-500 hover:bg-slate-800/70"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-transparent border border-slate-600 text-slate-300 py-3 rounded-lg font-medium hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const skills = [
    { name: 'Java', level: 85, color: 'from-orange-400 to-red-500' },
    { name: 'Python', level: 80, color: 'from-blue-400 to-blue-600' },
    { name: 'C/C++', level: 85, color: 'from-purple-400 to-purple-600' },
    { name: 'JavaScript', level: 75, color: 'from-yellow-400 to-orange-500' },
    { name: 'React/Next.js', level: 70, color: 'from-cyan-400 to-blue-500' },
    { name: 'HTML/CSS', level: 90, color: 'from-emerald-400 to-teal-500' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Skills & <span className="text-emerald-400">Proficiency</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-slate-100 font-medium text-lg">{skill.name}</h3>
                  <span className="text-emerald-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${skill.level}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="w-96 h-96">
              <Suspense fallback={<div className="w-full h-full bg-slate-800 rounded-lg animate-pulse" />}>
                <ThreeScene variant="network" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      title: 'Hospital Management System',
      description: 'Comprehensive healthcare management platform with patient registration, appointment scheduling, and medical records management.',
      tech: ['Java', 'Data Structures', 'File Handling'],
      icon: '🏥',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Job Portal Platform',
      description: 'Full-featured employment platform with role-based dashboards, application tracking, and secure authentication.',
      tech: ['Java', 'Swing', 'OOP'],
      icon: '💼',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Interactive Café Website',
      description: 'Modern café website with digital menu, reservation system, and mobile-optimized user experience.',
      tech: ['HTML', 'CSS', 'Bootstrap'],
      icon: '☕',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Academic Records System',
      description: 'Full-stack academic management platform with comprehensive student performance analytics and reporting.',
      tech: ['PostgreSQL', 'Node.js', 'Database'],
      icon: '🎓',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Game Development Portfolio',
      description: 'Collection of interactive games including arcade classics and modern gameplay mechanics using advanced graphics.',
      tech: ['C++', 'SFML', 'Game Dev'],
      icon: '🎮',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>Portfolio</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Featured <span className="text-emerald-400">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A showcase of recent work and technical achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-emerald-400/50 transition-all duration-300 hover:bg-slate-900/70"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {project.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-xs border border-emerald-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button className="w-full flex items-center justify-center space-x-2 bg-slate-800 border border-slate-700 text-slate-300 py-3 rounded-lg font-medium hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300">
                <span>View Project</span>
                <ExternalLinkIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form handling logic here
  };

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>Contact</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Let's <span className="text-emerald-400">Connect</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to collaborate on your next project or discuss opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-100 mb-6">
                Let's Build Something <span className="text-emerald-400">Amazing</span>
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether it's a collaboration, internship, or full-time position, 
                I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                { icon: MailIcon, label: 'Email', value: 'khushijagwani04@gmail.com' },
                { icon: PhoneIcon, label: 'Phone', value: '+92 XXX XXXXXXX' },
                { icon: MapPinIcon, label: 'Location', value: 'Karachi, Pakistan' }
              ].map((contact) => (
                <div key={contact.label} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-400/10 border border-emerald-400/20 rounded-lg flex items-center justify-center text-emerald-400">
                    <contact.icon />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{contact.label}</p>
                    <p className="text-slate-100 font-medium">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3D Element */}
            <div className="w-64 h-64 mx-auto lg:mx-0">
              <Suspense fallback={<div className="w-full h-full bg-slate-800 rounded-lg animate-pulse" />}>
                <ThreeScene variant="network" />
              </Suspense>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-100 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-slate-100 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-slate-100 mb-2 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Custom CSS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #14b8a6);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0d9488);
        }
        
        /* Selection color */
        ::selection {
          background: rgba(16, 185, 129, 0.3);
          color: #ffffff;
        }
        
        /* Subtle animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Focus states */
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }
        
        /* Improved hover states */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div id="home">
        <HeroSection />
      </div>
      
      <div id="about">
        <AboutSection />
      </div>

      <div id="services">
        <ServicesSection />
      </div>
      
      <div id="skills">
        <SkillsSection />
      </div>
      
      <div id="projects">
        <ProjectsSection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400">
              © 2025 Khushi Jagwani. Crafted with precision and passion.
            </div>
            <div className="flex space-x-6">
              {[
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/khushi-jagwani-766a6a348', label: 'LinkedIn' },
                { icon: GithubIcon, href: 'https://github.com/khushi-Jag', label: 'GitHub' },
                { icon: MailIcon, href: 'mailto:khushijagwani04@gmail.com', label: 'Email' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;