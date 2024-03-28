import React from 'react';
import Button from 'react-bootstrap/Button';

function ButtonComponent({className, onClick, text}) {
  return (
    <>
      <Button className={className} variant="primary" onClick={onClick}>
        {text}
      </Button>
      
    </>
  );
}

export default ButtonComponent;