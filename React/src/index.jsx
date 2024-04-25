/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-undef */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getQueryParams } from './addQueryParams';
import ViewerElement from './ViewerElement';
import cls from './ScreenBlock.module.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.socket = React.createRef();
  }

  componentDidMount() {
    const {
      id,
    } = getQueryParams();
    // const id = 537;

    if (id) {
      this.socket.current = new WebSocket(`${__WS__}/${id || ''}`);

      this.socket.current.onclose = (event) => {
        if (event.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код: ${event.code} причина: ${event.reason}`);
        } else {
          console.error('[close] Соединение прервано');
        }
      };

      this.socket.current.onerror = (error) => {
        console.log(error);
      };

      this.socket.current.onopen = (e) => {
        console.log('Соединение установлено');
      };

      this.socket.current.onmessage = (e) => {
        const socketElement = JSON.parse(e.data);

        if (
          socketElement.payload.screenResolution
          && socketElement.payload.slides
          && socketElement.payload.variablesScreen
        ) {
          this.setState({
            screenResolution: socketElement.payload.screenResolution,
            slides: socketElement.payload.slides,
            variablesScreen: socketElement.payload.variablesScreen,
          });
        }

        if (socketElement.payload.variables) {
          this.setState({
            variables: socketElement.payload.variables,
          });
        }
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentSlide !== prevState.currentSlide || this.state.slides !== prevState.slides) {
      const slideTimes =
        (this.state.slides
          && Object.keys(this.state.slides)
            .map((key) => ({
              id: key,
              showTime: this.state.slides[key].showTime,
              background: this.state.slides[key].background,
              lang: this.state.slides[key].lang,
              index: this.state.slides[key].index,
            }))
            .sort((a, b) => a.index - b.index))
        || [];

      if (!this.state.currentSlide && this.state.slides) {
        const id = Object.keys(this.state.slides)
          .find((key) => this.state.slides[key].index === 0);

        if (id) {
          const initialSlide = this.state.slides[id];
          const currentSlide = {
            id,
            showTime: initialSlide.showTime,
            background: initialSlide.background,
            lang: initialSlide.lang,
            index: initialSlide.index,
          };

          this.setState({
            currentSlide,
          });
        }
      }

      if (this.state.currentSlide) {
        setTimeout(() => {
          this.setState((prev) => {
            if (prev.currentSlide.index < slideTimes.length - 1) {
              return slideTimes[prev.index + 1];
            }

            return slideTimes[0];
          });
        }, this.state.currentSlide.showTime * 1000);
      }
    }
  }

  render() {
    const elements =
      this.state.currentSlide && this.state.slides && this.state.slides[this.state.currentSlide.id].elements;
    const width = `${this.state.screenResolution && this.state.screenResolution.split('x')[0]}px`;
    const height = `${this.state.screenResolution && this.state.screenResolution.split('x')[1]}px`;
    const background = this.state.currentSlide && this.state.currentSlide.background;
    const {
      variables, variablesScreen, currentSlide,
    } = this.state;

    return (
      <div
        style={{
          width,
          height,
          background,
        }}
        className={cls.ScreenBlock}
      >
        {elements
          && Object.keys(elements)
            .map((key) => (
              <ViewerElement
                key={key}
                element={elements && elements[key]}
                socketVariables={variables}
                variablesScreen={variablesScreen}
                currentSlide={currentSlide}
              />
            ))}
        <video
          controls
          src="https://geethakash.github.io/Oplayer/Nature.mp4"
        />
        <img
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/surfer-240-200.jpg"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
