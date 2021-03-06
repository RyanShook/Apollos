import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { compose, withProps, pure } from 'recompose';
import { View, Platform, TextInput, Animated } from 'react-native';
import Color from 'color';
import { withTheme } from '@ui/theme';

import FloatingLabel from '../FloatingLabel';
import InputUnderline from '../InputUnderline';
import InputWrapper from '../InputWrapper';
import ErrorText from '../ErrorText';

import withFocusAnimation from '../withFocusAnimation';
import InputAddon, { AddonRow } from '../InputAddon';
import withInputControlStyles from '../withInputControlStyles';

const StyledTextInput = withInputControlStyles(TextInput);

const propsForInputType = {
  password: {
    secureTextEntry: true,
    autoCapitalize: 'none',
    autoCorrect: false,
  },
  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoCorrect: false,
  },
  numeric: {
    keyboardType: 'numeric',
  },
  numericKeyboard: {
    ...Platform.select({
      ios: { keyboardType: 'numeric' },
      android: { keyboardType: 'numeric' },
      web: { type: 'text' },
    }),
  },
  phone: {
    keyboardType: 'phone-pad',
  },
  date: {
    ...Platform.select({
      ios: { keyboardType: 'numeric' },
      android: { keyboardType: 'numeric' },
      web: { type: 'date' },
    }),
  },
};

const enhance = compose(
  withTheme(),
  pure,
  withFocusAnimation,
  withProps(({ type, ...props }) => ({
    ...get(propsForInputType, type, {}),
    ...props,
  })),
);

const Text = enhance(({
  label,
  prefix,
  suffix,
  value,
  wrapperStyle,
  error,
  disabled = false,
  Component = StyledTextInput,
  theme,
  focusAnimation: focusAnimationInput, // from withFocusAnimation
  ...textInputProps
}) => {
  const focusAnimation = (value || !label) ? new Animated.Value(1) : focusAnimationInput;
  return (
    <InputWrapper style={wrapperStyle} disabled={disabled}>
      <View>
        <AddonRow>
          <InputAddon>{prefix}</InputAddon>
          <Animated.View style={{ opacity: focusAnimation, flex: 1 }}>
            <Component
              placeholderTextColor={
                Color(theme.colors.text.primary).fade(theme.alpha.low).string()
              }
              {...textInputProps}
              editable={!disabled}
              value={`${value || ''}`}
            />
          </Animated.View>
          <InputAddon>{suffix}</InputAddon>
        </AddonRow>

        <FloatingLabel animation={focusAnimation}>{label}</FloatingLabel>
        <InputUnderline animation={focusAnimation} hasError={Boolean(error)} />
      </View>

      {(error && typeof error === 'string') ? <ErrorText>{error}</ErrorText> : null}
    </InputWrapper>
  );
});

Text.defaultProps = {
  returnKeyType: 'done',
  underlineColorAndroid: 'transparent',
};

Text.propTypes = {
  disabled: PropTypes.bool,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  label: PropTypes.string,
  value: PropTypes.any, // eslint-disable-line
  wrapperStyle: PropTypes.any, // eslint-disable-line
  returnKeyType: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  underlineColorAndroid: PropTypes.string,
};

export default Text;
