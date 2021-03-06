import React from 'react';
import Card, { CardContent } from '@ui/Card';
import { BodyText } from '@ui/typography';
import { ButtonLink } from '@ui/Button';
import styled from '@ui/styled';
import PaddedView from '@ui/PaddedView';
import WebBrowser from '@ui/WebBrowser';

const StyledBodyText = styled({ textAlign: 'center' })(BodyText);

const AdUnit = () => (
  <Card>
    <CardContent>
      <PaddedView>
        <StyledBodyText italic>
          {'Unfortunately, we didn\'t find any groups matching your search. Gather some friends, and '}
          <ButtonLink onPress={() => WebBrowser.openBrowserAsync('https://rock.newspring.cc/workflows/81')}>start your own group</ButtonLink>
          {' !'}
        </StyledBodyText>
      </PaddedView>
    </CardContent>
  </Card>
);

export default AdUnit;
