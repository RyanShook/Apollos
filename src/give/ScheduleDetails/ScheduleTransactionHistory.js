import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { BodyText } from '@ui/typography';
import PaddedView from '@ui/PaddedView';
import Spacer from '@ui/Spacer';
import { Link } from '@ui/NativeWebRouter';
import { ButtonLink } from '@ui/Button';
import HistoricalContributionCard from '@ui/HistoricalContributionCard';
import WebBrowser from '@ui/WebBrowser';

const ScheduleTransactionHistory = ({
  transactions = [],
  isLoading = false,
}) => (
  <View>
    {!isLoading && !transactions.length ? (
      <PaddedView>
        <BodyText>{'We didn\'t find any contributions associated with this schedule.'}</BodyText>
        <Spacer byHeight />
        <BodyText italic>
          If you have any questions, please call our Finance Team at 864-965-9990 or{' '}
          <ButtonLink onPress={() => WebBrowser.openBrowserAsync('https://rock.newspring.cc/workflows/152?Topic=Stewardship')}>
            Contact Us
          </ButtonLink>
          {' '}and someone will be happy to assist you.
        </BodyText>
        <Spacer byHeight />
        <BodyText italic>
          {'You can print your yearly giving statement in your giving history'}
        </BodyText>
      </PaddedView>
    ) : null}
    {transactions.map(transaction => (
      <Link to={`/give/history/${transaction.id}`}>
        <HistoricalContributionCard
          amount={transaction.details.amount}
          fundName={transaction.details.account.name}
          contributorName={`${transaction.person.firstName} ${transaction.person.lastName}`}
          date={transaction.date}
          profileImageUrl={transaction.person.photo}
        />
      </Link>
    ))}
  </View>
);

ScheduleTransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({

  })),
  isLoading: PropTypes.bool,
};

export default ScheduleTransactionHistory;
