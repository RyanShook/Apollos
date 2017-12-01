import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Picker from '@primitives/Picker';

const FREQUENCY_IDS = [
  { label: 'one time', id: 'One-Time' },
  { label: 'every week', id: 'Weekly' },
  { label: 'every two weeks', id: 'Bi-Weekly' },
  { label: 'once a month', id: 'Monthly' },
];

export default class FrequencyInput extends Component {
  static propTypes = {
    scheduleFrequencies: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
  };

  static defaultProps = {
    scheduleFrequencies: FREQUENCY_IDS,
  };

  state = {
    frequencyId: (this.props.scheduleFrequencies[0] && this.props.scheduleFrequencies[0].id) || '',
  };

  get value() {
    return {
      frequencyId: this.state.frequencyId,
    };
  }

  setFrequency = (frequencyId) => {
    this.setState({ frequencyId });
  }

  render() {
    return (
      <View>
        <Text>{'frequency'}</Text>
        <Picker
          onValueChange={this.setFrequency}
          selectedValue={this.state.frequencyId}
        >
          {this.props.scheduleFrequencies.map(({ label, id }) => (
            <Picker.Item label={label} value={id} key={id} />
          ))}
        </Picker>
      </View>
    );
  }
}
