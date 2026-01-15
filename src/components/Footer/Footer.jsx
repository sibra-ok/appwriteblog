import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-3">
              YourBrand
            </h2>
            <p className="text-sm max-w-xs">
              Building clean and modern web experiences with React.
            </p>
          </div>

          <Logo width="100px" />
          <div className="grid grid-cols-2 gap-10 text-sm">

            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-2">
                Company
              </span>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
              <Link to="/careers" className="hover:text-white transition">
                Careers
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-2">
                Legal
              </span>
              <Link to="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800 text-center text-xs">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;