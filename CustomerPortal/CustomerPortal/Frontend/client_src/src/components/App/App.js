import React from 'react';
import { withRouter } from 'react-router-dom';

const App = ({ children }) => <main>{children}</main>;

export default withRouter(App);
