
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Solutions</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">Marketing</a></li>
              <li><a href="#" className="hover:text-white">Analytics</a></li>
              <li><a href="#" className="hover:text-white">Commerce</a></li>
              <li><a href="#" className="hover:text-white">Insights</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">Guides</a></li>
              <li><a href="#" className="hover:text-white">API Status</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Jobs</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">Claim</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base">&copy; {new Date().getFullYear()} WORD'S, Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {/* Social Icons Placeholder */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
