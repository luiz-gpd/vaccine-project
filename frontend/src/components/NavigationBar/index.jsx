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
          path: '/user',
          private: false
        },
        {
          component: Lista,
          name: 'Lista',
          path: '/list',
          private: false
        },
        
      ];

    const history = useHistory();
    const location = useLocation();

  return (
    <ClayNavigationBar triggerLabel="Site Pitang">
      {routes.map(({ name, path }) => (
        <ClayNavigationBar.Item key={path} className="dynamic-route" active={path === location.pathname}>
          <ClayLink data-testid="link" onClick={() => history.push(path)} className="nav-link" displayType="unstyled">
            {name}
          </ClayLink>
        </ClayNavigationBar.Item>
      ))}
    </ClayNavigationBar>
  );
};

export default NavigationBar;