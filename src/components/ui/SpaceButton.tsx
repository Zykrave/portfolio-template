import React from 'react';

interface SpaceButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  scale?: number;
}

export default function SpaceButton({ 
  children, 
  className = "", 
  onClick, 
  href, 
  target, 
  rel,
  scale = 1
}: SpaceButtonProps) {
  const content = (
    <div 
      className={`space-btn-wrapper ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
    >
      <button type="button" className="btn-space" onClick={onClick}>
        <span className="btn-text-content">
          {typeof children === 'string' 
            ? children.split('').map((char, index) => (
                <span key={index} style={{ '--i': index } as React.CSSProperties}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))
            : children}
        </span>
        <div id="container-stars">
          <div id="stars" />
        </div>
      </button>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="no-underline">
        {content}
      </a>
    );
  }

  return content;
}
