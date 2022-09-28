import React from "react";

type Props = {};

function MembershipComparisonTable({}: Props) {
  return (
    <table className="table w-full">
      {/* <!-- head --> */}
      <thead className="text-center">
        <tr>
          <th></th>
          <th>Standard</th>
          <th></th>
          <th>Premium</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {/* <!-- row 1 --> */}
        <tr>
          <th></th>
          <td></td>
          <td>View price history and housing metrics</td>
          <td>✅</td>
        </tr>
        {/* <!-- row 2 --> */}
        <tr>
          <th></th>
          <td>✅</td>
          <td> View nearby homes and local schools</td>
          <td>✅</td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr>
          <th></th>
          <td></td>
          <td>Save homes to favorites collection</td>
          <td>✅</td>
        </tr>
      </tbody>
    </table>
  );
}

export default MembershipComparisonTable;
