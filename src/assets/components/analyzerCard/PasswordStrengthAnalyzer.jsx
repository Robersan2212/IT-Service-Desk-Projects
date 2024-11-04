import React, { useMemo } from 'react';

const PasswordStrengthAnalyzer = ({ password }) => {
  // SVG Icons as components
  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );

  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );

  const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12"/>
    </svg>
  );

  const analyzePassword = useMemo(() => {
    if (!password) return null;

    const criteria = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      symbols: /[!@#$%^&*?]/.test(password),
    };

    const strengthScore = Object.values(criteria).filter(Boolean).length;

    const getStrengthLabel = (score) => {
      switch (score) {
        case 5: return { label: 'Very Strong', color: '#059669' }; // emerald-600
        case 4: return { label: 'Strong', color: '#16a34a' }; // green-600
        case 3: return { label: 'Moderate', color: '#ca8a04' }; // yellow-600
        case 2: return { label: 'Weak', color: '#ea580c' }; // orange-600
        default: return { label: 'Very Weak', color: '#dc2626' }; // red-600
      }
    };

    const estimateCrackTime = () => {
      const combinations = {
        lowercase: 26,
        uppercase: 26,
        numbers: 10,
        symbols: 32
      };
      
      let possibleChars = 0;
      if (/[a-z]/.test(password)) possibleChars += combinations.lowercase;
      if (/[A-Z]/.test(password)) possibleChars += combinations.uppercase;
      if (/[0-9]/.test(password)) possibleChars += combinations.numbers;
      if (/[!@#$%^&*?]/.test(password)) possibleChars += combinations.symbols;

      // Assume 1 billion guesses per second for modern hardware
      const guessesPerSecond = 1000000000;
      const totalCombinations = Math.pow(possibleChars, password.length);
      const seconds = totalCombinations / guessesPerSecond;

      if (seconds < 60) return 'instantly';
      if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
      if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
      if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
      if (seconds < 315360000) return `${Math.round(seconds / 31536000)} years`;
      return 'centuries';
    };

    return {
      strength: getStrengthLabel(strengthScore),
      crackTime: estimateCrackTime(),
      criteria
    };
  }, [password]);

  if (!analyzePassword) return null;

  const { strength, crackTime, criteria } = analyzePassword;

  return (
    <div style={{ marginTop: '1rem', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: strength.color }}><ShieldIcon /></span>
        <span style={{ fontWeight: 500, color: strength.color }}>
          {strength.label} Password
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
        <ClockIcon />
        <span>Estimated crack time: <strong>{crackTime}</strong></span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
          Password Requirements:
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '0.5rem' 
        }}>
          {[
            { label: '12+ characters', met: criteria.length },
            { label: 'Uppercase letter', met: criteria.uppercase },
            { label: 'Lowercase letter', met: criteria.lowercase },
            { label: 'Number', met: criteria.numbers },
            { label: 'Special character', met: criteria.symbols }
          ].map((requirement, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: requirement.met ? '#16a34a' : '#ca8a04' }}>
                {requirement.met ? <CheckIcon /> : <AlertIcon />}
              </span>
              <span style={{ 
                color: requirement.met ? '#374151' : '#6b7280',
                fontSize: '0.875rem'
              }}>
                {requirement.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthAnalyzer;