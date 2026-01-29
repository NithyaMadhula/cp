import * as React from "react";
import { ThemeProvider } from "styled-components";
import { NavMenu } from "./NavMenu";
import { MasterTheme } from "../shared/MasterTheme";
import Footer from "./Footer";
import "./Footer_Stylesheet.css"

interface IProps {}

interface IState {}

export class Layout extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state);
  }

  componentDidMount() {}

  render() {
    return (
      <ThemeProvider theme={MasterTheme}>
            <NavMenu />
            <main className="MainFooterStyle">{this.props.children}</main>
            <Footer/>
      </ThemeProvider>
    );
  }
}