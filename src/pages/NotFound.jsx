import React from 'react';
import { Link } from 'react-router-dom';
import { withUser } from "../components/Auth/withUser";

function Page404(props) {
  console.log(props);
  // 
  return (
    <div>
      Oh no !!!
      <br />
      Toto , you are lost :( <br />
      Go back to the &nbsp;<Link to="/">home page</Link>
    </div>
  );
}

export default withUser(Page404);
