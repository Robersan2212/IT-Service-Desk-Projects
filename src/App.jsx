//React UX, Keyframe, CSS import//
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

//Image Imports//
import { ReactComponent as BYULogo } from './images/logobox-04.svg'; 
import { ReactComponent as LockLogo } from './images/lock-alt.svg';
import { ReactComponent as CopyClipboard } from './images/copy-to-clipboard-svgrepo-com.svg'

//Components Imports//
import PasswordAnalyzerCard from './components/PasswordAnalyzerCard';
import Button from './components/MakeButton';
import Loader from './components/Loader';
import PasswordLoader from './components/PasswordLoader';
import Input from './components/Input';
import WarningModal from './components/WarningModal';

//JavaScript question declaration
const questions = [
  //Music//
  "What is your favorite song?",
  "What is your favorite band?",
  "What is your favorite solo artist?",
  "What is your favorite album?",
  "What is your favorite music genre?",
  "What is your favorite musical instrument?",
  "What is your favorite concert?",
  "What is your favorite music video?",
  "What is your favorite song lyric?",
  "What is your favorite music festival?",

  //Hobbies//
  "What is your favorite hobby?",
  "What is your favorite craft?",
  "What is your favorite outdoor activity?",
  "What is your favorite indoor activity?",
  "What is your favorite way to relax?",
  "What is your favorite way to exercise?",
  "What is your favorite thing to collect?",
  "What is your favorite DIY project?",
  "What is your favorite board game?",
  "What is your favorite card game?",

  //Food//
  "What is your favorite type of cuisine?",
  "What is your favorite dish?",
  "What is your favorite dessert?",
  "What is your favorite snack?",
  "What is your favorite fruit?",
  "What is your favorite vegetable?",
  "What is your favorite breakfast food?",
  "What is your favorite lunch food?",
  "What is your favorite dinner food?",
  "What is your favorite pizza topping?",

  //Video Games//
  "What is your favorite video game?",
  "What is your favorite game console?",
  "What is your favorite game genre?",
  "What is your favorite game character?",
  "What is your favorite multiplayer game?",
  "What is your favorite single-player game?",
  "What is your favorite mobile game?",
  "What is your favorite retro game?",
  "What is your favorite game soundtrack?",
  "What is your favorite game developer?",

  //Sports//
  "What is your favorite sport?",
  "What is your favorite team?",
  "What is your favorite athlete?",
  "What is your favorite Olympic sport?",
  "What is your favorite extreme sport?",
  "What is your favorite sport to watch?",
  "What is your favorite sport to play?",
  "What is your favorite sports event?",
  "What is your favorite sports venue?",
  "What is your favorite sports movie?",

  //Movies//
  "What is your favorite movie?",
  "What is your favorite movie genre?",
  "What is your favorite movie quote?",
  "What is your favorite movie character?",
  "What is your favorite movie director?",
  "What is your favorite movie soundtrack?",
  "What is your favorite animated movie?",
  "What is your favorite action movie?",
  "What is your favorite comedy movie?",
  "What is your favorite drama movie?",

  //Shows//
  "What is your favorite TV show?",
  "What is your favorite TV show genre?",
  "What is your favorite TV show character?",
  "What is your favorite TV show quote?",
  "What is your favorite TV show theme song?",
  "What is your favorite reality show?",
  "What is your favorite sitcom?",
  "What is your favorite drama series?",
  "What is your favorite animated series?",
  "What is your favorite documentary series?",

  //Travel//
  "What is your favorite place to travel?",
  "What is your favorite city?",
  "What is your favorite country?",
  "What is your favorite travel activity?",
  "What is your favorite travel destination?",
  "What is your favorite travel memory?",
  "What is your favorite travel companion?",
  "What is your favorite travel season?",
  "What is your favorite travel book?",
  "What is your favorite travel blog?",

  //The Book of Mormon//
  "What is your favorite Book of Mormon verse?",
  "What is your favorite Book of Mormon story?",
  "What is your favorite Book of Mormon prophet?",
  "What is your favorite Book of Mormon chapter?",
  "What is your favorite Book of Mormon book?",
  "What is your favorite Book of Mormon miracle?",
  "What is your favorite Book of Mormon parable?",
  "What is your favorite Book of Mormon teaching?",
  "What is your favorite Book of Mormon chapter?"
];

