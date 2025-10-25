import React, { useState } from 'react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
        
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Get in Touch
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Form */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-slate-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">I am a... *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sponsor">Sponsor</SelectItem>
                          <SelectItem value="tutor">Tutor</SelectItem>
                          <SelectItem value="partner">Partner</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </Reveal>

            {/* Contact Information */}
            <Reveal delay={200}>
              <div className="space-y-8">
                {/* Support Team Image */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Our Support Team</h3>
                  <p className="text-slate-600">Friendly support staff ready to help you succeed</p>
                </div>

                {/* Contact Details */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    {/* US Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">US Office</p>
                        <p className="text-slate-600">5830 E 2nd St, Ste 7000<br />Casper, Wyoming 82609 US</p>
                      </div>
                    </div>

                    {/* Philippines Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Philippines Office</p>
                        <p className="text-slate-600">J and J Arcade Bldg. Lawaan 1<br />Talisay Cebu 6045</p>
                      </div>
                    </div>

                    {/* Phone Numbers */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Phone</p>
                        <p className="text-slate-600">US: +1 805 317 4524<br />Philippines: 0908 527 1364</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Email</p>
                        <p className="text-slate-600">contact@smartbrain.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-pink-50 hover:bg-pink-100 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-pink-600" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5 text-red-600" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}