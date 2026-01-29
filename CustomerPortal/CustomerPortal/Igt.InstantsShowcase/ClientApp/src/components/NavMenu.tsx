import * as React from "react";
import { NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import LoginMenu from "./api-authorization/LoginMenu";

//Assets
import IGTLogo from "../assets/remainco_logo.png";

//Styles
import {
  NavigationWrapper,
  NavLinksContainer,
  NavLogo,
} from "./NavMenu.styles";
import "./NavMenu_Stylesheet.css";

interface IProps {}

interface IState {
  collapsed: boolean;
}

export class NavMenu extends React.Component<IProps, IState> {
  static displayName = NavMenu.name;

  constructor(props: IProps) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
        <header>
                <div className="NavMenu">
                    <Link to="/">
                    <img src={IGTLogo} alt="Brightstar Logo" />
                    </Link>
                <LoginMenu></LoginMenu>
                </div>
      </header>
    );
  }
}