function App() {
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState(['', '', '']);
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [isGeneratingPassword, setIsGeneratingPassword] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showWarning, setShowWarning] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      shuffleQuestions();
      setTimeout(() => setFormVisible(true), 100);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  //Function to copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => {
        setShowCopyMessage(false);
      }, 3000);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };


  //Function to shuffle questions//
  const shuffleQuestions = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 3));
  };

  //function to change questions with "change" password//
  const changeQuestion = (index) => {
    const newQuestions = [...selectedQuestions];
    const remainingQuestions = questions.filter(q => !selectedQuestions.includes(q));
    newQuestions[index] = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    setSelectedQuestions(newQuestions);
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = '';
      return newAnswers;
    });
  };
  //Function to handle new input (New Answer)//
  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };


  const createPassword = () => {
    // Helper function for generate a random number between min and max//
    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //Helper function to remove spaces from the string//
    const removeSpaces = (str) => str.replace(/\s+/g, '');

    // Select characters from the answers//
    const part1 = removeSpaces(answers[0]).substring(0, 4);  // First 4 characters of answer1
    const part2 = removeSpaces(answers[1]).substring(Math.max(0, removeSpaces(answers[1]).length - 4));  // Last 4 characters of answer2
    const part3 = removeSpaces(answers[2]).substring(0, 4);  // First 4 characters of answer 3
    
    // Pick a special character//
    const specialChars = '!@#$%^&*?';
    const specialChar = specialChars[getRandomNumber(0, specialChars.length - 1)];
    
    // Generate random numbers//
    const randomNum1 = getRandomNumber(0, 9);
    const randomNum2 = getRandomNumber(0, 9);

    //Create an array of the password parts
    const parts = [part1, randomNum1.toString(), part2, specialChar, part3, randomNum2.toString()];

    //Shuffle the array
    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [parts[i], parts[j]] = [parts[j], parts[i]];
    }

    // Combine parts for the password//
    let newPassword = parts.join('');
    
    // Ensure the password contains at least one uppercase letter//
    const randomIndex = Math.floor(Math.random() * newPassword.length);
    newPassword = newPassword.slice(0, randomIndex) + 
                  newPassword[randomIndex].toUpperCase() + 
                  newPassword.slice(randomIndex + 1);
    
    
    return newPassword;
  };


  const generatePassword = (e) => {
    e.preventDefault();
    if (answers.some(answer => answer.trim() === '')) {
      alert('Please answer all questions.');
      return;
    }

    setIsGeneratingPassword(true);
    setPassword('');
    setShowAnswers(true); 
    setTimeout(() => {
      const newPassword = createPassword();
      setPassword(newPassword);
      setIsGeneratingPassword(false);
      setIsPasswordGenerated(true);
    }, Math.random() * 3000 + 1000);
  };

  const regeneratePassword = (e) => {
    e.preventDefault();
    setIsGeneratingPassword(true);
    setPassword('');
    setTimeout(() => {
      const newPassword = createPassword();
      setPassword(newPassword);
      setIsGeneratingPassword(false);
    }, Math.random() * 3000 + 1000);
  };

  const closeWarning = () => {
    setShowWarning(false);
  };

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <AppContainer>
      <PasswordAnalyzerCard>
        
      </PasswordAnalyzerCard>
      <WarningModal isOpen={showWarning} onClose={closeWarning} />
      <ResponsiveModal formVisible={formVisible}>
        <Header>
          <LogoContainer>
            <BYULogo />
          </LogoContainer>
          <TitleContainer>
            <h1>SafeStudent</h1>
            <h2><LockLogo /> Optimal Password Generation</h2>
          </TitleContainer>
        </Header>
        <form onSubmit={isPasswordGenerated ? regeneratePassword : generatePassword}>
          <div id="questions">
            {selectedQuestions.map((question, index) => (
              <QuestionContainer key={index}>
                <Input
                  question={question}
                  value={answers[index]}
                  onChange={(value) => handleInputChange(index, value)} />
                <button type="button" className='ChangeButton' onClick={() => changeQuestion(index)}>
                  Change
                  <span className="arrow-wrapper">
                    <span className="arrow"></span>
                  </span>
                </button>
              </QuestionContainer>
            ))}
          </div>
          <ButtonContainer>
            <Button onClick={isPasswordGenerated ? regeneratePassword : generatePassword}
              text={isPasswordGenerated ? "Regenerate Password" : "Make My Password"} />
          </ButtonContainer>
        </form>
        <ResultContainer isVisible={isGeneratingPassword || password}>
          {isGeneratingPassword ? (
            <PasswordGenerationContainer>
              <PasswordLoader />
              <LoadingText>
                {isPasswordGenerated ? "Regenerating your secure password..." : "Generating your secure password..."}
              </LoadingText>
            </PasswordGenerationContainer>
          ) : password ? (
            <div id="result">
              <PasswordContainer>
                <PasswordText>{password}</PasswordText>
                <CopyButton onClick={copyToClipboard}>
                  <CopyClipboard />
                </CopyButton>
              </PasswordContainer>
            </div>
          ) : null}
        </ResultContainer>
      </ResponsiveModal>
      {showCopyMessage && <SlidingMessage isVisible={showCopyMessage}>Password copied!</SlidingMessage>}
    </AppContainer>
  );
}



