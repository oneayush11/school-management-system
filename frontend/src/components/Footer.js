import React from "react";

// social profile links
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/?flo=true",
  linkedin: "https://www.linkedin.com/in/ayushraj87",
  twitter: "https://x.com/oneayush11",
  github: "https://github.com/oneayush11/oneayush11",
};
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>School Management System</h3>
          <p>Address:- Noida Sector 63, Noida, Uttar Pradesh 201301, India
            <br/>
            Contact Number :- <a href="tel:+918235002088" style={{ color: "white" }}>+91 8235002088</a><br/>
            Email ID :- <a href="mailto:onaayush11@gmail.com" style={{ color: "white" }}>onaayush11@gmail.com</a><br/>
            Open Monday to Saturday<br/>
            Closed on Sunday
          </p>
        </div>

        <div className="footer-socials">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="social-icon instagram"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.42.6.24 1.05.53 1.5 1 .48.47.77.9 1 1.5.17.4.36 1.2.42 2.4.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.4a4 4 0 0 1-1 1.5c-.47.48-.9.77-1.5 1-.4.17-1.2.36-2.4.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.4-.42a4 4 0 0 1-1.5-1 4 4 0 0 1-1-1.5c-.17-.4-.36-1.2-.42-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .42-2.4.24-.6.53-1.05 1-1.5.47-.48.9-.77 1.5-1 .4-.17 1.2-.36 2.4-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52 0-4.76.07-1.03.05-1.58.22-1.95.36-.49.19-.84.42-1.2.78-.36.36-.6.72-.78 1.2-.14.37-.31.92-.36 1.95C3 9.4 3 9.77 3 12s0 2.6.07 3.84c.05 1.03.22 1.58.36 1.95.19.49.42.84.78 1.2.36.36.72.6 1.2.78.37.14.92.31 1.95.36 1.24.07 1.61.07 4.76.07s3.52 0 4.76-.07c1.03-.05 1.58-.22 1.95-.36.49-.19.84-.42 1.2-.78.36-.36.6-.72.78-1.2.14-.37.31-.92.36-1.95.07-1.24.07-1.61.07-3.84s0-2.6-.07-3.84c-.05-1.03-.22-1.58-.36-1.95a3 3 0 0 0-.78-1.2 3 3 0 0 0-1.2-.78c-.37-.14-.92-.31-1.95-.36C15.6 4 15.2 4 12 4Zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm4.85-2a1.08 1.08 0 1 1 0 2.15 1.08 1.08 0 0 1 0-2.15Z" />
            </svg>
          </a>

          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-icon linkedin"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.57h.05c.53-.98 1.83-2.02 3.77-2.02 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.65c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.46-2.17 2.98V21h-4V9.5Z" />
            </svg>
          </a>

          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="social-icon twitter"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.9 22H2l8-9.2L1.5 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
            </svg>
          </a>

          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-icon github"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.94c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.2 2.46.1 2.72.65.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} School Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
