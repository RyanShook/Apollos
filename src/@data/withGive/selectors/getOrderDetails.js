import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import removeUndefined from '@utils/removeUndefined';
import getOrderTotal from './getOrderTotal';

// TODO: Saved payment methods
export default function getOrderDetails(state) {
  const total = getOrderTotal(state);

  // here we format data for the NMI processing
  const joinedData = removeUndefined({
    billing: {
      'first-name': state.firstName,
      'last-name': state.lastName,
      email: state.email,
      address1: state.street1,
      address2: state.street2,
      city: state.city,
      state: state.state,
      postal: state.zipCode,
    },
    'merchant-defined-field-2': isEmpty(state.campusId) ? undefined : state.campusId,
  });

  if (state.frequencyId !== 'today') {
    joinedData.plan = {
      payments: 0,
      amount: total,
    };

    switch (state.frequencyId) {
      case 'once':
        joinedData.plan.payments = 1;
        joinedData.plan['month-frequency'] = 12;
        joinedData.plan['day-of-month'] = moment(state.startDate).date();
        break;
      case 'weekly':
        joinedData.plan['day-frequency'] = 7;
        break;
      case 'biweekly':
        joinedData.plan['day-frequency'] = 14;
        break;
      case 'monthly':
        joinedData.plan['month-frequency'] = 1;
        joinedData.plan['day-of-month'] = moment(state.startDate).date();
        break;
      default:
        break;
    }

    joinedData['start-date'] = state.start
      ? moment(state.start).format('YYYYMMDD')
      : moment().add(1, 'days').format('YYYYMMDD');
    joinedData['merchant-defined-field-3'] = joinedData['start-date'];

    // This isn't super well organized
    // in the beginning we didn't support multiple accounts
    // on a schedule
    // now we do but we have to support existing builds so
    // we create a comma sep string and split on heighliner
    joinedData['merchant-defined-field-1'] = state.contributions
      .map(({ id }) => (id))
      .join(',');

    // in order to line up the amounts with the funds, we store the amounts
    // in a matching comma sep string
    joinedData['merchant-defined-field-4'] = state.contributions
      .map(({ amount }) => (amount))
      .join(',');

  // SINGLE
  } else if (state.contributions.length > 0) {
    joinedData.amount = total;
    joinedData.product = state.contributions.map(contribution => ({
      quantity: 1,
      'product-code': contribution.id,
      description: contribution.name, // Name of fund, why?
      'total-amount': contribution.amount,
      'unit-cost': contribution.amount,
    }));
  }

  if (state.paymentMethod === 'savedPaymentMethod') {
    joinedData.savedAccount = state.savedPaymentMethodId;
  }

  return joinedData;
}
