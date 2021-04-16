import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@clayui/css/lib/css/atlas.css";
import "./style/style.scss"
import 'react-datepicker/dist/react-datepicker.css'
import {ClayIconSpriteContext} from '@clayui/icon';
import spritemap from './images/icons.svg'

ReactDOM.render(
    <ClayIconSpriteContext.Provider value={spritemap}>
      <App />
      </ClayIconSpriteContext.Provider>,
  document.getElementById('root')
);
reportWebVitals();
