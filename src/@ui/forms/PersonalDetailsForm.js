import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose';
import get from 'lodash/get';
import { withFormik } from 'formik';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import { withRouter } from '@ui/NativeWebRouter';
import ActivityIndicator from '@ui/ActivityIndicator';

import * as Inputs from '@ui/inputs';
import Button from '@ui/Button';

export const PersonalDetailsFormWithoutData = ({
  setFieldValue,
  handleSubmit,
  values,
  campuses,
}) => (
  <View>
    <Inputs.Text
      label="First Name"
      value={values.firstName}
      onChangeText={text => setFieldValue('firstName', text)}
    />
    <Inputs.Text
      label="Last Name"
      value={values.lastName}
      onChangeText={text => setFieldValue('lastName', text)}
    />
    <Inputs.Text
      label="Email"
      type="email"
      value={values.email}
      onChangeText={text => setFieldValue('email', text)}
    />
    <Inputs.Picker
      label="Campus"
      value={values.campusId}
      displayValue={get(campuses.find(campus => campus.id === values.campusId), 'label')}
      onValueChange={value => setFieldValue('campusId', value)}
    >
      {campuses.map(({ label, id }) => (
        <Inputs.PickerItem label={label} value={id} key={id} />
      ))}
    </Inputs.Picker>
    <Button onPress={handleSubmit} title="Next" />
  </View>
);

PersonalDetailsFormWithoutData.propTypes = {
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    campusId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  campuses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
  })),
};

const PersonalDetailsForm = compose(
  withGive,
  withCheckout,
  withRouter,
  branch(({ isLoading }) => isLoading, renderComponent(ActivityIndicator)),
  withFormik({
    mapPropsToValues: props => ({
      firstName: get(props, 'person.firstName'),
      lastName: get(props, 'person.lastName'),
      email: get(props, 'person.email'),
      campusId: get(props, 'person.campus.id') || get(props, 'campuses.0.id'),
    }),
    handleSubmit: (values, { props }) => {
      if (props.navigateToOnComplete) props.history.replace(props.navigateToOnComplete);
    },
  }),
)(PersonalDetailsFormWithoutData);

export default PersonalDetailsForm;
