import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const finishOptions = [
  'Marmorino',
  'Grassello',
  'Metallic Finish',
  'Tadelakt',
  'Custom Texture',
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('Unable to reach our server. Please try again or email us directly at info@anticavenetianplaster.com.')
      }

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      if (!data.success) {
        throw new Error('Something went wrong. Please try again.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(
        err.message || 'Unable to send your inquiry. Please try again or email us directly at info@anticavenetianplaster.com.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="bg-ivory py-16 sm:py-28 md:py-40">
      <div ref={ref} className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center sm:mb-16"
        >
          <p className="mb-3 text-[10px] font-medium tracking-[0.35em] uppercase text-gold sm:mb-4 sm:text-xs">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-charcoal sm:text-4xl md:text-5xl">
            Consultation Request
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold/50" />
          <p className="mx-auto mt-5 max-w-lg text-xs font-light leading-relaxed tracking-wide text-charcoal/50 sm:mt-6 sm:text-sm">
            Every project begins with a conversation. Share your vision and we will craft a finish
            worthy of your space.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center border border-gold/30 bg-bone p-8 text-center sm:p-12"
            >
              <CheckCircle size={40} className="mb-4 text-gold sm:size-12" strokeWidth={1} />
              <h3 className="font-serif text-xl font-light tracking-wide text-charcoal sm:text-2xl">
                Thank You
              </h3>
              <p className="mt-3 text-xs font-light tracking-wide text-charcoal/50 sm:text-sm">
                We have received your inquiry and will be in touch within 48 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-warm-gray bg-bone p-5 sm:p-8 md:p-12">
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-[11px] font-medium tracking-[0.2em] uppercase text-charcoal/40"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="rounded-none border-b border-charcoal/15 bg-transparent px-0 py-3 text-sm font-light tracking-wide text-charcoal outline-none transition-colors placeholder:text-charcoal/25 focus:border-gold"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[11px] font-medium tracking-[0.2em] uppercase text-charcoal/40"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="rounded-none border-b border-charcoal/15 bg-transparent px-0 py-3 text-sm font-light tracking-wide text-charcoal outline-none transition-colors placeholder:text-charcoal/25 focus:border-gold"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="phone"
                    className="text-[11px] font-medium tracking-[0.2em] uppercase text-charcoal/40"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="rounded-none border-b border-charcoal/15 bg-transparent px-0 py-3 text-sm font-light tracking-wide text-charcoal outline-none transition-colors placeholder:text-charcoal/25 focus:border-gold"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:mt-6">
                <label
                  htmlFor="projectType"
                  className="text-[11px] font-medium tracking-[0.2em] uppercase text-charcoal/40"
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={form.projectType}
                  onChange={handleChange}
                  className="appearance-none rounded-none border-b border-charcoal/15 bg-transparent px-0 py-3 text-sm font-light tracking-wide text-charcoal outline-none transition-colors focus:border-gold"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23af944d' stroke-width='2'%3E%3Cpolyline points='6,9 12,15 18,9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                  }}
                >
                  <option value="" disabled>
                    Select a finish
                  </option>
                  {finishOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:mt-6">
                <label
                  htmlFor="message"
                  className="text-[11px] font-medium tracking-[0.2em] uppercase text-charcoal/40"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, timeline, and vision..."
                  className="resize-none rounded-none border-b border-charcoal/15 bg-transparent px-0 py-3 text-sm font-light leading-relaxed tracking-wide text-charcoal outline-none transition-colors placeholder:text-charcoal/25 focus:border-gold"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-start gap-3 border border-red-300/50 bg-red-50 p-4"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" strokeWidth={1.5} />
                  <p className="text-xs font-light leading-relaxed tracking-wide text-red-700 sm:text-sm">
                    {error}
                  </p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="mt-8 flex w-full cursor-pointer items-center justify-center gap-3 border border-charcoal bg-charcoal px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase text-ivory transition-all hover:bg-transparent hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-50 sm:mt-10 sm:w-auto sm:justify-start sm:px-10"
              >
                <span>{sending ? 'Sending...' : 'Send Inquiry'}</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
