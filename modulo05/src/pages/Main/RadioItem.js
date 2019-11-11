import React from 'react';
import PropTypes from 'prop-types';

import { Item, RadioButton, RadioButtonLabel } from './styles';

function RadioItem({ onChange, state }) {
  return (
    <Item>
      <RadioButton
        type="radio"
        name="radio"
        value={state}
        onChange={onChange}
      />
      <RadioButtonLabel />
      <div>{state}</div>
    </Item>
  );
}

RadioItem.defaultProps = {
  state: 'open',
};

RadioItem.propTypes = {
  state: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default RadioItem;
