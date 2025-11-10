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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-slate-700/30 shadow-2xl shadow-slate-900/30' 
        : 'bg-transparent'
    }`}>
      <div className="w-full max-w-full mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="inline-flex items-center space-x-3 text-emerald-400 text-sm font-medium tracking-wide uppercase bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            <span>Computer Science Student</span>
          </div>
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-500 ${
                  activeSection === item.id
                    ? 'text-emerald-300 bg-emerald-400/15 shadow-lg shadow-emerald-400/20'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700/40'
                } group`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/25 to-teal-400/25 border border-emerald-400/30 animate-pulse" />
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Enhanced 3D Scene Component with modern animations
const ThreeScene = ({ variant = 'geometric' }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

 useEffect(() => {
    if (!mountRef.current) return;

    // Store current ref value to use in cleanup
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    let mesh;
    
    if (variant === 'geometric') {
      // Simple geometric structure
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
      // Simple network visualization
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

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(3, 3, 3);
    directionalLight.castShadow = true;
    
    // Add rim light
    const rimLight = new THREE.DirectionalLight(0x14b8a6, 0.3);
    rimLight.position.set(-2, -2, 2);
    
    scene.add(ambientLight, directionalLight, rimLight);
    camera.position.z = 5;

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

// Enhanced Hero Section with larger profile image and better animations
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
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 w-full">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 w-full">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
            `
          }}></div>
        </div>
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10 animate-pulse" style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center z-10">
          {/* Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                <span className="text-slate-100">Hi, I'm </span>
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Khushi
                  </span>
                </div>
              </h1>
              
              <h2 className="text-lg md:text-xl lg:text-2xl text-slate-400 font-light leading-relaxed">
                Full-Stack Developer & Software Engineer
              </h2>
            </div>
            
            <p className="text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Passionate about creating innovative digital solutions through clean code and 
              thoughtful design. Specializing in modern web technologies, system architecture, 
              and user-centered development practices.
            </p>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={downloadCV}
                className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <DownloadIcon />
                <span className="relative z-10">Download CV</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
              
              <button 
                onClick={downloadResume}
                className="group relative inline-flex items-center justify-center space-x-3 border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-2xl font-semibold text-base hover:bg-emerald-400 hover:text-slate-900 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <DownloadIcon className="relative z-10" />
                <span className="relative z-10">Download Resume</span>
              </button>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex space-x-4 justify-center lg:justify-start transform -translate-y-4">
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
                  className="group w-14 h-14 bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 hover:border-emerald-400/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2 backdrop-blur-sm"
                  title={social.label}
                >
                  <social.icon />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Profile Image */}
          <div className="flex justify-center relative flex-shrink-0">
            <div 
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)`
              }}
            >
              {/* Profile image container */}
              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px]">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 p-1.5">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <img 
                      src="/best.jpg"
                      alt="Profile"
                      className="w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full object-cover shadow-xl"
                    />
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section className="pt-20 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 w-full">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 text-emerald-400 text-lg font-bold tracking-wider uppercase bg-emerald-400/15 px-8 py-4 rounded-full border-2 border-emerald-400/30 shadow-lg shadow-emerald-400/20">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            <span>About Me</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Enhanced 3D Animation */}
          <div className="flex justify-center lg:justify-start flex-shrink-0">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-3xl animate-pulse"></div>
              <div className="relative w-full h-full">
                <Suspense fallback={
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl animate-pulse flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }>
                  <ThreeScene variant="geometric" />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Enhanced Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-6 mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 leading-tight">
                Crafting Digital 
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Experiences
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg md:text-xl leading-relaxed">
                As a dedicated Computer Science student, I combine strong theoretical foundations 
                with practical development experience. My approach focuses on writing clean, 
                maintainable code while delivering exceptional user experiences.
              </p>

              <p className="text-lg md:text-xl leading-relaxed">
                With expertise spanning <span className="text-emerald-400 font-bold">Java</span>, 
                <span className="text-emerald-400 font-bold"> Python</span>, 
                <span className="text-emerald-400 font-bold"> C++</span>, and modern web technologies, 
                I enjoy tackling complex problems and transforming ideas into functional solutions.
              </p>

              <p className="text-lg md:text-xl leading-relaxed">
                From enterprise systems to interactive games, I believe in the power of technology 
                to solve real-world challenges while maintaining a focus on performance, scalability, 
                and user-centered design principles.
              </p>
            </div>

            {/* Enhanced Statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700/50">
              {[
                { number: '15+', label: 'Projects Delivered', color: 'from-emerald-400 to-teal-400' },
                { number: '3+', label: 'Years Experience', color: 'from-teal-400 to-cyan-400' },
                { number: '6+', label: 'Tech Stacks', color: 'from-cyan-400 to-blue-400' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500`}>
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm md:text-base font-medium">{stat.label}</div>
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
      icon: '🗄️',
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
    <section className="pt-20 pb-20 bg-slate-900 w-full">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 text-emerald-400 text-lg font-bold tracking-wider uppercase bg-emerald-400/15 px-8 py-4 rounded-full border-2 border-emerald-400/30 shadow-lg shadow-emerald-400/20">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            <span>What I Do</span>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4 leading-tight">
            Professional <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive development solutions tailored to your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-400/50 transition-all duration-700 hover:bg-slate-800/50 backdrop-blur-sm hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                {service.icon}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
              </div>

              <h3 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-emerald-400 transition-colors duration-500">
                {service.title}
              </h3>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <div key={feature} className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-transparent border-2 border-slate-600 text-slate-300 py-3 rounded-2xl font-semibold hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-500">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Section
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
    <section className="pt-20 pb-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 w-full">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 text-emerald-400 text-lg font-bold tracking-wider uppercase bg-emerald-400/15 px-8 py-4 rounded-full border-2 border-emerald-400/30 shadow-lg shadow-emerald-400/20">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            <span>Technical Expertise</span>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4 leading-tight">
            Skills & <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Proficiency</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3 group">
                <div className="flex justify-between items-center">
                  <h3 className="text-slate-100 font-bold text-xl group-hover:text-emerald-400 transition-colors duration-500">{skill.name}</h3>
                  <span className={`text-xl font-black bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>{skill.level}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-2000 ease-out relative`}
                    style={{ 
                      width: `${skill.level}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center flex-shrink-0">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl animate-pulse"></div>
              <Suspense fallback={
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl animate-pulse flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
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
    <section className="pt-20 pb-20 bg-slate-950 w-full">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 text-emerald-400 text-lg font-bold tracking-wider uppercase bg-emerald-400/15 px-8 py-4 rounded-full border-2 border-emerald-400/30 shadow-lg shadow-emerald-400/20">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            <span>Portfolio</span>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4 leading-tight">
            Featured <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            A showcase of recent work and technical achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="group bg-slate-900/30 border border-slate-800/50 rounded-3xl p-6 hover:border-emerald-400/50 transition-all duration-700 hover:bg-slate-900/50 backdrop-blur-sm hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${project.color} rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg relative`}>
                {project.icon}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-emerald-400 transition-colors duration-500">
                {project.title}
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-xs border border-emerald-400/20 hover:bg-emerald-400/20 transition-all duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button className="w-full flex items-center justify-center space-x-2 bg-slate-800/50 border-2 border-slate-700 text-slate-300 py-3 rounded-2xl font-semibold text-sm hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-500 group-hover:scale-105">
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

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Initialize EmailJS with your public key
      if (typeof window !== 'undefined' && window.emailjs) {
        window.emailjs.init('L7z1jG6fb3MqQp55d');
        
        // Send email using EmailJS
        const result = await window.emailjs.send(
          'service_yp94s7j', 
          'template_jdey9q8', // Replace with your EmailJS template ID
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Khushi Jagwani',
          }
        );

        console.log('Email sent successfully:', result);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('EmailJS not loaded');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-20 pb-20 bg-slate-900 w-full">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 text-emerald-400 text-lg font-bold tracking-wider uppercase bg-emerald-400/15 px-8 py-4 rounded-full border-2 border-emerald-400/30 shadow-lg shadow-emerald-400/20">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            <span>Contact</span>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4 leading-tight">
            Let's <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on your next project or discuss opportunities
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info */}
          <div className="flex-1 space-y-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-100 mb-6 leading-tight">
                Let's Build Something <span className="text-emerald-400">Amazing</span>
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                I'm always interested in new opportunities and exciting projects. 
                Whether it's a collaboration, internship, or full-time position, 
                I'd love to hear from you.
              </p>
            </div>

            {/* Enhanced Contact Details */}
            <div className="space-y-6">
              {[
                { icon: MailIcon, label: 'Email', value: 'khushijagwani04@gmail.com' },
                { icon: PhoneIcon, label: 'Phone', value: '+92 XXX XXXXXXX' },
                { icon: MapPinIcon, label: 'Location', value: 'Karachi, Pakistan' }
              ].map((contact) => (
                <div key={contact.label} className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-emerald-400/10 border border-emerald-400/20 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-400/20 transition-all duration-300">
                    <contact.icon />
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">{contact.label}</p>
                    <p className="text-slate-100 font-semibold">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced 3D Element */}
            <div className="w-64 h-64 mx-auto lg:mx-0">
              <Suspense fallback={
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <ThreeScene variant="network" />
              </Suspense>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="flex-1 bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-100 mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900/50 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-500 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-slate-100 mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900/50 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-500 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-slate-100 mb-2 font-semibold">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows="5"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900/50 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-500 resize-none backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-emerald-400/10 border border-emerald-400/20 rounded-2xl text-emerald-400 text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-2xl text-red-400 text-center">
                  Failed to send message. Please try again or contact me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS after script loads
      if (window.emailjs) {
        window.emailjs.init('L7z1jG6fb3MqQp55d');
      }
    };
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

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
    <div className="w-full max-w-full bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }
        
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        /* Disable horizontal scrolling completely */
        html {
          overflow-x: hidden !important;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #14b8a6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0d9488);
        }
        
        /* Selection color */
        ::selection {
          background: rgba(16, 185, 129, 0.3);
          color: #ffffff;
        }
        
        /* Enhanced animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
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
        
        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Improved hover states */
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
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

      {/* Enhanced Footer */}
      <footer className="bg-slate-950 py-12 w-full">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
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
                  className="text-slate-400 hover:text-emerald-400 transition-all duration-500 hover:scale-125"
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
