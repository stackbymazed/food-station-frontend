import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e293b] text-slate-300 pt-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div>
            <div className="text-3xl font-extrabold text-white mb-6">
              <span className="text-[#f97316]">Food</span>Station
            </div>
            <p className="leading-relaxed mb-6 text-sm opacity-80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta facere delectus qui placeat inventore consectetur repellendus optio debitis.
            </p>
            <div className="flex gap-2">
              <a className="w-8 h-8 flex items-center justify-center rounded bg-[#f97316] hover:bg-white hover:text-[#f97316] transition-all cursor-pointer">
                <Facebook size={14} />
              </a>
              <a className="w-8 h-8 flex items-center justify-center rounded bg-[#f97316] hover:bg-white hover:text-[#f97316] transition-all cursor-pointer">
                <Twitter size={14} />
              </a>
              <a className="w-8 h-8 flex items-center justify-center rounded bg-[#f97316] hover:bg-white hover:text-[#f97316] transition-all cursor-pointer">
                <Instagram size={14} />
              </a>
              <a className="w-8 h-8 flex items-center justify-center rounded bg-[#f97316] hover:bg-white hover:text-[#f97316] transition-all cursor-pointer">
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Short Link */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Short Link</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> Home</li>
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> About Us</li>
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> Contact Us</li>
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> Our Service</li>
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> Gallery</li>
            </ul>
          </div>

          {/* Help Link */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Help Link</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> Terms & Conditions</li>
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> Privacy Policy</li>
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> Refund Policy</li>
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> FAQ</li>
              <li className="hover:text-[#f97316] cursor-pointer flex items-center gap-2"><span className="text-[#f97316]">▪</span> Contact</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#f97316] shrink-0 mt-1" />
                <span>+44 (0) 20 9994 7740</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#f97316] shrink-0 mt-1" />
                <span className="break-all">themefaxbd@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#f97316] shrink-0 mt-1" />
                <span>Blackwell Street, Dry Creek, Alaska</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Orange Bottom Bar */}
      <div className="bg-[#f97316] py-4 text-center text-white font-medium text-xs">
        Copyright @ FoodStation 2023. All Rights Reserved
      </div>
    </footer>
  );
}