/////////////CSS styling//////////////////

//Loading Animation//
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

//Style for change button to change questions//
const ChangeButtonStyle = css`
  --primary-color: #0B6DA2;
  --secondary-color: #fff;
  --hover-color: #111;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;

  border-radius: 20px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  color: var(--secondary-color);
  padding: 1em 1.8em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #006eb6;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 200px;
  font-size: 0.8rem;

  .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;

    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      border: solid var(--secondary-color);
      border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
      display: inline-block;
      top: -3px;
      right: 3px;
      transition: 0.2s;
      padding: 3px;
      transform: rotate(-45deg);
    }
  }

  &:hover {

    .arrow {
      background: var(--secondary-color);

      &:before {
        right: 0;
      }
    }
  }
`;


//Style for App container //
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0B6DA2;
  padding: 10px;
`;

const ResponsiveModal = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.formVisible ? '0s' : '0.3s'};

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
  
  @media (min-width: 1024px) and (max-width: 1440px) {
    max-width: 700px;
    padding: 25px;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0B6DA2;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    align-items: center;
    margin-bottom: 15px;
  }
`;

const LogoContainer = styled.div`
  svg {
    width: 120px;
    height: auto;
  }

  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
  
  @media (min-width: 1024px) and (max-width: 1440px) {
    svg {
      width: 150px;
    }
  }
`;

const TitleContainer = styled.div`
  margin-left: 30px;

  h1 {
    font-size: 2.5rem;
    color: #006eb6;
  }

  h2 {
    font-size: 1.3rem;
    color: #333;
    margin: 5px 0 0;
    margin-top: -6px;
    display: flex;
    align-items: center;

    svg {
      width: 18px;
      height: 21px;
      margin-right: 5px;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1rem;
    }
  }

  @media (max-width: 600px) {
    margin-left: 0;
    text-align: center;
  }
  
  @media (min-width: 1024px) and (max-width: 1440px) {
    h1 {
      font-size: 2.4rem;
    }
    h2 {
      font-size: 1.3rem;
    }
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 68px;
  position: relative;
  font-size: large;

  @media (max-width: 480px) {
    margin-bottom: 40px;
    margin-top: 40px;
  }

  button {
    ${ChangeButtonStyle}
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    margin-bottom: 30px;
    margin-top: 40px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.isPasswordGenerated ? '55px' : '75px'};
  margin-bottom: ${props => props.isPasswordGenerated ? '10px' : '0'};
  transition: margin 0.3s ease;

  @media (min-width: 1024px) and (max-width: 1440px) {
    margin-top: ${props => props.isPasswordGenerated ? '50px' : '10px'};

  }
  
  @media (max-width: 480px) {
    margin-bottom: 5px;
    margin-top: 5px;
  }
`;

const ResultContainer = styled.div`
  min-height: ${props => props.isVisible ? '80px' : '0'};
  opacity: ${props => props.isVisible ? '1' : '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: min-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
`;

const PasswordGenerationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  align-items: center;
  align-content: center;
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  margin-top: 5px;
  margin-left:10px;
  background-color: #EF5F5F5;


  @media (min-width: 1024px) and (max-width: 1440px) {
    
 }
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

const PasswordText = styled.p`
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:wght@100;400;500&display=swap');

  font-family: 'Inter', 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: #006eb6;
  padding: 10px 15px;
  word-break: break-all;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 8px 12px;
  }
  
  @media (min-width: 1024px) and (max-width: 1440px) {
    font-size: 1.4rem;
    padding: 12px 18px;
 }
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  svg {
    width: 20px;
    height: 24px;
    transition: all 0.3s ease;
  }


  &:hover svg {
    transform: scale(1.1);
    filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2));
  }

  &:active svg {
    transform: scale(0.95);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const SlidingMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  border-radius: 4px;
  z-index: 1000;
  animation: ${props => props.isVisible ? css`${slideIn} 0.5s forwards` : css`${slideOut} 0.5s forwards`};
`;

export default App;