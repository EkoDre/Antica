import { Mail, Phone, MapPin } from 'lucide-react'
import logo from '../assets/antica-logo.png'
import ekomadeLogo from '../assets/ekomade-logo.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-warm-gray bg-charcoal">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-3">
          <div>
            <img src={logo} alt="Antica Venetian Plaster" className="mb-5 h-16 w-auto sm:mb-6 sm:h-20" />
            <p className="max-w-xs text-xs font-light leading-relaxed tracking-wide text-ivory/40 sm:text-sm">
              Refined mineral finishes inspired by antique European interiors. Every surface, a
              masterpiece.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-medium tracking-[0.25em] uppercase text-gold sm:mb-6 sm:text-xs">
              Navigation
            </h4>
            <nav className="flex flex-row flex-wrap gap-x-6 gap-y-2 sm:flex-col sm:gap-3">
              {['Portfolio', 'About', 'Finishes', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-light tracking-wider text-ivory/40 transition-colors hover:text-gold no-underline"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-medium tracking-[0.25em] uppercase text-gold sm:mb-6 sm:text-xs">
              Contact
            </h4>
            <div className="flex flex-col gap-3 sm:gap-4">
              <a
                href="mailto:info@anticavenetianplaster.com"
                className="flex items-center gap-3 text-xs font-light tracking-wide text-ivory/40 transition-colors hover:text-gold no-underline break-all sm:text-sm sm:break-normal"
              >
                <Mail size={14} className="flex-shrink-0 text-gold/60" />
                info@anticavenetianplaster.com
              </a>
              <a
                href="tel:+19148865730"
                className="flex items-center gap-3 text-xs font-light tracking-wide text-ivory/40 transition-colors hover:text-gold no-underline sm:text-sm"
              >
                <Phone size={14} className="flex-shrink-0 text-gold/60" />
                (914) 886-5730
              </a>
              <a
                href="https://maps.google.com/?q=470+Nepperhan+Avenue+Ste+220+Yonkers+NY+10701"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs font-light tracking-wide text-ivory/40 transition-colors hover:text-gold no-underline sm:text-sm"
              >
                <MapPin size={14} className="flex-shrink-0 text-gold/60" />
                470 Nepperhan Avenue, Ste 220, Yonkers, NY 10701
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-6 sm:mt-16 sm:gap-4 sm:pt-8 md:flex-row">
          <p className="text-[10px] font-light tracking-wider text-ivory/25 sm:text-xs">
            &copy; {year} Antica Venetian Plaster. All rights reserved.
          </p>
          <a
            href="https://ekomadevpn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-light tracking-wider text-ivory/25 transition-colors hover:text-ivory/50 no-underline sm:text-xs"
          >
            Powered by
            <img src={ekomadeLogo} alt="EkoMade Labs" className="h-5 w-auto sm:h-6" />
            EkoMade Labs
          </a>
        </div>
      </div>
    </footer>
  )
}
