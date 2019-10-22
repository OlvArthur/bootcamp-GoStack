// Quando o componente não apresenta a ncessidade de manipular
//algum tipo de estado/state é possível usar o function

import React from 'react';

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

export default TechItem;
