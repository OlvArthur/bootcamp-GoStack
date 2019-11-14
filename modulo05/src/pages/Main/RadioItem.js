import React from 'react';
import PropTypes from 'prop-types';

import { Item, RadioButton, RadioButtonLabel } from './styles';

function RadioItem({ onClick, state }) {
  return (
    <Item>
      <RadioButton type="radio" name="radio" value={state} onClick={onClick} />
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
  onClick: PropTypes.func.isRequired,
};

export default RadioItem;
