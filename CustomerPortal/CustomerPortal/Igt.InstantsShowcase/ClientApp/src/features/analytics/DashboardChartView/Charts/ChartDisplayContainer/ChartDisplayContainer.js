import React, { Component } from 'react';

//Styles
import { ChartDisplay } from './styles';

class ChartDisplayContainer extends Component {
  constructor(props) {
    super(props);
    const { children } = this.props;

    this.state = {
      totalChartsRendered: children.length,
      chartDataLoaded: [],
      allChartsLoaded: false,
      componentDone: false
    };
  }

  didChartLoad = bool => {
    const { chartDataLoaded, allChartsLoaded } = this.state;

    if (allChartsLoaded) {
      return;
    }

    if (chartDataLoaded.length === 0) {
      this.setState({ chartDataLoaded: [true] });
    } else {
      let newState = [...chartDataLoaded];
      newState.push(bool);
      this.setState({ chartDataLoaded: newState });
    }
  };

  componentDidUpdate() {
    const { chartDataLoaded, totalChartsRendered, componentDone } = this.state;

    if (componentDone) {
      return;
    }
    if (chartDataLoaded.length === totalChartsRendered) {
      this.setState({ allChartsLoaded: true, componentDone: true });
    }
  }

  componentWillUnmount() {
    this.setState({
      totalChartsRendered: this.props.children.length,
      chartDataLoaded: [],
      allChartsLoaded: false,
      componentDone: false
    });
  }

  render() {
    const { children } = this.props;
    return (
      <ChartDisplay>
        {children.map((child, i) => {
          return React.cloneElement(child, {
            key: i
          });
        })}
      </ChartDisplay>
    );
  }
}

export default ChartDisplayContainer;
