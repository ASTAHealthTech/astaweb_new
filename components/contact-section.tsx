"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Mail, MapPin, MessageSquare, Send, Building2, Users, Stethoscope } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    phone: "",
    message: "",
    requestType: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
  
      const data = await response.json()
      if (data.success) {
        alert("Message sent successfully!")
      } else {
        alert("Something went wrong.")
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to send message.")
    }

    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@astahealthtech.com"],
      color: "from-teal-500 to-teal-600",
    },
    /*{
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+91 87794 04951"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["3RD FLOOR, DOOR NO 1-60/8/A & B, KNR Square, OPP PLATINA, GACHIBOWLI, KONDAPUR, Hyderabad, Rangareddy District, Telangana, India, 500032"],
      color: "from-purple-500 to-purple-600",
    },*/
  ]

  const requestTypes = [
    { value: "demo", label: "Request Product Demo", icon: <Building2 className="w-4 h-4" /> },
    { value: "partnership", label: "Partnership Inquiry", icon: <Building2 className="w-4 h-4" /> },
    { value: "support", label: "Technical Support", icon: <Users className="w-4 h-4" /> },
    { value: "clinical", label: "Clinical Consultation", icon: <Stethoscope className="w-4 h-4" /> },
  ]

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to transform your operations? Contact us for a personalized demo or to discuss how ASTA can
            benefit your healthcare facility
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h4>
                      {info.details?.map((detail, i) => (
                        <p key={i} className="text-gray-600 dark:text-gray-300 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
              <div className="space-y-3">
                {requestTypes.map((type, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => setFormData({ ...formData, requestType: type.value })}
                  >
                    {type.icon}
                    <span className="ml-2">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div> */}

            {/* Enhanced WhatsApp Contact */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-8 h-8 mr-3" />
                <h4 className="text-lg font-semibold">WhatsApp</h4>
              </div>
              <p className="text-sm opacity-90 mb-4">Get instant support and quick responses to your queries</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>24/7 Technical Support</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Demo Scheduling</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Partnership Inquiries</span>
                </div>
              </div>
              <a
                href="https://wa.me/918779404951/?text=Hello%20,%20I%20would%20like%20to%20get%20in%20touch%20regarding%20ASTA%20HealthTech%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
              <Button variant="secondary" size="sm" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@organization.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Your Hospital/Organization"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Your Role</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">Doctor/Physician</SelectItem>
                          <SelectItem value="nurse">Nurse Manager</SelectItem>
                          <SelectItem value="admin">Hospital Administrator</SelectItem>
                          <SelectItem value="it">IT Manager</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="requestType">Request Type</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, requestType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="What can we help you with?" />
                        </SelectTrigger>
                        <SelectContent>
                          {requestTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your wards, number of beds, current challenges, or any specific questions you have..."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                    disabled={!formData.agreeToTerms}
                  >
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
