import logo from '../../assets/Logo.png'
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Github,
} from "lucide-react";

const Footer = () => {
  return (
    <footer id='footer' className="bg-white/80 dark:bg-slate-900 backdrop-blur-xl text-[#0E2A45] dark:text-white border-t border-slate-200/50 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center dark:bg-white">
                <img src={logo} alt="" />
              </div>
              <div>
                <h3 className="text-lg font-bold">FoodZilla</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Vendor dashboard & management tools — run your kitchen smoothly.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-[#E64D21]" />
                <span className="text-slate-600 dark:text-slate-300">
                  Karachi, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-[#E64D21]" />
                <a
                  href="mailto:siddiqshah478@gmail.com"
                  className="hover:text-[#E64D21] text-slate-600 dark:text-slate-300"
                >
                  FoodZilla@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-[#E64D21]" />
                <a
                  href="tel:+92 3308110430"
                  className="text-slate-600 dark:text-slate-300 hover:text-[#E64D21]"
                >
                  +92 3308110430
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:bg-[#E64D21] transition"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-md hover:bg-[#E64D21] transition"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://github.com/MohammadSiddiq05"
                aria-label="GitHub"
                className="p-2 rounded-md hover:bg-[#E64D21] transition"
              >
                <Github className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>
                  <a href="#" className="hover:text-[#E64D21] transition">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E64D21] transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E64D21] transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>
                  <a href="#" className="hover:text-[#E64D21] transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E64D21] transition">
                    Terms & Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E64D21] transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Get updates</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Subscribe for product updates, promo and news.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = form.email.value.trim();
                if (!email) return alert("Please enter an email.");
                alert(`Subscribed (${email}) — implement backend to persist.`);
                form.reset();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white placeholder:text-slate-400 focus:outline-none"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#E64D21] text-white font-medium hover:bg-[#cf441d] transition"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              You can unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} FoodZilla. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#E64D21] transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#E64D21] transition"
            >
              Terms
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
