export const INITIAL_STATE = {
  // Create Order Forms
  contributions: [],
  frequencyId: 'today',
  startDate: (new Date()).toJSON(),
  firstName: '',
  lastName: '',
  email: '',
  campusId: '',
  street1: '',
  street2: '',
  countryId: 'US',
  city: '',
  stateId: 'SC',
  zipCode: '',

  // Make payment
  isLoadingOrderUrl: false,
  orderPaymentUrl: '',
  creditCard: {
    __typename: 'CreditCard',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  },
  bankAccount: {
    __typename: 'BankAccount',
    accountNumber: '',
    routingNumber: '',
    accountName: '',
    accountType: 'checking',
  },
  paymentMethod: 'creditCard',
  isPostingPayment: false,
};
