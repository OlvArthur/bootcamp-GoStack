// Quando o componente não apresenta a necessidade de manipular
//algum tipo de estado/state é possível usar o function
import React from 'react';
import PropTypes from 'prop-types';
//É possível usar desestruturação passando {techs} passar props e usar
//props.tech, props.onDelete, etc
function TechItem({ tech, onDelete }) {
  return (
    <li>
      {tech}
      <button onClick={onDelete} type="button">
        Remover item
      </button>
    </li>
  );
}

TechItem.defaultProps = {
  tech: 'Oculto',
};

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default TechItem;
