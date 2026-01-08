import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="corporate-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About</h4>
                    <p>
                        Building an Innovative Approach against Phishing Attacks through
                        Machine Learning and Natural Language Processing Techniques.
                    </p>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: caguiclacd@students.national-u.edu.ph</p>
                    <p>Phone: 09954188503</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="https://ph.linkedin.com/in/christian-d-caguicla-478462301" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        
                        <a href="https://www.facebook.com/1Caguicla.christian/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                    <p>&copy; {currentYear} Christian Caguicla. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
