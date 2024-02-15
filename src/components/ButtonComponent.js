import React from 'react';
import Button from 'react-bootstrap/Button';

function ButtonComponent({className, onClick}) {
  return (
    <>
      <Button className={className} variant="primary" onClick={onClick}>
        Get started
      </Button>
      
    </>
  );
}

export default ButtonComponent;