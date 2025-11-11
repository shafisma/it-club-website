"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"
// Use SSR false?
const Map = dynamic(() => import("./Map"), { ssr: false })

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
            <p className="text-muted-foreground text-sm">mmitc80@gmail.com</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">Follow Us</h3>
            <p className="text-muted-foreground text-sm">@mmitc80</p>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">Our Location</h3>
          <Map />
        </div>
      </div>
    </section>
  )
}
