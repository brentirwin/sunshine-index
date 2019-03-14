import React from 'react';

const ZipForm = props => {
  return (
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.handleChange(e)}
        />
      <input
        type="submit"
        value="Go"
        />
    </form>
  );
}

export default ZipForm;
