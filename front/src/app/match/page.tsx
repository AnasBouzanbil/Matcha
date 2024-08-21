'use client'
import react, { useState } from 'react'

import './page.css'
import {Navbar} from '../Navbar'


import Hammer from 'hammerjs';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faFireFlameCurved,
  faCommentDots,
  faSuitcase,
  faGraduationCap,
  faLocationDot,
  faCircleInfo,
  faArrowRotateLeft,
  faTimes,
  faStar,
  faHeart,
  faBolt,
  faReorder,
  faSquare,
  faChevronLeft,
  faSignal,
  faBatteryThreeQuarters,
  faYoutubePlay
} from '@fortawesome/free-solid-svg-icons';

interface CardData {
  name: string;
  img : string;
  age: number;
  job: string;
  education: string;
  distance: number;
}

export function Cards() {
  const [cardsData, setCardsData] = useState<CardData[]>([]);

  useEffect(() => {
    // Fetch data for the cards
    fetch('https://api.example.com/cards') // Replace with your API endpoint
      .then(response => response.json())
      .then((data: CardData[]) => setCardsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Initialize HammerJS after the cards have been rendered
    const elements = document.querySelectorAll<HTMLDivElement>(".photo");
    elements.forEach(el => {
      const hammerTime = new Hammer(el);

      hammerTime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
      hammerTime.get('pinch').set({ enable: true });

      hammerTime.on("pan", function (ev : any) {
        el.classList.add("moving");
        el.classList.toggle("nope", ev.deltaX < -80);
        el.classList.toggle("like", ev.deltaX > 80);
        el.classList.toggle("super_like", ev.deltaY < -72 && Math.abs(ev.deltaX) < 80);
        const rotate = ev.deltaX * ev.deltaY * 4e-4;
        el.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px) rotate(${rotate}deg)`;
      });

      hammerTime.on("panend", function (ev : any) {
        const absVel = Math.abs(ev.velocity);
        const absDelX = Math.abs(ev.deltaX);
        el.classList.remove("nope", "like", "super_like", "moving");
        if (absDelX > 80) {
          const transitionDuration = 250 / (absVel + 0.4) > 150 ? 250 / (absVel + 0.4) > 400 ? 400 : 250 / (absVel + 0.4) : 150;
          el.style.transitionDuration = `${transitionDuration}ms`;
          const rotate = ev.deltaX * ev.deltaY * 4e-4;
          const mult = absVel > 1.4 ? absVel : 1.4;
          el.style.transform = `translate(${ev.deltaX * 1.4 * mult}px, ${ev.deltaY * mult}px) rotate(${rotate * mult}deg)`;
          el.style.opacity = '0';
          repeat(transitionDuration);
        } else if (ev.deltaY < -72) {
          const transitionDuration = 250 / (absVel + 0.4) > 150 ? 250 / (absVel + 0.4) > 400 ? 400 : 250 / (absVel + 0.4) : 150;
          el.style.transitionDuration = `${transitionDuration}ms`;
          const mult = absVel > 2 ? absVel : 2;
          el.style.transform = `translate(0px, ${ev.deltaY * mult}px)`;
          el.style.opacity = '0';
          repeat(transitionDuration);
        } else {
          el.style.transform = '';
        }
      });

      hammerTime.on("pinch", function (ev : any) {
        el.style.transitionDuration = '0ms';
        el.style.transform = `scale(${ev.scale})`;
      });

      hammerTime.on("pinchend", function () {
        el.style.transform = "scale(1)";
      });

      function repeat(transitionDuration = 350) {
        setTimeout(function () {
          el.style.transform = '';
          setTimeout(function () {
            el.classList.remove("nope", "like", "super_like", "moving");
            el.style.opacity = '1';
          }, transitionDuration);
        }, transitionDuration);
      }

      function buttonEvent(reaction: 'like' | 'dislike' | 'super_like') {
        const transitionDuration = Math.random() * 300 + 300;
        el.style.transitionDuration = `${transitionDuration}ms`;
        let x = Math.random() * 300 + 100;
        let y = Math.random() * 400 - 200;
        let rotate = x * y * 4e-4;
        if (reaction === 'like') {
          el.classList.toggle('like');
        } else if (reaction === 'dislike') {
          el.classList.toggle('nope');
          x *= -1;
        } else if (reaction === 'super_like') {
          el.classList.toggle('super_like');
          x = rotate = 0;
          y = y < 0 ? y * 3 : -y * 3;
        }
        el.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        el.style.opacity = '0';
        repeat(transitionDuration * 0.8);
      }

      document.querySelector('.fa-close')?.parentElement?.addEventListener('click', () => {
        buttonEvent('dislike');
      });

      document.querySelector('.fa-star')?.parentElement?.addEventListener('click', () => {
        buttonEvent('super_like');
      });

      document.querySelector('.fa-heart')?.parentElement?.addEventListener('click', () => {
        buttonEvent('like');
      });
    });

    const clockTicking = setInterval(clock, 1000);
    function clock() {
      const d = new Date();
      const displayDate = d.toLocaleTimeString();
      const clockElement = document.querySelector<HTMLDivElement>(".clock");
      if (clockElement) {
        clockElement.innerHTML = displayDate.substring(0, 5);
      }
    }

    return () => clearInterval(clockTicking);
  }, [cardsData]);
  return (
    <div className="smartphone">
      <div className="screen">
        <div className="topbar">
          <div className="topbar-left">
            <div className="clock">00:00</div>
            <FontAwesomeIcon icon={faYoutubePlay} />
          </div>
          <div className="topbar-middle">
            <div className="camera"></div>
            <div className="camera-lens"></div>
            <div className="inner-lens"></div>
          </div>
          <div className="topbar-right">
            <FontAwesomeIcon icon={faSignal} />
            73%
            <FontAwesomeIcon icon={faBatteryThreeQuarters} />
          </div>
        </div>
        <nav className="navbar">
          <FontAwesomeIcon icon={faCircleUser} />
          <FontAwesomeIcon icon={faFireFlameCurved} />
          <FontAwesomeIcon icon={faCommentDots} />
        </nav>
        <div className="person">
          {cardsData.map((card, index) => (
            <figure key={index} className="photo">
              <div className="personal">
                <div className="name-age">
                  <h2 className="name">{card.name}</h2>
                  <h2 className="age">{card.age}</h2>
                </div>
                <div className="data">
                  <div className="about">
                    <div className="about-icon">
                      <FontAwesomeIcon icon={faSuitcase} />
                      <FontAwesomeIcon icon={faGraduationCap} />
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className="about-text">
                      <p>{card.job}</p>
                      <p>{card.education}</p>
                      <p>{card.distance} miles away</p>
                    </div>
                  </div>
                  <div className="info">
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </div>
                </div>
              </div>
            </figure>
          ))}
        </div>
        <div className="commands">
          <div className="command">
            <FontAwesomeIcon icon={faArrowRotateLeft} />
          </div>
          <div className="command">
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="command">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="command">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="command">
            <FontAwesomeIcon icon={faBolt} />
          </div>
        </div>
        <footer>
          <FontAwesomeIcon icon={faReorder} />
          <FontAwesomeIcon icon={faSquare} />
          <FontAwesomeIcon icon={faChevronLeft} />
        </footer>
      </div>
    </div>
  );
          }


export default function match(){


    return (
        <div className='flex justify-center items-center match'>
            <Navbar/>
            <Cards/>
        </div>
    )
}