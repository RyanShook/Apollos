import React from 'react';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';
import Icon from '@ui/Icon';
import { H3, H4, BodyText } from '@ui/typography';
import { withTheme } from '@ui/theme';
import { ButtonLink } from '@ui/Button';
import WebBrowser from '@ui/WebBrowser';

const contact = () => WebBrowser.openBrowserAsync('https://rock.newspring.cc/workflows/152?Topic=Stewardship');

const BackgroundView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.sizing.baseUnit * 3,
}))(PaddedView);

const ThemedIcon = withTheme(({ theme }) => ({
  size: theme.sizing.baseUnit * 3,
  fill: theme.colors.alert,
}))(Icon);

const Heading = styled(({ theme }) => ({
  color: theme.colors.alert,
}))(H3);

const SubHeading = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  paddingBottom: theme.sizing.baseUnit,
}))(H4);

const Failure = () => (
  <BackgroundView>
    <ThemedIcon name="circle-outline-x-mark" />
    <Heading>Uh Oh!</Heading>
    <SubHeading>Looks like there was a problem processing your contribution.</SubHeading>
    <BodyText italic>
      If you would like a member of our customer support team to follow up with you regarding
      this error, please{' '}
      <ButtonLink onPress={contact}>contact us</ButtonLink>
      {' '}and someone will be happy to assist you.
    </BodyText>
  </BackgroundView>
);

export default Failure;
