import { useHistory, useLocation } from 'react-router'
import ClayNavigationBar from '@clayui/navigation-bar'
import ClayLink from '@clayui/link'
import React from 'react'
import Agendamento from '../../pages/Agendamento'
import Lista from '../../pages/Lista'

const NavigationBar = () => {

    const routes = [
        {
          component: Agendamento,
          name: 'Agendamento',
          path: '/',
          private: false
        },
        {
          component: Lista,
          name: 'Lista',
          path: '/lista',
          private: false
        },
        
      ];

    const history = useHistory();
    const location = useLocation();

  return (
    <ClayNavigationBar triggerLabel="Site Pitang">
      {routes.map(({ name, path }) => (
        <ClayNavigationBar.Item key={path} active={path === location.pathname}>
          <ClayLink onClick={() => history.push(path)} className="nav-link" displayType="unstyled">
            {name}
          </ClayLink>
        </ClayNavigationBar.Item>
      ))}
    </ClayNavigationBar>
  );
};

export default NavigationBar;