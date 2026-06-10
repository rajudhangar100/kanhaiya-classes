import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-[#163232] to-[#214646] text-white pt-20 pb-10">

      <div className="container-width px-5">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="heading-font text-4xl font-bold">
              Kanhaiya Classes
            </h2>

            <p className="text-white/70 mt-5 leading-8">
              Empowering students from
              1st to 12th Commerce through
              structured education and
              academic excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 mt-5 text-white/70">
              <a href="#about">
                About
              </a>

              <a href="#features">
                Features
              </a>

              <a href="#performance">
                Results
              </a>

              <a href="#fees">
                Fees
              </a>
            </div>
          </div>

          {/* Standards */}
          <div>
            <h3 className="font-bold text-xl">
              Classes
            </h3>

            <div className="flex flex-col gap-4 mt-5 text-white/70">
              <p>1st - 10th Standard</p>
              <p>11th Commerce</p>
              <p>12th Commerce</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xl">
              Contact
            </h3>

            <div className="space-y-5 mt-5 text-white/70">

              <div className="flex gap-3">
                <Phone size={18} />
                <span>
                  +91 9876543210
                </span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <span>
                  info@kanhaiyaclasses.com
                </span>
              </div>

              <div className="flex gap-3">
                <MapPin size={18} />
                <span>
                  Chennai, Tamil Nadu
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/50">
          © 2026 Kanhaiya Classes.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}