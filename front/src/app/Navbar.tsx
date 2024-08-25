'use client'
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './navbar.css';

export function Navbar() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists

    const handleNavButtonClick = () => {
      if (buttonRef.current && menuRef.current) {
        if (buttonRef.current.classList.contains('open')) {
          buttonRef.current.classList.remove('open');
          menuRef.current.style.display = 'none';
        } else {
          buttonRef.current.classList.add('open');
          menuRef.current.style.display = 'grid';
        }
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (backToTopRef.current) {
        if (scrollTop <= 250) {
          backToTopRef.current.style.opacity = '0';
        } else {
          backToTopRef.current.style.opacity = '1';
        }
      }
    };

    const handleSmoothScroll = (event: Event) => {
      event.preventDefault();
      const target = document.querySelector((event.target as HTMLAnchorElement).getAttribute('href') || '');
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth',
        });
      }
    };

    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', handleNavButtonClick);
    }

    window.addEventListener('scroll', handleScroll);

    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('click', handleNavButtonClick);
      }
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <>
      <nav id="navbar">
        <div className="nav-left">
          <div id="button1" className="nav-button" ref={buttonRef}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="nav-right">
          <ul id="navbar-items">
            <li className="navbar-item no-mob">
              <a className="navbar-item-inner" href="#">
                <span><i className='uil uil-home-alt'></i> Home</span>
              </a>
            </li>
            <li className="navbar-item no-mob">
              <a className="navbar-item-inner" href="#">
                <span><i className='uil uil-comment-image'></i> Forum</span>
              </a>
            </li>
            <li className="navbar-item no-mob">
              {isLoggedIn ? (
                <a className="navbar-item-inner" onClick={handleLogout}>
                  <span><i className='uil uil-user'></i> Logout</span>
                </a>
              ) : (
                <a className="navbar-item-inner" onClick={() => router.push('/welcome')}>
                  <span><i className='uil uil-user'></i> Sign Up</span>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div id="menu" ref={menuRef}>
        <div className="menu-left-space"></div>
        <div className="menu-left">
          <h3>General</h3>
          <ul className="menu-items">
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className='uil uil-home-alt'></i> Home</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className='uil uil-comment-image'></i> Forum</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className="uil uil-shopping-bag"></i> Store</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="menu-center">
          <h3>Useful Links</h3>
          <ul className="menu-items">
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className="uil uil-bookmark"></i> Tutorials</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className="uil uil-map-marker-info"></i> Dynmap</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className='uil uil-server-alt'></i> Servers</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="menu-right">
          <h3>Admin Tools</h3>
          <ul className="menu-items">
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className="uil uil-lightbulb"></i> Control Panel</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className="uil uil-brackets-curly"></i> Code Editor</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-item-inner" href="#">
                <span><i className="uil uil-window"></i> Info & Status</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="menu-right-space"></div>
      </div>
      <div className="back-to-top" ref={backToTopRef} style={{ display: 'block', opacity: 1 }}>
        <a className="semplice-event" href="#" data-event-type="helper" data-event="scrollToTop" style={{ opacity: 1 }}>
          <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="53px" height="20px" viewBox="0 0 53 20" enableBackground="new 0 0 53 20" xmlSpace="preserve">
            <g id="Ebene_3"></g>
            <g>
              <polygon points="43.886,16.221 42.697,17.687 26.5,4.731 10.303,17.688 9.114,16.221 26.5,2.312"></polygon>
            </g>
          </svg>
        </a>
      </div>
    </>
  );
}
