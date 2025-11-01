"use client"

import type React from "react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">Get In Touch</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Questions or interested in joining? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">Location</h3>
            <p className="text-muted-foreground text-sm">Motijheel, Dhaka-1000</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">wedonthaveonern@gmail.com</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">Follow Us</h3>
            <p className="text-muted-foreground text-sm">@gugugaga</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-foreground font-semibold mb-2 text-sm">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-foreground font-semibold mb-2 text-sm">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-foreground font-semibold mb-2 text-sm">Message</label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition resize-none"
              placeholder="Your message here..."
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
