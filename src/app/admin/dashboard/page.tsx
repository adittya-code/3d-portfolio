'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, User, Sparkles, Code2, Box, Briefcase, GraduationCap,
  Award, Layers, FileText, Mail, Settings, LogOut, Plus, Trash2, Edit3,
  Save, Upload, Check, AlertCircle, ExternalLink, RefreshCw, Eye
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // CMS State
  const [profile, setProfile] = useState<any>({});
  const [hero, setHero] = useState<any>({});
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [resume, setResume] = useState<any>({});
  const [settings, setSettings] = useState<any>({});

  // Modals & Editing states
  const [editItem, setEditItem] = useState<any>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) {
        router.push('/admin/login');
        return;
      }

      await fetchAllData();
    } catch (e) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    const [
      pRes, hRes, sRes, prRes, eRes, edRes, aRes, svRes, mRes, rRes, stRes
    ] = await Promise.all([
      fetch('/api/profile'),
      fetch('/api/hero'),
      fetch('/api/skills'),
      fetch('/api/projects'),
      fetch('/api/experience'),
      fetch('/api/education'),
      fetch('/api/achievements'),
      fetch('/api/services'),
      fetch('/api/messages'),
      fetch('/api/resume'),
      fetch('/api/settings'),
    ]);

    if (pRes.ok) setProfile(await pRes.json());
    if (hRes.ok) setHero(await hRes.json());
    if (sRes.ok) setSkills(await sRes.json());
    if (prRes.ok) setProjects(await prRes.json());
    if (eRes.ok) setExperiences(await eRes.json());
    if (edRes.ok) setEducation(await edRes.json());
    if (aRes.ok) setAchievements(await aRes.json());
    if (svRes.ok) setServices(await svRes.json());
    if (mRes.ok) setMessages(await mRes.json());
    if (rRes.ok) setResume(await rRes.json());
    if (stRes.ok) setSettings(await stRes.json());
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Upload helper
  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) {
      showToast(json.error || 'Upload failed');
      return null;
    }
    return json.url;
  };

  // Generic Save Handlers
  const saveSingleEntity = async (endpoint: string, data: any) => {
    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      showToast('Changes saved successfully');
      fetchAllData();
    } else {
      showToast('Failed to save changes');
    }
  };

  const deleteItem = async (endpoint: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const res = await fetch(`${endpoint}?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Item deleted');
      fetchAllData();
    } else {
      showToast('Failed to delete item');
    }
  };

  const saveArrayItem = async (endpoint: string, item: any) => {
    const method = item.id ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      showToast(item.id ? 'Updated successfully' : 'Created successfully');
      setModalType(null);
      setEditItem(null);
      fetchAllData();
    } else {
      showToast('Error saving item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center text-cyber-cyan font-mono">
        <div className="flex flex-col items-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span>Loading CMS Dashboard...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile Editor', icon: User },
    { id: 'hero', label: 'Hero Editor', icon: Sparkles },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Box },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'messages', label: `Messages (${messages.filter(m => !m.isRead).length})`, icon: Mail },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 font-sans flex flex-col md:flex-row">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-cyber-cyan text-dark-950 px-5 py-3 rounded-xl font-mono text-xs font-bold shadow-glow-cyan flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-dark-900 border-r border-white/10 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-base block leading-tight">Admin CMS</span>
              <span className="text-[10px] font-mono text-cyan-400">3D Portfolio</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                    active
                      ? 'bg-cyber-cyan text-dark-950 font-bold shadow-glow-cyan'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:bg-white/5 border border-white/5"
          >
            <span className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-cyber-cyan" />
              <span>Public Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-display font-bold text-white">Dashboard Overview</h1>
              <p className="text-xs text-slate-400">Welcome back, Administrator. Real-time portfolio telemetry.</p>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-dark-900 border border-white/10 p-5 rounded-2xl">
                <Box className="w-5 h-5 text-cyber-cyan mb-2" />
                <div className="text-2xl font-display font-bold text-white">{projects.length}</div>
                <div className="text-xs text-slate-400 font-mono">Projects</div>
              </div>
              <div className="bg-dark-900 border border-white/10 p-5 rounded-2xl">
                <Code2 className="w-5 h-5 text-cyber-purple mb-2" />
                <div className="text-2xl font-display font-bold text-white">{skills.length}</div>
                <div className="text-xs text-slate-400 font-mono">Skills</div>
              </div>
              <div className="bg-dark-900 border border-white/10 p-5 rounded-2xl">
                <Briefcase className="w-5 h-5 text-blue-400 mb-2" />
                <div className="text-2xl font-display font-bold text-white">{experiences.length}</div>
                <div className="text-xs text-slate-400 font-mono">Experiences</div>
              </div>
              <div className="bg-dark-900 border border-white/10 p-5 rounded-2xl">
                <Mail className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="text-2xl font-display font-bold text-white">{messages.length}</div>
                <div className="text-xs text-slate-400 font-mono">Inbox Messages</div>
              </div>
            </div>

            {/* Recent Messages Inbox Table */}
            <div className="bg-dark-900 border border-white/10 p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-white text-lg">Recent Form Inquiries</h3>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-xs font-mono text-cyber-cyan hover:underline"
                >
                  View All ({messages.length})
                </button>
              </div>

              {messages.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">No contact messages received yet.</p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 4).map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-xl border ${
                        msg.isRead ? 'bg-dark-950/60 border-white/5' : 'bg-cyber-cyan/5 border-cyber-cyan/30'
                      } flex flex-col sm:flex-row justify-between gap-2`}
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-sm">{msg.name}</span>
                          <span className="text-xs font-mono text-slate-400">&lt;{msg.email}&gt;</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium mt-1">{msg.subject}</p>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-1">{msg.message}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Profile Editor</h1>
                <p className="text-xs text-slate-400">Edit public developer bio and statistics.</p>
              </div>
              <button
                onClick={() => saveSingleEntity('/api/profile', profile)}
                className="px-5 py-2.5 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>

            <div className="bg-dark-900 border border-white/10 p-6 rounded-3xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title || ''}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">About Section Heading</label>
                  <input
                    type="text"
                    value={profile.aboutHeading || ''}
                    onChange={(e) => setProfile({ ...profile, aboutHeading: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">About Section Subtitle</label>
                  <input
                    type="text"
                    value={profile.aboutSubtitle || ''}
                    onChange={(e) => setProfile({ ...profile, aboutSubtitle: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Short Introduction</label>
                <input
                  type="text"
                  value={profile.shortIntro || ''}
                  onChange={(e) => setProfile({ ...profile, shortIntro: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Biography</label>
                <textarea
                  rows={4}
                  value={profile.biography || ''}
                  onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email || ''}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Phone</label>
                  <input
                    type="text"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Years Experience</label>
                  <input
                    type="number"
                    value={profile.yearsExperience || 0}
                    onChange={(e) => setProfile({ ...profile, yearsExperience: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Projects Built</label>
                  <input
                    type="number"
                    value={profile.projectsCompleted || 0}
                    onChange={(e) => setProfile({ ...profile, projectsCompleted: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Tech Mastered</label>
                  <input
                    type="number"
                    value={profile.techMastered || 0}
                    onChange={(e) => setProfile({ ...profile, techMastered: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              {/* Avatar Image Upload */}
              <div className="pt-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Profile Photo Upload</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleFileUpload(file);
                        if (url) setProfile({ ...profile, avatarUrl: url });
                      }
                    }}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-mono file:bg-dark-950 file:text-cyber-cyan hover:file:bg-white/10"
                  />
                  {profile.avatarUrl && (
                    <img src={profile.avatarUrl} alt="Avatar Preview" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HERO EDITOR TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Hero Section Editor</h1>
                <p className="text-xs text-slate-400">Edit hero headlines and interactive 3D text overlay.</p>
              </div>
              <button
                onClick={() => saveSingleEntity('/api/hero', hero)}
                className="px-5 py-2.5 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Save className="w-4 h-4" />
                <span>Save Hero</span>
              </button>
            </div>

            <div className="bg-dark-900 border border-white/10 p-6 rounded-3xl space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Availability Status Badge</label>
                <input
                  type="text"
                  value={hero.badgeText || ''}
                  onChange={(e) => setHero({ ...hero, badgeText: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Main Hero Headline</label>
                <input
                  type="text"
                  value={hero.title || ''}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Sub-title / Role Specialties</label>
                <input
                  type="text"
                  value={hero.subtitle || ''}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-cyber-cyan font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Hero Description Paragraph</label>
                <textarea
                  rows={3}
                  value={hero.description || ''}
                  onChange={(e) => setHero({ ...hero, description: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Primary CTA Label</label>
                  <input
                    type="text"
                    value={hero.ctaPrimaryText || ''}
                    onChange={(e) => setHero({ ...hero, ctaPrimaryText: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Primary CTA Anchor/URL</label>
                  <input
                    type="text"
                    value={hero.ctaPrimaryUrl || ''}
                    onChange={(e) => setHero({ ...hero, ctaPrimaryUrl: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS CMS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Skills CMS</h1>
                <p className="text-xs text-slate-400">Manage programming languages, frontend, backend & tools.</p>
              </div>
              <button
                onClick={() => {
                  setEditItem({ name: '', category: 'Languages', proficiency: 85, icon: 'Code2', description: '', displayOrder: skills.length + 1, isActive: true });
                  setModalType('skill');
                }}
                className="px-4 py-2 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-dark-900 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{skill.name}</span>
                      <span className="text-[10px] font-mono bg-dark-950 text-cyber-cyan px-2 py-0.5 rounded border border-white/5">
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Proficiency: {skill.proficiency}%</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditItem(skill);
                        setModalType('skill');
                      }}
                      className="p-2 rounded-lg bg-dark-950 text-slate-300 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('/api/skills', skill.id)}
                      className="p-2 rounded-lg bg-dark-950 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS CMS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Projects CMS</h1>
                <p className="text-xs text-slate-400">Add, edit, or feature 3D WebGL and full-stack projects.</p>
              </div>
              <button
                onClick={() => {
                  setEditItem({ title: '', shortDescription: '', description: '', technologies: 'C++, WebGL, React', githubUrl: '', liveUrl: '', imageUrl: '', isFeatured: true, displayOrder: projects.length + 1 });
                  setModalType('project');
                }}
                className="px-4 py-2 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-dark-900 border border-white/10 p-5 rounded-2xl flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-bold text-white text-base">{proj.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{proj.shortDescription}</p>
                    <div className="text-[10px] font-mono text-cyber-cyan mt-2">{proj.technologies}</div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => {
                        setEditItem(proj);
                        setModalType('project');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-dark-950 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteItem('/api/projects', proj.id)}
                      className="px-3 py-1.5 rounded-lg bg-dark-950 text-xs font-mono text-red-400 hover:text-red-300 flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE CMS TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Experience CMS</h1>
                <p className="text-xs text-slate-400">Manage career timeline entries and responsibilities.</p>
              </div>
              <button
                onClick={() => {
                  setEditItem({ company: '', position: '', location: '', startDate: '2024', endDate: 'Present', current: true, description: '', responsibilities: '', technologies: '', displayOrder: experiences.length + 1 });
                  setModalType('experience');
                }}
                className="px-4 py-2 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-dark-900 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{exp.position} @ {exp.company}</h4>
                    <p className="text-xs font-mono text-slate-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditItem(exp);
                        setModalType('experience');
                      }}
                      className="p-2 rounded-lg bg-dark-950 text-slate-300 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('/api/experience', exp.id)}
                      className="p-2 rounded-lg bg-dark-950 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION CMS TAB */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Education CMS</h1>
                <p className="text-xs text-slate-400">Manage academic degrees and achievements.</p>
              </div>
              <button
                onClick={() => {
                  setEditItem({ institution: '', degree: 'B.S.', field: 'Computer Science', startDate: '2019', endDate: '2023', gpa: '3.9/4.0', description: '', displayOrder: education.length + 1 });
                  setModalType('education');
                }}
                className="px-4 py-2 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Plus className="w-4 h-4" />
                <span>Add Education</span>
              </button>
            </div>

            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="bg-dark-900 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{edu.degree} in {edu.field}</h4>
                    <p className="text-xs text-slate-400">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditItem(edu);
                        setModalType('education');
                      }}
                      className="p-2 rounded-lg bg-dark-950 text-slate-300 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('/api/education', edu.id)}
                      className="p-2 rounded-lg bg-dark-950 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS CMS TAB */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Achievements & Certificates</h1>
                <p className="text-xs text-slate-400">Manage verified honors and certifications.</p>
              </div>
              <button
                onClick={() => {
                  setEditItem({ title: '', organization: '', date: '2024', description: '', credentialId: '', credentialUrl: '', displayOrder: achievements.length + 1 });
                  setModalType('achievement');
                }}
                className="px-4 py-2 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Plus className="w-4 h-4" />
                <span>Add Achievement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-dark-900 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{ach.title}</h4>
                    <p className="text-xs font-mono text-cyber-cyan">{ach.organization} ({ach.date})</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditItem(ach);
                        setModalType('achievement');
                      }}
                      className="p-2 rounded-lg bg-dark-950 text-slate-300 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('/api/achievements', ach.id)}
                      className="p-2 rounded-lg bg-dark-950 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES CMS TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Services CMS</h1>
                <p className="text-xs text-slate-400">Manage client software services & offerings.</p>
              </div>
              <button
                onClick={() => {
                  setEditItem({ title: '', description: '', icon: 'Box', features: '', displayOrder: services.length + 1 });
                  setModalType('service');
                }}
                className="px-4 py-2 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div key={srv.id} className="bg-dark-900 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{srv.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{srv.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditItem(srv);
                        setModalType('service');
                      }}
                      className="p-2 rounded-lg bg-dark-950 text-slate-300 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('/api/services', srv.id)}
                      className="p-2 rounded-lg bg-dark-950 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESUME MANAGER TAB */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Resume PDF Manager</h1>
                <p className="text-xs text-slate-400">Upload and update the public PDF resume document.</p>
              </div>
              <button
                onClick={() => saveSingleEntity('/api/resume', resume)}
                className="px-5 py-2.5 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Save className="w-4 h-4" />
                <span>Save Resume Details</span>
              </button>
            </div>

            <div className="bg-dark-900 border border-white/10 p-6 rounded-3xl space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Resume Title</label>
                <input
                  type="text"
                  value={resume.title || ''}
                  onChange={(e) => setResume({ ...resume, title: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Current PDF File URL</label>
                <input
                  type="text"
                  value={resume.fileUrl || ''}
                  onChange={(e) => setResume({ ...resume, fileUrl: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                />
              </div>

              {/* PDF Upload */}
              <div className="pt-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">Upload New PDF File</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const res = await handleFileUpload(file);
                      if (res) {
                        setResume({
                          ...resume,
                          fileUrl: res,
                          fileName: file.name,
                          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
                        });
                        showToast('PDF uploaded successfully');
                      }
                    }
                  }}
                  className="text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-mono file:bg-dark-950 file:text-cyber-cyan hover:file:bg-white/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* MESSAGES INBOX TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-white">Contact Messages Inbox</h1>
              <p className="text-xs text-slate-400">View and manage messages submitted via the public contact form.</p>
            </div>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="bg-dark-900 border border-white/10 p-8 rounded-3xl text-center text-slate-500 text-sm">
                  Your inbox is clean. No contact messages received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-dark-900 border ${
                      msg.isRead ? 'border-white/10 opacity-80' : 'border-cyber-cyan/40 bg-cyber-cyan/5'
                    } p-6 rounded-3xl space-y-3 relative`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-white text-base">{msg.name}</span>
                        <span className="text-xs font-mono text-cyber-cyan ml-2">&lt;{msg.email}&gt;</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200">Subject: {msg.subject}</div>
                    <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed bg-dark-950 p-4 rounded-xl border border-white/5">
                      {msg.message}
                    </p>

                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        onClick={async () => {
                          await fetch('/api/messages', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: msg.id, isRead: !msg.isRead }),
                          });
                          fetchAllData();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-dark-950 text-xs font-mono text-slate-300 hover:text-white"
                      >
                        {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>

                      <button
                        onClick={() => deleteItem('/api/messages', msg.id)}
                        className="px-3 py-1.5 rounded-lg bg-dark-950 text-xs font-mono text-red-400 hover:text-red-300"
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SITE SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Site & SEO Settings</h1>
                <p className="text-xs text-slate-400">Configure global website metadata and social links.</p>
              </div>
              <button
                onClick={() => saveSingleEntity('/api/settings', settings)}
                className="px-5 py-2.5 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>

            <div className="bg-dark-900 border border-white/10 p-6 rounded-3xl space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName || ''}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">SEO Title Tag</label>
                <input
                  type="text"
                  value={settings.seoTitle || ''}
                  onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">SEO Meta Description</label>
                <textarea
                  rows={2}
                  value={settings.seoDescription || ''}
                  onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white resize-none"
                />
              </div>

              {/* Social & Contact links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail || ''}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={settings.githubUrl || ''}
                    onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={settings.linkedinUrl || ''}
                    onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Twitter / X URL (Leave empty to hide)</label>
                  <input
                    type="text"
                    value={settings.twitterUrl || ''}
                    onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                  />
                </div>
              </div>

              {/* Footer text settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Footer Name</label>
                  <input
                    type="text"
                    value={settings.footerName || ''}
                    onChange={(e) => setSettings({ ...settings, footerName: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Footer Copyright Line</label>
                  <input
                    type="text"
                    value={settings.footerText || ''}
                    onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-400 mb-1">Footer Role Description</label>
                  <input
                    type="text"
                    value={settings.footerDescription || ''}
                    onChange={(e) => setSettings({ ...settings, footerDescription: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              {/* Section Headings & Subtitles Editor */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <h4 className="font-display font-bold text-white text-base">Section Headings & Subtitles</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Skills Section Heading</label>
                    <input
                      type="text"
                      value={settings.skillsHeading || ''}
                      onChange={(e) => setSettings({ ...settings, skillsHeading: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Skills Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.skillsSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, skillsSubtitle: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Projects Section Heading</label>
                    <input
                      type="text"
                      value={settings.projectsHeading || ''}
                      onChange={(e) => setSettings({ ...settings, projectsHeading: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Projects Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.projectsSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, projectsSubtitle: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Experience Section Heading</label>
                    <input
                      type="text"
                      value={settings.experienceHeading || ''}
                      onChange={(e) => setSettings({ ...settings, experienceHeading: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Experience Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.experienceSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, experienceSubtitle: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Education Section Heading</label>
                    <input
                      type="text"
                      value={settings.educationHeading || ''}
                      onChange={(e) => setSettings({ ...settings, educationHeading: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Education Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.educationSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, educationSubtitle: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Achievements Section Heading</label>
                    <input
                      type="text"
                      value={settings.achievementsHeading || ''}
                      onChange={(e) => setSettings({ ...settings, achievementsHeading: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Achievements Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.achievementsSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, achievementsSubtitle: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Services Section Heading</label>
                    <input
                      type="text"
                      value={settings.servicesHeading || ''}
                      onChange={(e) => setSettings({ ...settings, servicesHeading: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Services Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.servicesSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, servicesSubtitle: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Resume Section Heading</label>
                    <input
                      type="text"
                      value={settings.resumeHeading || ''}
                      onChange={(e) => setSettings({ ...settings, resumeHeading: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Resume Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.resumeSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, resumeSubtitle: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Contact Section Heading</label>
                    <input
                      type="text"
                      value={settings.contactHeading || ''}
                      onChange={(e) => setSettings({ ...settings, contactHeading: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Contact Section Subtitle</label>
                    <input
                      type="text"
                      value={settings.contactSubtitle || ''}
                      onChange={(e) => setSettings({ ...settings, contactSubtitle: e.target.value })}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* GENERIC CRUD EDIT MODAL */}
      {modalType && editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="bg-dark-900 border border-white/10 w-full max-w-lg p-6 rounded-3xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white">
              {editItem.id ? 'Edit' : 'Add'} {modalType.toUpperCase()}
            </h3>

            {/* Skill Edit Form */}
            {modalType === 'skill' && (
              <div className="space-y-3">
                <input
                  placeholder="Skill Name"
                  value={editItem.name || ''}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <select
                  value={editItem.category || 'Languages'}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                >
                  <option value="Languages">Languages</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Tools">Tools</option>
                </select>
                <input
                  type="number"
                  placeholder="Proficiency (1-100)"
                  value={editItem.proficiency ?? 80}
                  onChange={(e) => setEditItem({ ...editItem, proficiency: Number(e.target.value) })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <textarea
                  placeholder="Description"
                  value={editItem.description || ''}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editItem.isActive !== false}
                    onChange={(e) => setEditItem({ ...editItem, isActive: e.target.checked })}
                    className="rounded border-white/10 bg-dark-950 text-cyber-cyan"
                  />
                  <span>Visible on Public Portfolio</span>
                </label>
              </div>
            )}

            {/* Project Edit Form */}
            {modalType === 'project' && (
              <div className="space-y-3">
                <input
                  placeholder="Project Title"
                  value={editItem.title || ''}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <input
                  placeholder="Short Description"
                  value={editItem.shortDescription || ''}
                  onChange={(e) => setEditItem({ ...editItem, shortDescription: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <textarea
                  placeholder="Full Description & Key Features"
                  rows={3}
                  value={editItem.description || ''}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <input
                  placeholder="Technologies (comma separated, e.g. React, Firebase, CSS)"
                  value={editItem.technologies || ''}
                  onChange={(e) => setEditItem({ ...editItem, technologies: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <input
                  placeholder="GitHub URL"
                  value={editItem.githubUrl || ''}
                  onChange={(e) => setEditItem({ ...editItem, githubUrl: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <input
                  placeholder="Live Demo URL"
                  value={editItem.liveUrl || ''}
                  onChange={(e) => setEditItem({ ...editItem, liveUrl: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Project Image Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleFileUpload(file);
                        if (url) setEditItem({ ...editItem, imageUrl: url });
                      }
                    }}
                    className="text-xs text-slate-400 file:py-2 file:px-4 file:rounded-xl file:bg-dark-950 file:text-cyber-cyan file:border-0"
                  />
                  {editItem.imageUrl && (
                    <img src={editItem.imageUrl} alt="Project Preview" className="w-20 h-12 object-cover rounded-lg border border-white/10 mt-2" />
                  )}
                </div>
                <div className="flex items-center space-x-4 pt-1">
                  <label className="flex items-center space-x-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={Boolean(editItem.isFeatured)}
                      onChange={(e) => setEditItem({ ...editItem, isFeatured: e.target.checked })}
                      className="rounded border-white/10 bg-dark-950 text-cyber-cyan"
                    />
                    <span>Featured Project</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={editItem.isActive !== false}
                      onChange={(e) => setEditItem({ ...editItem, isActive: e.target.checked })}
                      className="rounded border-white/10 bg-dark-950 text-cyber-cyan"
                    />
                    <span>Visible</span>
                  </label>
                </div>
              </div>
            )}

            {/* Experience Edit Form */}
            {modalType === 'experience' && (
              <div className="space-y-3">
                <input
                  placeholder="Organization / Company Name"
                  value={editItem.company || ''}
                  onChange={(e) => setEditItem({ ...editItem, company: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <input
                  placeholder="Position / Role (e.g. Open Source Contributor)"
                  value={editItem.position || ''}
                  onChange={(e) => setEditItem({ ...editItem, position: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="Start Date (e.g. May 2026)"
                    value={editItem.startDate || ''}
                    onChange={(e) => setEditItem({ ...editItem, startDate: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                  />
                  <input
                    placeholder="End Date (e.g. September 15, 2026)"
                    value={editItem.endDate || ''}
                    onChange={(e) => setEditItem({ ...editItem, endDate: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                  />
                </div>
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={Boolean(editItem.current)}
                    onChange={(e) => setEditItem({ ...editItem, current: e.target.checked })}
                    className="rounded border-white/10 bg-dark-950 text-cyber-cyan"
                  />
                  <span>Currently Ongoing / Present</span>
                </label>
                <textarea
                  placeholder="Summary Description"
                  rows={2}
                  value={editItem.description || ''}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <textarea
                  placeholder="Bullet Points / PR Details (JSON array or multiline text)"
                  rows={3}
                  value={typeof editItem.responsibilities === 'string' ? editItem.responsibilities : JSON.stringify(editItem.responsibilities || [])}
                  onChange={(e) => setEditItem({ ...editItem, responsibilities: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <input
                  placeholder="Technologies / Tags (comma separated)"
                  value={editItem.technologies || ''}
                  onChange={(e) => setEditItem({ ...editItem, technologies: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editItem.isActive !== false}
                    onChange={(e) => setEditItem({ ...editItem, isActive: e.target.checked })}
                    className="rounded border-white/10 bg-dark-950 text-cyber-cyan"
                  />
                  <span>Visible on Public Portfolio</span>
                </label>
              </div>
            )}

            {/* Education Edit Form */}
            {modalType === 'education' && (
              <div className="space-y-3">
                <input
                  placeholder="Institution Name (e.g. Lovely Professional University)"
                  value={editItem.institution || ''}
                  onChange={(e) => setEditItem({ ...editItem, institution: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <input
                  placeholder="Degree (e.g. B.Tech)"
                  value={editItem.degree || ''}
                  onChange={(e) => setEditItem({ ...editItem, degree: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <input
                  placeholder="Field / Branch (e.g. Computer Science and Engineering)"
                  value={editItem.field || ''}
                  onChange={(e) => setEditItem({ ...editItem, field: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="Start Year/Date (e.g. 2023)"
                    value={editItem.startDate || ''}
                    onChange={(e) => setEditItem({ ...editItem, startDate: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                  />
                  <input
                    placeholder="End Year/Date (e.g. 2027)"
                    value={editItem.endDate || ''}
                    onChange={(e) => setEditItem({ ...editItem, endDate: e.target.value })}
                    className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                  />
                </div>
                <input
                  placeholder="CGPA / GPA (e.g. 8.5 / 10)"
                  value={editItem.gpa || ''}
                  onChange={(e) => setEditItem({ ...editItem, gpa: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <textarea
                  placeholder="Education Description"
                  rows={2}
                  value={editItem.description || ''}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editItem.isActive !== false}
                    onChange={(e) => setEditItem({ ...editItem, isActive: e.target.checked })}
                    className="rounded border-white/10 bg-dark-950 text-cyber-cyan"
                  />
                  <span>Visible on Public Portfolio</span>
                </label>
              </div>
            )}

            {/* Achievement Edit Form */}
            {modalType === 'achievement' && (
              <div className="space-y-3">
                <input
                  placeholder="Achievement / Certification Title"
                  value={editItem.title || ''}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <input
                  placeholder="Organization (e.g. GirlScript Foundation)"
                  value={editItem.organization || ''}
                  onChange={(e) => setEditItem({ ...editItem, organization: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <input
                  placeholder="Date / Year"
                  value={editItem.date || ''}
                  onChange={(e) => setEditItem({ ...editItem, date: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <textarea
                  placeholder="Description"
                  rows={2}
                  value={editItem.description || ''}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <input
                  placeholder="Credential ID (Optional)"
                  value={editItem.credentialId || ''}
                  onChange={(e) => setEditItem({ ...editItem, credentialId: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <input
                  placeholder="Verification URL (Optional)"
                  value={editItem.credentialUrl || ''}
                  onChange={(e) => setEditItem({ ...editItem, credentialUrl: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editItem.isActive !== false}
                    onChange={(e) => setEditItem({ ...editItem, isActive: e.target.checked })}
                    className="rounded border-white/10 bg-dark-950 text-cyber-cyan"
                  />
                  <span>Visible on Public Portfolio</span>
                </label>
              </div>
            )}

            {/* Service Edit Form */}
            {modalType === 'service' && (
              <div className="space-y-3">
                <input
                  placeholder="Service Title (e.g. Frontend Development)"
                  value={editItem.title || ''}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={editItem.description || ''}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                />
                <select
                  value={editItem.icon || 'Layers'}
                  onChange={(e) => setEditItem({ ...editItem, icon: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white"
                >
                  <option value="Layers">Layers (Frontend)</option>
                  <option value="Server">Server (API & Backend)</option>
                  <option value="Cpu">Cpu (Programming)</option>
                  <option value="Box">Box (General)</option>
                </select>
                <input
                  placeholder="Key Features (comma separated)"
                  value={editItem.features || ''}
                  onChange={(e) => setEditItem({ ...editItem, features: e.target.value })}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                />
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editItem.isActive !== false}
                    onChange={(e) => setEditItem({ ...editItem, isActive: e.target.checked })}
                    className="rounded border-white/10 bg-dark-950 text-cyber-cyan"
                  />
                  <span>Visible on Public Portfolio</span>
                </label>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setModalType(null);
                  setEditItem(null);
                }}
                className="px-4 py-2 rounded-xl bg-dark-950 text-xs font-mono text-slate-300 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const endpointMap: any = {
                    skill: '/api/skills',
                    project: '/api/projects',
                    experience: '/api/experience',
                    education: '/api/education',
                    achievement: '/api/achievements',
                    service: '/api/services',
                  };
                  saveArrayItem(endpointMap[modalType], editItem);
                }}
                className="px-5 py-2 rounded-xl bg-cyber-cyan text-dark-950 font-mono font-bold text-xs shadow-glow-cyan"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
