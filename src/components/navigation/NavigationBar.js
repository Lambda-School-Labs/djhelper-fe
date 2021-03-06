import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';

import { withWindowSizeListener } from 'react-window-size-listener';

import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

import NavLogic from './NavLogic';
import * as UsrActions from '../../redux/actions/action';
import * as ModalActions from '../../redux/actions/modalActions';
import * as Styles from '../Styles';

const NavigationBar = ({
  token,
  actions,
  history,
  windowSize,
  loginModalIsOpen,
  registerModalIsOpen,
  helpModalIsOpen
}) => {
  // const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  // const [registerModalIsOpen, setregisterModalIsOpen] = useState(false);

  const [navOpen, setNavOpen] = useState(false);

  let currentWindowWidth = windowSize.windowWidth;

  const NavigationItemStyle =
    currentWindowWidth <= 900
      ? 'navBar__navItems mobileNav'
      : 'navBar__navItems';

  const hamburgerIconStyle = navOpen ? 'mobileMenIconActive' : 'mobileMenIcon';

  const handleLogout = () => {
    actions.logout();
    // setLoginModalIsOpen(false);
    // actions.toggleLoginModal();
    // actions.toggleRegisterModal();

    // history.push('/');
  };

  const toggleNavItem = () => {
    setNavOpen(false);
  };

  // const toggleLoginModal = () => {
  //   setLoginModalIsOpen(!loginModalIsOpen);
  // };

  // const toggleRegisterModal = () => {
  //   setregisterModalIsOpen(!registerModalIsOpen);
  // };

  if (currentWindowWidth <= 900) {
    return (
      <Navbar className="navBar" data-testid="navBar">
        <NavbarBrand
          onClick={() => (token ? history.push('/dj') : history.push('/'))}
        >
          DJ Helper
        </NavbarBrand>
        <button
          className="btn-icon"
          type="button"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className={hamburgerIconStyle}>&nbsp;</span>
        </button>
        <NavLogic
          toggleHelpModal={actions.toggleHelpModal}
          toggleLoginModal={actions.toggleLoginModal}
          loginModalIsOpen={loginModalIsOpen}
          toggleRegisterModal={actions.toggleRegisterModal}
          registerModalIsOpen={registerModalIsOpen}
          token={token}
          handleLogout={handleLogout}
          NavigationItemStyle={NavigationItemStyle}
          navOpen={navOpen}
          toggleNavItem={toggleNavItem}
          currentWindowWidth={currentWindowWidth}
        />
      </Navbar>
    );
  }

  return (
    <>
      <Navbar className="navBar" data-testid="navBar">
        <NavbarBrand
          onClick={() => (token ? history.push('/dj') : history.push('/'))}
        >
          DJ Helper
        </NavbarBrand>
        <NavLogic
          toggleHelpModal={actions.toggleHelpModal}
          toggleLoginModal={actions.toggleLoginModal}
          loginModalIsOpen={loginModalIsOpen}
          toggleRegisterModal={actions.toggleRegisterModal}
          registerModalIsOpen={registerModalIsOpen}
          token={token}
          handleLogout={handleLogout}
          NavigationItemStyle={NavigationItemStyle}
          navOpen={navOpen}
          toggleNavItem={toggleNavItem}
          currentWindowWidth={currentWindowWidth}
        />
      </Navbar>
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.userReducer.tokenPresent,
    loginModalIsOpen: state.modalReducer.loginModalIsOpen,
    registerModalIsOpen: state.modalReducer.registerModalIsOpen,
    helpModalIsOpen: state.modalReducer.helpModalIsOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      logout: bindActionCreators(UsrActions.logoutUser, dispatch),
      toggleLoginModal: bindActionCreators(
        ModalActions.toggleLoginModal,
        dispatch
      ),
      toggleRegisterModal: bindActionCreators(
        ModalActions.toggleRegisterModal,
        dispatch
      ),
      toggleHelpModal: bindActionCreators(
        ModalActions.toggleHelpModal,
        dispatch
      )
    }
  };
};
export default withWindowSizeListener(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
);
