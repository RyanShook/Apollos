import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import moment from 'moment';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card from '@ui/Card';
import PaddedView from '@ui/PaddedView';
import { H5, H6, H7, BodyText } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import Spacer from '@ui/Spacer';
import Touchable from '@ui/Touchable';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    accountName: PropTypes.string,
    amount: PropTypes.number,
    frequency: PropTypes.string,
    startDate: PropTypes.string,
    iconSize: PropTypes.number,
    dateFormat: PropTypes.string,
  }),
  defaultProps({
    isLoading: false,
    accountName: null,
    amount: 0,
    frequency: null,
    startDate: null,
    iconSize: null,
    dateFormat: 'MMM D YYYY',
  }),
  withIsLoading,
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1),
  })),
  pure,
);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const DateText = styled(({ theme }) => ({
  paddingLeft: theme.sizing.baseUnit / 2,
}))(BodyText);

const StyledH7 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H7);

const LinkText = styled(({ theme }) => ({
  color: theme.colors.text.link,
}))(H6);

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.text.link,
}))(Icon);

const ScheduleCard = enhance(({
  isLoading,
  accountName,
  amount,
  frequency,
  startDate,
  iconSize,
  dateFormat,
  onPress,
  ...otherProps
}) => (
  <Card isLoading={isLoading} {...otherProps}>
    <Touchable onPress={onPress}>
      <PaddedView>
        <CashAmountIndicator
          amount={amount}
        />
        <H5>{frequency}</H5>
        <Spacer />
        <Row>
          <StyledH7>{'Start Date:'}</StyledH7>
          <DateText italic>{moment(startDate).utc().format(dateFormat)}</DateText>
        </Row>
        <Spacer />
        <Row>
          <LinkText>{'View Schedule Details'}</LinkText>
          <StyledIcon name="arrow-next" size={iconSize} />
        </Row>
      </PaddedView>
    </Touchable>
  </Card>
));

export default ScheduleCard;
