/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import RenderBlock from './RenderBlock';

export default class ViewerElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countPage: 0,
    };
    this.intervalId = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentSlide !== prevProps.currentSlide
      || this.props.element !== prevProps.element
      || this.props.socketVariables !== prevProps.socketVariables
    ) {
      const {
        element,
        socketVariables,
        currentSlide,
      } = this.props;

      if (element.name === 'ElementGroupe' && element.properties.entity) {
        const tableRows = element.properties.duplicateLines || 1;
        const tableEntity = element.properties.entity;
        const tableVariables = socketVariables && socketVariables[tableEntity];

        const countPages = Math.ceil(((
          tableVariables && tableVariables.ordering && tableVariables.ordering.length
        ) || 1) / tableRows) || 1;
        const timeOnPage = ((currentSlide && currentSlide.showTime) || 1) / countPages;

        this.intervalId.current = setInterval(() => {
          this.setState((prev) => {
            if (prev.countPage < countPages - 1) {
              return ({ countPage: prev.countPage + 1 });
            }

            return { countPage: 0 };
          });
        }, timeOnPage * 1000);
      }

      if (element.properties.value && element.properties.value.type === 'listVar') {
        const lengthListVar = socketVariables
        && socketVariables[element.properties.value.result] && socketVariables[element.properties.value.result].length;
        const timeOnPage = ((currentSlide && currentSlide.showTime) || 1) / lengthListVar;

        if (!lengthListVar) {
          return undefined;
        }

        this.intervalId.current = setInterval(() => {
          this.setState((prev) => {
            if (prev.countPage < lengthListVar - 1) {
              return ({ countPage: prev.countPage + 1 });
            }

            return { countPage: 0 };
          });
        }, timeOnPage * 1000);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId.current);
  }

  render() {
    const {
      element,
      socketVariables,
      socketScreen,
      currentSlide,
    } = this.props;

    if (element.name === 'ElementGroupe' && element.properties.entity) {
      const tableEntity = element.properties && element.properties.entity;
      const tableVariables = socketVariables && socketVariables[tableEntity];

      const tableRows = (element.properties && element.properties.duplicateLines) || 1;
      const orderingRows = tableVariables && tableVariables.ordering
        && [...tableVariables.ordering].splice(tableRows * this.state.countPage, tableRows);

      return (
        <div
          style={{
            position: 'absolute',
            top: element.y,
            left: element.x,
            width: element.width,
            height: element.height,
          }}
        >
          {
            Array.from(Array(element.properties && element.properties.duplicateLines)
              .keys())
              .map((rowIndex) => {
                const rowID = orderingRows && orderingRows[rowIndex];
                const rowVariables = tableVariables && tableVariables.values && tableVariables.values[rowID];

                if (!rowVariables) {
                  return null;
                }

                const arrHeightElements = [
                  ...(element.properties.elements
                    ? element.properties.elements.map((el) => el.height)
                    : []),
                ];
                const hightElementsChip = (element.properties.chip && element.properties.chip.height) || 0;
                const maxRowHeight = Math.max(...arrHeightElements, hightElementsChip);

                return element.properties.elements
                && element.properties.elements.map((elementGroupe, index, elementsGroupeArray) => (
                  rowVariables.is_chipped && element.properties.chip
                    ? (
                      element.properties.chip.chipElements.map((chipElement) => (
                        <RenderBlock
                          key={chipElement.id}
                          lang={currentSlide && currentSlide.lang}
                          socketVariables={rowVariables}
                          screenVariables={socketScreen && socketScreen.variablesScreen}
                          element={chipElement}
                          isIterable
                          style={{
                            top: chipElement.y + (rowIndex * maxRowHeight),
                            left: chipElement.x,
                            width: chipElement.width,
                            height: chipElement.height,
                            position: 'absolute',
                            zIndex: chipElement.zIndex,
                          }}
                        />
                      ))
                    )
                    : (
                      <RenderBlock
                        lang={currentSlide && currentSlide.lang}
                        key={`${rowIndex}_${elementGroupe.id}`}
                        socketVariables={rowVariables}
                        element={elementGroupe}
                        screenVariables={socketScreen && socketScreen.variablesScreen}
                        isIterable
                        style={{
                          top: elementGroupe.y + (rowIndex * maxRowHeight),
                          left: elementGroupe.x,
                          width: elementGroupe.width,
                          height: elementGroupe.height,
                          position: 'absolute',
                          zIndex: elementGroupe.zIndex,
                        }}
                      />
                    )
                ));
              })
          }
        </div>
      );
    }

    const countPageProp = element.properties.value && element.properties.value.type === 'listVar'
      ? this.state.countPage
      : undefined;

    return (
      <RenderBlock
        countPage={countPageProp}
        lang={currentSlide && currentSlide.lang}
        socketVariables={socketVariables}
        element={element}
        screenVariables={socketScreen && socketScreen.variablesScreen}
        style={{
          top: element.y,
          left: element.x,
          width: element.width,
          height: element.height,
          position: 'absolute',
        }}
      />
    );
  }
}
