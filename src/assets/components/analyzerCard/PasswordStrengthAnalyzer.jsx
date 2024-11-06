import React, { useMemo } from 'react';

const PasswordStrengthAnalyzer = ({ password }) => {
  // Keep the icon components
  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );

  // Password analysis logic stays the same
  const analyzePassword = useMemo(() => {
    if (!password) return null;

    const charSets = {
      lowercase: /[a-z]/.test(password) ? 26 : 0,
      uppercase: /[A-Z]/.test(password) ? 26 : 0,
      numbers: /[0-9]/.test(password) ? 10 : 0,
      symbols: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? 33 : 0
    };

    const totalCharSet = Object.values(charSets).reduce((a, b) => a + b, 0);
    const combinations = Math.pow(totalCharSet, password.length);
    const entropy = Math.floor(password.length * Math.log2(totalCharSet || 1));

    const strengthElements = [];
    if (charSets.lowercase) strengthElements.push('Lowercase letters');
    if (charSets.uppercase) strengthElements.push('Uppercase letters');
    if (charSets.numbers) strengthElements.push('Numbers');
    if (charSets.symbols) strengthElements.push('Special characters');
    if (password.length >= 12) strengthElements.push('Sufficient length');

    const calculateSimplifiedCrackTime = (combinations) => {
      const speeds = { moderateBot: 1e10 };
      const secondsToCrack = combinations / speeds.moderateBot;
      const yearsToCrack = secondsToCrack / 31536000;
      
      if (secondsToCrack < 1) return "instantly";
      if (yearsToCrack < 1) return "less than a year";
      if (yearsToCrack < 100) return `${Math.floor(yearsToCrack)} years`;
      
      const centuries = yearsToCrack / 100;
      if (centuries < 1000) return `${Math.floor(centuries)} centuries`;
      return `${Math.floor(centuries / 1000)}k centuries`;
    };

    const getStrengthLabel = () => {
      if (entropy >= 80) return { label: 'Excellent', color: '#0d9488' };
      if (entropy >= 60) return { label: 'Very Strong', color: '#22c55e' };
      if (entropy >= 40) return { label: 'Strong', color: '#ca8a04' };
      if (entropy >= 30) return { label: 'Moderate', color: '#ea580c' };
      return { label: 'Weak', color: '#dc2626' };
    };

    return {
      strength: getStrengthLabel(),
      entropy,
      crackTime: calculateSimplifiedCrackTime(combinations),
      strengthElements
    };
  }, [password]);

  if (!analyzePassword) return null;

  const { strength, entropy, crackTime, strengthElements } = analyzePassword;

  return (
    <div>
      {/* Strength Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <span style={{ color: strength.color }}>
          <ShieldIcon />
        </span>
        <div>
          <div style={{ 
            fontWeight: 500, 
            color: strength.color,
            fontSize: '1.1rem'
          }}>
            {strength.label} Password
          </div>
          <div style={{ 
            color: strength.color,
            fontSize: '0.9rem'
          }}>
            (Entropy: {entropy} bits)
          </div>
        </div>
      </div>
      
      {/* Crack Time Estimation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ 
          fontSize: '1.1rem',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          Time to Crack:
        </div>
        <div style={{ 
          fontSize: '1.25rem',
          fontWeight: '500',
          color: '#1f2937'
        }}>
          {crackTime}
        </div>
        <div style={{ 
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
        </div>
      </div>

      {/* Strength Elements */}
      <div>
        <div style={{ 
          fontSize: '1.1rem',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {strengthElements.map((element, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: '#22c55e'
            }}>
              <CheckIcon />
              <span>{element}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthAnalyzer;