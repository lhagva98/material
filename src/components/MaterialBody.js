import React from 'react';
import CardBody from "components/Card/CardBody.js";

const MaterialBody = ({ materials }) => {
  return (
    <TableBody>
      {materials.length && materials.map((item) => (
        <TableRow>
          <TableCell><DeleteIcon onClick={() => handleDeleteMaterial(item)} style={{ cursor: 'pointer' }} /></TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.unit}</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>{item.prePrice}</TableCell>
          <TableCell>{item.checked ? item.price : <TextField onChange={(e) => console.log("hahah")} />}</TableCell>
          <TableCell>{item.checked ? item.total : <TextField onChange={(e) => console.log("hahah")} />}</TableCell>
          <TableCell style={{ padding: 0 }} >
            <Checkbox
              // checked={state.checkedB}
              // onChange={handleChange}
              name="checkedB"
              color="primary"
              style={{ padding: 0 }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default MaterialBody;