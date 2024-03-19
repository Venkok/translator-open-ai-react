import './App.css';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('french');
  const [translation, setTranslation] = useState('');

  async function requestTranslation() {
    if (!textToTranslate || !targetLanguage) {
      alert('Please enter text and select a language to translate.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToTranslate, targetLanguage }),
      });

      const data = await response.json();
      setTranslation(data.translation);
    } catch (error) {
      console.error('Error requesting translation:', error);
    }
  }

  function handleReset() {
    setTextToTranslate('');
    setTargetLanguage('french');
    setTranslation('');
  }

  function handleLanguageChange(event) {
    setTargetLanguage(event.target.value);
  }

  const showTranslation = translation !== '';

  return (
    <div className="container my-3">
      {/* Logo Section */}
      <div className="image-background mb-3"></div>
      {/* Input State */}
      {!translation && ( // Shows this block only if there's no translation
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="textToTranslate" className="form-label">
                Text to translate
              </label>
              <input
                type="text"
                className="form-control"
                value={textToTranslate}
                onChange={(e) => setTextToTranslate(e.target.value)}
                placeholder="How are you?"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Select language</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="languageOptions"
                  id="frenchOption"
                  value="french"
                  checked={targetLanguage === 'french'}
                  onChange={handleLanguageChange}
                />
                <label className="form-check-label" htmlFor="frenchOption">
                  French
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="languageOptions"
                  id="spanishOption"
                  value="spanish"
                  checked={targetLanguage === 'spanish'}
                  onChange={handleLanguageChange}
                />
                <label className="form-check-label" htmlFor="spanishOption">
                  Spanish
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="languageOptions"
                  id="japaneseOption"
                  value="japanese"
                  checked={targetLanguage === 'japanese'}
                  onChange={handleLanguageChange}
                />
                <label className="form-check-label" htmlFor="japaneseOption">
                  Japanese
                </label>
              </div>
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={requestTranslation}
            >
              Translate
            </button>
          </div>
        </div>
      )}

      {/* Translation State */}
      {translation && ( // Shows this block only if there's a translation
        <div className="card my-3">
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="originalText" className="form-label">
                Original text
              </label>
              <input
                type="text"
                className="form-control"
                value={textToTranslate}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="translatedText" className="form-label">
                Your translation
              </label>
              <input
                type="text"
                className="form-control"
                value={translation}
                disabled
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleReset}>
              Start Over
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">Footer content</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
